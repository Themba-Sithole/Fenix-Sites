import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
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
  DollarSign,
  MessageSquare,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useAdminData } from "../../context/AdminDataContext";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  AdminStatCard,
  DashboardSkeleton,
  AdminEmptyState,
} from "../../components/admin/AdminWidgets";

const statusColors: Record<string, string> = {
  lead: "bg-blue-500/20 text-blue-300",
  active: "bg-emerald-500/20 text-emerald-300",
  completed: "bg-purple-500/20 text-purple-300",
  inactive: "bg-gray-500/20 text-gray-400",
  new: "bg-[#cd3f2c]/20 text-[#edcca5]",
};

function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function AdminDashboardPage() {
  const { profile, hasRole } = useAuth();
  const {
    projects,
    clients,
    inquiries,
    financeRecords,
    loading,
    refreshing,
    error,
    newInquiryCount,
    refetch,
  } = useAdminData();

  const stats = useMemo(() => {
    const published = projects.filter((p) => p.published).length;
    const drafts = projects.filter((p) => !p.published).length;
    const featured = projects.filter((p) => p.featured).length;
    const leads = clients.filter((c) => c.status === "lead").length;
    const activeClients = clients.filter((c) => c.status === "active").length;
    const completed = clients.filter((c) => c.status === "completed").length;

    const totalInvoiced = financeRecords
      .filter((r) => r.type === "invoice")
      .reduce((s, r) => s + Number(r.amount), 0);
    const pendingFinance = financeRecords.filter((r) => r.status === "pending").length;

    return {
      published,
      drafts,
      featured,
      leads,
      activeClients,
      completed,
      totalInvoiced,
      pendingFinance,
      pipeline: [
        { label: "Leads", count: leads, color: "bg-blue-500" },
        { label: "Active", count: activeClients, color: "bg-emerald-500" },
        { label: "Completed", count: completed, color: "bg-purple-500" },
      ],
    };
  }, [projects, clients, financeRecords]);

  const pipelineTotal = useMemo(
    () => stats.pipeline.reduce((s, p) => s + p.count, 0) || 1,
    [stats.pipeline]
  );

  const quickActions = useMemo(
    () =>
      [
        { to: "/admin/projects/new", label: "Add project", roles: ["super_admin", "admin", "editor"] as const },
        { to: "/admin/clients/new", label: "Add client", roles: ["super_admin", "admin", "editor"] as const },
        { to: "/admin/inquiries", label: "Review inquiries", roles: ["super_admin", "admin", "editor"] as const },
        { to: "/admin/messages", label: "Send message", roles: ["super_admin", "admin", "editor"] as const },
        { to: "/admin/finance", label: "Finance", roles: ["super_admin", "admin", "finance"] as const },
        { to: "/admin/settings", label: "Settings", roles: ["super_admin", "admin", "editor", "finance", "viewer"] as const },
      ].filter((a) => a.roles.some((r) => hasRole(r))),
    [hasRole]
  );

  const displayName = profile?.full_name ?? profile?.email?.split("@")[0] ?? "Admin";
  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-ZA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const handleRefresh = useCallback(() => refetch(), [refetch]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <Button size="sm" variant="ghost" onClick={handleRefresh} className="text-red-300 hover:text-white h-8">
            Retry
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] mb-1">Overview</p>
          <h1 className="text-white text-2xl md:text-[1.75rem] font-semibold tracking-tight">
            Welcome back, {displayName}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-white/10 text-gray-400 rounded-xl hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          {hasRole("super_admin", "admin", "editor") && (
            <>
              <Link to="/admin/projects/new">
                <Button size="sm" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-xl shadow-md shadow-[#cd3f2c]/15">
                  <Plus className="w-4 h-4 mr-1.5" />
                  New Project
                </Button>
              </Link>
              <Link to="/admin/clients/new">
                <Button size="sm" variant="outline" className="border-white/10 text-gray-300 rounded-xl">
                  <Plus className="w-4 h-4 mr-1.5" />
                  New Client
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <AdminStatCard label="Projects" value={projects.length} icon={FolderKanban} />
        <AdminStatCard label="In Portfolio" value={stats.published} sub={`${stats.drafts} internal`} icon={Eye} accent="text-emerald-400" />
        <AdminStatCard label="Featured" value={stats.featured} icon={Star} />
        <AdminStatCard label="Clients" value={clients.length} icon={Users} accent="text-blue-400" />
        <AdminStatCard label="Inquiries" value={newInquiryCount} sub={`${inquiries.length} total`} icon={Inbox} />
        <AdminStatCard label="Drafts" value={stats.drafts} icon={FileEdit} accent="text-gray-400" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-12 gap-4">
        {/* Pipeline */}
        <Card className="lg:col-span-4 bg-white/[0.02] border-white/[0.06] p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#db7d30]" />
              <h2 className="text-white text-sm font-medium">Client Pipeline</h2>
            </div>
            <Link to="/admin/clients" className="text-gray-600 hover:text-[#edcca5] text-xs transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats.pipeline.map((stage) => (
              <div key={stage.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">{stage.label}</span>
                  <span className="text-white font-semibold tabular-nums">{stage.count}</span>
                </div>
                <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(stage.count / pipelineTotal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/admin/clients"
            className="inline-flex items-center gap-1 text-[#edcca5] text-xs mt-5 hover:text-white transition-colors"
          >
            Manage clients <ArrowRight className="w-3 h-3" />
          </Link>
        </Card>

        {/* Recent projects */}
        <Card className="lg:col-span-4 bg-white/[0.02] border-white/[0.06] p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-sm font-medium">Recent Projects</h2>
            <Link to="/admin/projects" className="text-gray-600 hover:text-white text-xs">All</Link>
          </div>
          {projects.length === 0 ? (
            <AdminEmptyState
              title="No projects yet"
              description="Create your first project and add it to the portfolio."
              action={
                <Link to="/admin/projects/new">
                  <Button size="sm" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-lg text-xs">
                    <Plus className="w-3 h-3 mr-1" /> Create project
                  </Button>
                </Link>
              }
            />
          ) : (
            <ul className="space-y-0.5">
              {projects.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/admin/projects/${p.id}`}
                    className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    {p.image_url ? (
                      <img src={p.image_url} alt="" className="w-8 h-8 rounded-md object-cover shrink-0 bg-white/5" />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
                        <FolderKanban className="w-3.5 h-3.5 text-gray-600" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs font-medium truncate">{p.title}</p>
                      <p className="text-gray-600 text-[10px] truncate">{p.category}</p>
                    </div>
                    <Badge className={`border-0 text-[9px] shrink-0 ${p.published ? "bg-emerald-500/20 text-emerald-300" : "bg-gray-500/20 text-gray-500"}`}>
                      {p.published ? "Live" : "Draft"}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Inquiries */}
        <Card className="lg:col-span-4 bg-white/[0.02] border-white/[0.06] p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-sm font-medium">Latest Inquiries</h2>
            <Link to="/admin/inquiries" className="text-gray-600 hover:text-white text-xs">
              All {newInquiryCount > 0 && `(${newInquiryCount})`}
            </Link>
          </div>
          {inquiries.length === 0 ? (
            <AdminEmptyState
              title="No inquiries yet"
              description="Contact form submissions will appear here."
            />
          ) : (
            <ul className="space-y-0.5">
              {inquiries.slice(0, 5).map((inq) => (
                <li key={inq.id}>
                  <Link
                    to="/admin/inquiries"
                    className="block p-2 -mx-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-xs font-medium truncate">{inq.name}</p>
                      <Badge className={`border-0 text-[9px] capitalize shrink-0 ${statusColors[inq.status]}`}>
                        {inq.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-[10px] truncate mt-0.5">
                      {inq.service ?? inq.email}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Finance summary - role gated */}
        {hasRole("super_admin", "admin", "finance") && (
          <Card className="lg:col-span-6 bg-white/[0.02] border-white/[0.06] p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h2 className="text-white text-sm font-medium">Finance Snapshot</h2>
              </div>
              <Link to="/admin/finance" className="text-gray-600 hover:text-white text-xs">Open finance</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">Invoiced</p>
                <p className="text-white text-lg font-bold tabular-nums">{formatZAR(stats.totalInvoiced)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">Pending</p>
                <p className="text-white text-lg font-bold tabular-nums">{stats.pendingFinance}</p>
              </div>
            </div>
            {financeRecords.length === 0 ? (
              <p className="text-gray-600 text-xs mt-4">No finance records yet.</p>
            ) : (
              <ul className="mt-4 space-y-1 border-t border-white/[0.04] pt-3">
                {financeRecords.slice(0, 3).map((r) => (
                  <li key={r.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 truncate">{r.title}</span>
                    <span className="text-white tabular-nums shrink-0 ml-2">{formatZAR(Number(r.amount))}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}

        {/* Activity feed */}
        <Card className={`${hasRole("super_admin", "admin", "finance") ? "lg:col-span-6" : "lg:col-span-12"} bg-white/[0.02] border-white/[0.06] p-5 rounded-2xl`}>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-4 h-4 text-[#db7d30]" />
            <h2 className="text-white text-sm font-medium">Quick Actions</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Link key={action.to} to={action.to}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg text-xs h-8"
                >
                  {action.label}
                </Button>
              </Link>
            ))}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="ghost" className="text-gray-600 hover:text-white rounded-lg text-xs h-8">
                Preview site
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
