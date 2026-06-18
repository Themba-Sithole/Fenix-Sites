import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Inquiry, InquiryInsert, InquiryStatus } from "../lib/types/database";

export function useInquiries(options?: { enabled?: boolean }) {
  const enabled = options?.enabled ?? true;
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    if (!enabled || !supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setInquiries([]);
    } else {
      setInquiries((data as Inquiry[]) ?? []);
      setError(null);
    }
    setLoading(false);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setInquiries([]);
      setLoading(false);
      return;
    }
    fetchInquiries();
  }, [fetchInquiries, enabled]);

  const updateInquiry = async (id: string, status: InquiryStatus) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) throw error;
    await fetchInquiries();
  };

  const deleteInquiry = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) throw error;
    await fetchInquiries();
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return {
    inquiries,
    loading,
    error,
    newCount,
    refetch: fetchInquiries,
    updateInquiry,
    deleteInquiry,
  };
}

export async function submitInquiry(payload: InquiryInsert) {
  if (!supabase) return { error: "Database not configured" };
  const { error } = await supabase.from("inquiries").insert({
    ...payload,
    status: "new",
  });
  return { error: error?.message ?? null };
}
