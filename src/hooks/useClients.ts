import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Client, ClientInsert } from "../lib/types/database";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setClients([]);
    } else {
      setClients((data as Client[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = async (payload: ClientInsert) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
      .from("clients")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    await fetchClients();
    return data as Client;
  };

  const updateClient = async (id: string, payload: Partial<ClientInsert>) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("clients").update(payload).eq("id", id);
    if (error) throw error;
    await fetchClients();
  };

  const deleteClient = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) throw error;
    await fetchClients();
  };

  return {
    clients,
    loading,
    error,
    refetch: fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
}
