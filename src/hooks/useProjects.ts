import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Project, ProjectInsert } from "../lib/types/database";

export function useProjects(options?: { admin?: boolean; featuredOnly?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let query = supabase
      .from("projects")
      .select("*, clients(id, name, company)")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!options?.admin) {
      query = query.eq("published", true);
    }
    if (options?.featuredOnly) {
      query = query.eq("featured", true);
    }

    const { data, error: fetchError } = await query;

    if (fetchError) {
      setError(fetchError.message);
      setProjects([]);
    } else {
      setProjects((data as Project[]) ?? []);
    }
    setLoading(false);
  }, [options?.admin, options?.featuredOnly]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (payload: ProjectInsert) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    await fetchProjects();
    return data as Project;
  };

  const updateProject = async (id: string, payload: Partial<ProjectInsert>) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) throw error;
    await fetchProjects();
  };

  const deleteProject = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    await fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
