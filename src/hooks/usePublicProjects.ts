import { useMemo } from "react";
import { useProjects } from "../hooks/useProjects";
import { fallbackProjects, toDisplayProject, type DisplayProject } from "../lib/projects";
import { isSupabaseConfigured } from "../lib/supabase";

export function usePublicProjects(options?: { featuredOnly?: boolean }) {
  const { projects, loading, error } = useProjects({
    admin: false,
    featuredOnly: options?.featuredOnly,
  });

  const displayProjects: DisplayProject[] = useMemo(() => {
    if (!isSupabaseConfigured || projects.length === 0) {
      if (options?.featuredOnly) {
        return fallbackProjects.slice(0, 2);
      }
      return fallbackProjects;
    }
    return projects.map(toDisplayProject);
  }, [projects, options?.featuredOnly]);

  return {
    projects: displayProjects,
    loading: isSupabaseConfigured ? loading : false,
    error,
    fromDatabase: isSupabaseConfigured && projects.length > 0,
  };
}
