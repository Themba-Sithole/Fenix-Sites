import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const { hasRole } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canViewFinance = hasRole("super_admin", "admin", "finance");

  const fetchAll = useCallback(
    async (isRefresh = false) => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const queries = [
          supabase
            .from("projects")
            .select("*, clients(id, name, company)")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false }),
          supabase.from("clients").select("*").order("created_at", { ascending: false }),
          supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
        ];

        if (canViewFinance) {
          queries.push(
            supabase
              .from("finance_records")
              .select("*, clients(id, name, company)")
              .order("created_at", { ascending: false })
              .limit(20)
          );
        }

        const results = await Promise.all(queries);

        const [projRes, clientRes, inqRes, financeRes] = results;

        if (projRes.error) throw projRes.error;
        if (clientRes.error) throw clientRes.error;
        if (inqRes.error) throw inqRes.error;
        if (financeRes?.error) throw financeRes.error;

        setProjects((projRes.data as Project[]) ?? []);
        setClients((clientRes.data as Client[]) ?? []);
        setInquiries((inqRes.data as Inquiry[]) ?? []);
        if (financeRes) setFinanceRecords((financeRes.data as FinanceRecord[]) ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [canViewFinance]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

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
      refetch: () => fetchAll(true),
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
      fetchAll,
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
