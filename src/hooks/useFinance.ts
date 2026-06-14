import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { FinanceRecord, FinanceRecordInsert } from "../lib/types/database";

export function useFinance() {
  const [records, setRecords] = useState<FinanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("finance_records")
      .select("*, clients(id, name, company)")
      .order("created_at", { ascending: false });

    if (!error) setRecords((data as FinanceRecord[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const createRecord = async (payload: FinanceRecordInsert) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("finance_records")
      .insert({ ...payload, created_by: user?.id ?? null })
      .select()
      .single();
    if (error) throw error;
    await fetchRecords();
    return data as FinanceRecord;
  };

  const updateRecord = async (id: string, payload: Partial<FinanceRecordInsert>) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("finance_records").update(payload).eq("id", id);
    if (error) throw error;
    await fetchRecords();
  };

  const deleteRecord = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("finance_records").delete().eq("id", id);
    if (error) throw error;
    await fetchRecords();
  };

  const stats = {
    totalInvoiced: records
      .filter((r) => r.type === "invoice")
      .reduce((s, r) => s + Number(r.amount), 0),
    totalPaid: records
      .filter((r) => r.type === "payment" || (r.type === "invoice" && r.status === "paid"))
      .reduce((s, r) => s + Number(r.amount), 0),
    totalExpenses: records
      .filter((r) => r.type === "expense")
      .reduce((s, r) => s + Number(r.amount), 0),
    pending: records.filter((r) => r.status === "pending").length,
  };

  return { records, loading, stats, createRecord, updateRecord, deleteRecord, refetch: fetchRecords };
}
