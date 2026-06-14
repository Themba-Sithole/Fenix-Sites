import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Category } from "../lib/types/database";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    setCategories((data as Category[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (name: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug })
      .select()
      .single();
    if (error) throw error;
    await fetchCategories();
    return data as Category;
  };

  return { categories, loading, addCategory, refetch: fetchCategories };
}
