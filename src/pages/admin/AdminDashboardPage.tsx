import {
  FolderKanban,
  Users,
  Eye,
  Star,
  Inbox,
  FileEdit,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";
import { useInquiries } from "../../hooks/useInquiries";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <Card className="bg-white/[0.03] border-white/10 p-5 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
          {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}

const statusColors: Record<string, string> = {
  lead: "bg-blue-500/20 text-blue-300",
  active: "bg-emerald-500/20 text-emerald-300",
  completed: "bg-purple-500/20 text-purple-300",
  inactive: "bg-gray-500/20 text-gray-400",
  new: "bg-[#cd3f2c]/20 text-[#edcca5]",
};

export function AdminDashboardPage() {
  const { user } = useAuth();
  const { projects, loading: projectsLoading } = useProjects({ admin: true });
  const { clients, loading: clientsLoading } = useClients();
  const { inquiries, newCount, loading: inquiriesLoading } = useInquiries();

  const published = projects.filter((p) => p.published).length;
  const drafts = projects.filter((p) => !p.published).length;
  const featured = projects.filter((p) => p.featured).length;
  const leads = clients.filter((c) => c.status === "lead").length;
  const activeClients = clients.filter((c) => c.status === "active").length;

  const pipeline = [
    { label: "Leads", count: leads, color: "bg-blue-500" },
    { label: "Active", count: activeClients, color: "bg-emerald-500" },
    { label: "Completed", count: clients.filter((c) => c.status === "completed").length, color: "bg-purple-500" },
  ];
  const pipelineTotal = pipeline.reduce((s, p) => s + p.count, 0) || 1;

  if (projectsLoading || clientsLoading || inquiriesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const firstName = user?.email?.split("@")[0] ?? "Admin";

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-semibold mb-1">
            Welcome back, {firstName}
          </h1>
          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString("en-ZA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/projects/new">
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
          <Link to="/admin/clients/new">
            <Button variant="outline" className="border-white/10 text-gray-300">
              <Plus className="w-4 h-4 mr-2" />
              New Client
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Projects" value={projects.length} icon={FolderKanban} accent="bg-[#cd3f2c]/30" />
        <StatCard label="Published" value={published} sub={`${drafts} drafts`} icon={Eye} accent="bg-emerald-500/20" />
        <StatCard label="Featured" value={featured} icon={Star} accent="bg-[#db7d30]/30" />
        <StatCard label="Clients" value={clients.length} icon={Users} accent="bg-blue-500/20" />
        <StatCard label="New Inquiries" value={newCount} icon={Inbox} accent="bg-[#cd3f2c]/40" />
        <StatCard label="Drafts" value={drafts} icon={FileEdit} accent="bg-gray-500/20" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client pipeline */}
        <Card className="bg-white/[0.03] border-white/10 p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#db7d30]" />
            <h2 className="text-white font-medium">Client Pipeline</h2>
          </div>
          <div className="space-y-4">
            {pipeline.map((stage) => (
              <div key={stage.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-400">{stage.label}</span>
                  <span className="text-white font-medium">{stage.count}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(stage.count / pipelineTotal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link to="/admin/clients" className="inline-flex items-center gap-1 text-[#edcca5] text-sm mt-6 hover:text-white transition-colors">
            Manage clients <ArrowRight className="w-3 h-3" />
          </Link>
        </Card>

        {/* Recent projects */}
        <Card className="bg-white/[0.03] border-white/10 p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Recent Projects</h2>
            <Link to="/admin/projects">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
                All
              </Button>
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-gray-500 text-sm">No projects yet.</p>
          ) : (
            <ul className="space-y-3">
              {projects.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/admin/projects/${p.id}`}
                    className="flex items-center justify-between gap-3 p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-white text-sm truncate">{p.title}</p>
                      <p className="text-gray-500 text-xs">{p.category}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {p.published ? (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[10px]">Live</Badge>
                      ) : (
                        <Badge className="bg-gray-500/20 text-gray-400 border-0 text-[10px]">Draft</Badge>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Recent inquiries */}
        <Card className="bg-white/[0.03] border-white/10 p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Latest Inquiries</h2>
            <Link to="/admin/inquiries">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
                All {newCount > 0 && `(${newCount})`}
              </Button>
            </Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="text-gray-500 text-sm">No inquiries yet.</p>
          ) : (
            <ul className="space-y-3">
              {inquiries.slice(0, 5).map((inq) => (
                <li key={inq.id}>
                  <Link
                    to="/admin/inquiries"
                    className="block p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-white text-sm truncate">{inq.name}</p>
                      <Badge className={`border-0 text-[10px] capitalize ${statusColors[inq.status]}`}>
                        {inq.status}
                      </Badge>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{inq.service ?? inq.email}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="bg-gradient-to-r from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]/20 p-6">
        <h2 className="text-white font-medium mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/projects/new">
            <Button size="sm" className="bg-white/10 hover:bg-white/15 text-white border border-white/10">
              Publish a project
            </Button>
          </Link>
          <Link to="/admin/clients/new">
            <Button size="sm" className="bg-white/10 hover:bg-white/15 text-white border border-white/10">
              Add a client
            </Button>
          </Link>
          <Link to="/admin/inquiries">
            <Button size="sm" className="bg-white/10 hover:bg-white/15 text-white border border-white/10">
              Review inquiries
            </Button>
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="border-white/10 text-gray-300">
              Preview website
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
