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

export const fallbackProjects: DisplayProject[] = [
  {
    id: "fallback-1",
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce solution with seamless checkout and inventory management",
    image: "https://images.unsplash.com/photo-1680499661732-3cfae4690e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["React", "Node.js", "Stripe"],
    client: "TechStore Inc.",
    duration: "3 months",
    result: "+250% Sales",
    filter: "ecommerce",
  },
  {
    id: "fallback-2",
    title: "Creative Agency Website",
    category: "Design & Development",
    description: "Award-winning portfolio site with stunning animations and interactive elements",
    image: "https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["UI/UX", "Tailwind", "Motion"],
    client: "Design Studio Co.",
    duration: "2 months",
    result: "+180% Traffic",
    filter: "design",
  },
  {
    id: "fallback-3",
    title: "SaaS Dashboard",
    category: "Web Application",
    description: "Comprehensive analytics platform with real-time data visualization",
    image: "https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Next.js", "TypeScript", "Charts"],
    client: "DataMetrics",
    duration: "4 months",
    result: "10k+ Users",
    filter: "webapp",
  },
];
