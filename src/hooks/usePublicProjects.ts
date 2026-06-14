import { useMemo } from "react";
import { useProjects } from "../hooks/useProjects";
import { toDisplayProject, type DisplayProject } from "../lib/projects";
import { isSupabaseConfigured } from "../lib/supabase";

export function usePublicProjects(options?: { featuredOnly?: boolean }) {
  const { projects, loading, error } = useProjects({
    admin: false,
    featuredOnly: options?.featuredOnly,
  });

  const displayProjects: DisplayProject[] = useMemo(() => {
    if (!isSupabaseConfigured || projects.length === 0) {
      return [];
    }
    return projects.map(toDisplayProject);
  }, [projects]);

  return {
    projects: displayProjects,
    loading: isSupabaseConfigured ? loading : false,
    error,
    fromDatabase: isSupabaseConfigured && projects.length > 0,
  };
}
