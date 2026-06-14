import type { Project } from "./types/database";

export interface DisplayProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  client: string;
  duration: string;
  result: string;
  filter: string;
  liveUrl?: string | null;
}

export function toDisplayProject(p: Project): DisplayProject {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description ?? "",
    image: p.image_url ?? "",
    tags: p.tags ?? [],
    client: p.clients?.company ?? p.clients?.name ?? "Client",
    duration: p.duration ?? "—",
    result: p.result ?? "—",
    filter: p.filter_category === "all" ? "webapp" : p.filter_category,
    liveUrl: p.live_url,
  };
}
