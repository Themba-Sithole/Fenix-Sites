import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";
import type { Client, FinanceRecord, Inquiry, Project } from "../lib/types/database";

interface AdminDataContextValue {
  projects: Project[];
  clients: Client[];
  inquiries: Inquiry[];
  financeRecords: FinanceRecord[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  newInquiryCount: number;
  refetch: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const { hasRole, role, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchInFlightRef = useRef(false);

  const canViewStaffData = useMemo(
    () => hasRole("super_admin", "admin", "editor", "finance", "viewer"),
    [hasRole]
  );
  const canViewInquiries = useMemo(
    () => hasRole("super_admin", "admin", "editor"),
    [hasRole]
  );
  const canViewFinance = useMemo(
    () => hasRole("super_admin", "admin", "finance"),
    [hasRole]
  );

  const fetchAll = useCallback(
    async (isRefresh = false) => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      if (authLoading || !role) return;
      if (fetchInFlightRef.current) return;

      fetchInFlightRef.current = true;

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const errors: string[] = [];

        const load = async <T,>(
          label: string,
          query: PromiseLike<{ data: T | null; error: { message: string } | null }>,
          setter: (data: T) => void
        ) => {
          const { data, error: queryError } = await query;
          if (queryError) {
            errors.push(`${label}: ${queryError.message}`);
            return;
          }
          setter((data ?? []) as T);
        };

        const tasks: Promise<void>[] = [];

        if (canViewStaffData) {
          tasks.push(
            load(
              "Projects",
              supabase
                .from("projects")
                .select("*, clients(id, name, company)")
                .order("sort_order", { ascending: true })
                .order("created_at", { ascending: false }),
              setProjects
            ),
            load(
              "Clients",
              supabase.from("clients").select("*").order("created_at", { ascending: false }),
              setClients
            )
          );
        } else {
          setProjects([]);
          setClients([]);
        }

        if (canViewInquiries) {
          tasks.push(
            load(
              "Inquiries",
              supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
              setInquiries
            )
          );
        } else {
          setInquiries([]);
        }

        if (canViewFinance) {
          tasks.push(
            load(
              "Finance",
              supabase
                .from("finance_records")
                .select("*, clients(id, name, company)")
                .order("created_at", { ascending: false }),
              setFinanceRecords
            )
          );
        } else {
          setFinanceRecords([]);
        }

        await Promise.all(tasks);

        if (errors.length > 0) {
          setError(errors.join(" · "));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
        setRefreshing(false);
        fetchInFlightRef.current = false;
      }
    },
    [authLoading, role, canViewStaffData, canViewInquiries, canViewFinance]
  );

  const fetchAllRef = useRef(fetchAll);
  fetchAllRef.current = fetchAll;

  const refetch = useCallback(async () => {
    await fetchAllRef.current(true);
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!role) {
      setLoading(false);
      return;
    }
    void fetchAll();
  }, [authLoading, role, fetchAll]);

  const newInquiryCount = useMemo(
    () => inquiries.filter((i) => i.status === "new").length,
    [inquiries]
  );

  const value = useMemo(
    () => ({
      projects,
      clients,
      inquiries,
      financeRecords,
      loading,
      refreshing,
      error,
      newInquiryCount,
      refetch,
    }),
    [
      projects,
      clients,
      inquiries,
      financeRecords,
      loading,
      refreshing,
      error,
      newInquiryCount,
      refetch,
    ]
  );

  return (
    <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}

export function useAdminDataOptional() {
  return useContext(AdminDataContext);
}
