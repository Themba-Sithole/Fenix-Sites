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
  Sparkles,
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
  gradient,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  gradient: string;
}) {
  return (
    <Card className="relative overflow-hidden bg-white/[0.02] border-white/[0.06] p-5 hover:border-white/15 transition-all duration-300 group">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${gradient}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-1.5">{label}</p>
          <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
          {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#db7d30]" />
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
  const { profile } = useAuth();
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
    {
      label: "Completed",
      count: clients.filter((c) => c.status === "completed").length,
      color: "bg-purple-500",
    },
  ];
  const pipelineTotal = pipeline.reduce((s, p) => s + p.count, 0) || 1;

  if (projectsLoading || clientsLoading || inquiriesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = profile?.full_name ?? profile?.email?.split("@")[0] ?? "Admin";

  return (
    <div className="space-y-8">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#cd3f2c]/10 via-transparent to-[#db7d30]/5 border border-white/[0.06] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#db7d30]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#db7d30]" />
              <span className="text-gray-500 text-xs uppercase tracking-widest">Dashboard</span>
            </div>
            <h1 className="text-white text-2xl md:text-3xl font-semibold mb-1 tracking-tight">
              Welcome back, {displayName}
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
              <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] shadow-lg shadow-[#cd3f2c]/20 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
            <Link to="/admin/clients/new">
              <Button variant="outline" className="border-white/10 text-gray-300 rounded-xl hover:bg-white/5">
                <Plus className="w-4 h-4 mr-2" />
                New Client
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Projects" value={projects.length} icon={FolderKanban} gradient="bg-gradient-to-br from-[#cd3f2c]/5 to-transparent" />
        <StatCard label="In Portfolio" value={published} sub={`${drafts} internal`} icon={Eye} gradient="bg-gradient-to-br from-emerald-500/5 to-transparent" />
        <StatCard label="Featured" value={featured} icon={Star} gradient="bg-gradient-to-br from-[#db7d30]/5 to-transparent" />
        <StatCard label="Clients" value={clients.length} icon={Users} gradient="bg-gradient-to-br from-blue-500/5 to-transparent" />
        <StatCard label="New Inquiries" value={newCount} icon={Inbox} gradient="bg-gradient-to-br from-[#cd3f2c]/8 to-transparent" />
        <StatCard label="Drafts" value={drafts} icon={FileEdit} gradient="bg-gradient-to-br from-gray-500/5 to-transparent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-white/[0.02] border-white/[0.06] p-6 lg:col-span-1 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#db7d30]" />
            <h2 className="text-white font-medium">Client Pipeline</h2>
          </div>
          <div className="space-y-5">
            {pipeline.map((stage) => (
              <div key={stage.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{stage.label}</span>
                  <span className="text-white font-semibold">{stage.count}</span>
                </div>
                <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} rounded-full transition-all duration-700`}
                    style={{ width: `${(stage.count / pipelineTotal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/admin/clients"
            className="inline-flex items-center gap-1 text-[#edcca5] text-sm mt-6 hover:text-white transition-colors"
          >
            Manage clients <ArrowRight className="w-3 h-3" />
          </Link>
        </Card>

        <Card className="bg-white/[0.02] border-white/[0.06] p-6 lg:col-span-1 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Recent Projects</h2>
            <Link to="/admin/projects">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white h-8 rounded-lg">
                All
              </Button>
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-gray-600 text-sm">No projects yet. Create your first one!</p>
          ) : (
            <ul className="space-y-1">
              {projects.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/admin/projects/${p.id}`}
                    className="flex items-center justify-between gap-3 p-2.5 -mx-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-white text-sm truncate">{p.title}</p>
                      <p className="text-gray-600 text-xs">{p.category}</p>
                    </div>
                    <Badge
                      className={`border-0 text-[10px] ${
                        p.published
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {p.published ? "Portfolio" : "Internal"}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="bg-white/[0.02] border-white/[0.06] p-6 lg:col-span-1 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Latest Inquiries</h2>
            <Link to="/admin/inquiries">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white h-8 rounded-lg">
                All {newCount > 0 && `(${newCount})`}
              </Button>
            </Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="text-gray-600 text-sm">No inquiries yet.</p>
          ) : (
            <ul className="space-y-1">
              {inquiries.slice(0, 5).map((inq) => (
                <li key={inq.id}>
                  <Link
                    to="/admin/inquiries"
                    className="block p-2.5 -mx-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-white text-sm truncate">{inq.name}</p>
                      <Badge className={`border-0 text-[10px] capitalize ${statusColors[inq.status]}`}>
                        {inq.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-xs truncate">{inq.service ?? inq.email}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-[#cd3f2c]/8 via-[#cd3f2c]/4 to-[#db7d30]/8 border-[#db7d30]/15 p-6 rounded-2xl">
        <h2 className="text-white font-medium mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { to: "/admin/projects/new", label: "Add a project" },
            { to: "/admin/clients/new", label: "Add a client" },
            { to: "/admin/inquiries", label: "Review inquiries" },
            { to: "/admin/messages", label: "Send a message" },
            { to: "/admin/finance", label: "Finance manager" },
          ].map((action) => (
            <Link key={action.to} to={action.to}>
              <Button
                size="sm"
                className="bg-white/[0.06] hover:bg-white/10 text-white border border-white/[0.08] rounded-xl"
              >
                {action.label}
              </Button>
            </Link>
          ))}
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="border-white/10 text-gray-400 rounded-xl">
              Preview website
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
