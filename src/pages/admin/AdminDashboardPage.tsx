import { FolderKanban, Users, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <Card className="bg-white/5 border-white/10 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg ${accent} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}

export function AdminDashboardPage() {
  const { projects, loading: projectsLoading } = useProjects({ admin: true });
  const { clients, loading: clientsLoading } = useClients();

  const published = projects.filter((p) => p.published).length;
  const featured = projects.filter((p) => p.featured).length;
  const activeClients = clients.filter((c) => c.status === "active").length;
  const recentProjects = projects.slice(0, 5);
  const recentClients = clients.slice(0, 5);

  if (projectsLoading || clientsLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm">Overview of your agency</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Projects" value={projects.length} icon={FolderKanban} accent="bg-[#cd3f2c]/30" />
        <StatCard label="Published" value={published} icon={Eye} accent="bg-[#db7d30]/30" />
        <StatCard label="Featured" value={featured} icon={Star} accent="bg-[#edcca5]/20" />
        <StatCard label="Active Clients" value={activeClients} icon={Users} accent="bg-emerald-500/20" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Recent Projects</h2>
            <Link to="/admin/projects">
              <Button variant="outline" size="sm" className="border-white/10 text-gray-300">
                View all
              </Button>
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-gray-500 text-sm">No projects yet. Add your first one.</p>
          ) : (
            <ul className="space-y-3">
              {recentProjects.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white text-sm truncate">{p.title}</p>
                    <p className="text-gray-500 text-xs">{p.category}</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {p.published && (
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-xs">Live</Badge>
                    )}
                    {p.featured && (
                      <Badge className="bg-[#db7d30]/20 text-[#edcca5] border-0 text-xs">Featured</Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="bg-white/5 border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Recent Clients</h2>
            <Link to="/admin/clients">
              <Button variant="outline" size="sm" className="border-white/10 text-gray-300">
                View all
              </Button>
            </Link>
          </div>
          {recentClients.length === 0 ? (
            <p className="text-gray-500 text-sm">No clients yet. Add your first one.</p>
          ) : (
            <ul className="space-y-3">
              {recentClients.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white text-sm truncate">{c.name}</p>
                    <p className="text-gray-500 text-xs truncate">{c.company ?? c.email ?? "—"}</p>
                  </div>
                  <Badge
                    className={`border-0 text-xs capitalize ${
                      c.status === "active"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : c.status === "lead"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {c.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-8 flex gap-3">
        <Link to="/admin/projects/new">
          <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
            Add Project
          </Button>
        </Link>
        <Link to="/admin/clients/new">
          <Button variant="outline" className="border-white/10 text-gray-300">
            Add Client
          </Button>
        </Link>
      </div>
    </div>
  );
}
