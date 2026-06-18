import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Users,
  Eye,
  Star,
  Inbox,
  FileEdit,
  Plus,
  ArrowRight,
  MessageSquare,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useAdminData } from "../../context/AdminDataContext";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  AdminStatCard,
  DashboardSkeleton,
  AdminEmptyState,
} from "../../components/admin/AdminWidgets";
import { AdminPageHeader, AdminSection, adminCardClass } from "../../components/admin/AdminFormField";

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

  const canViewStaffData = hasRole("super_admin", "admin", "editor", "finance", "viewer");
  const canManageContent = hasRole("super_admin", "admin", "editor");
  const canViewInquiries = hasRole("super_admin", "admin", "editor");
  const canViewFinance = hasRole("super_admin", "admin", "finance");

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
      pipeline: [
        { label: "Leads", count: leads, color: "bg-blue-500" },
        { label: "Active", count: activeClients, color: "bg-emerald-500" },
        { label: "Completed", count: completed, color: "bg-purple-500" },
      ],
      totalInvoiced,
      pendingFinance,
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
        { to: "/admin/messages", label: "Internal notes", roles: ["super_admin", "admin", "editor"] as const },
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

  const headerActions = (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        disabled={refreshing}
        className="border-white/10 text-gray-400 hover:text-white"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
        Refresh
      </Button>
      {canManageContent && (
        <>
          <Link to="/admin/projects/new">
            <Button size="sm" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
              <Plus className="w-4 h-4 mr-1.5" />
              New Project
            </Button>
          </Link>
          <Link to="/admin/clients/new">
            <Button size="sm" variant="outline" className="border-white/10 text-gray-300">
              <Plus className="w-4 h-4 mr-1.5" />
              New Client
            </Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="space-y-8">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <Button size="sm" variant="ghost" onClick={handleRefresh} className="text-red-300 hover:text-white h-8">
            Retry
          </Button>
        </div>
      )}

      <AdminPageHeader
        eyebrow="Overview"
        title={`Welcome back, ${displayName}`}
        description={today}
        actions={headerActions}
      />

      {canViewStaffData && (
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4">
          <AdminStatCard label="Projects" value={projects.length} icon={FolderKanban} />
          <AdminStatCard
            label="In Portfolio"
            value={stats.published}
            sub={`${stats.drafts} internal`}
            icon={Eye}
            accent="text-emerald-400"
          />
          <AdminStatCard label="Featured" value={stats.featured} icon={Star} />
          <AdminStatCard label="Clients" value={clients.length} icon={Users} accent="text-blue-400" />
          {canViewInquiries && (
            <AdminStatCard
              label="Inquiries"
              value={newInquiryCount}
              sub={`${inquiries.length} total`}
              icon={Inbox}
            />
          )}
          <AdminStatCard label="Drafts" value={stats.drafts} icon={FileEdit} accent="text-gray-400" />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {canViewStaffData && (
            <AdminSection
              title="Client Pipeline"
              action={
                <Link to="/admin/clients" className="text-gray-500 hover:text-[#edcca5] text-xs transition-colors">
                  View all
                </Link>
              }
            >
              <div className="space-y-4">
                {stats.pipeline.map((stage) => (
                  <div key={stage.label} className="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-3">
                    <span className="text-gray-400 text-xs">{stage.label}</span>
                    <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                        style={{ width: `${(stage.count / pipelineTotal) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-xs font-semibold text-right tabular-nums">
                      {stage.count}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/clients"
                className="inline-flex items-center gap-1 text-[#edcca5] text-xs mt-5 hover:text-white transition-colors"
              >
                Manage clients <ArrowRight className="w-3 h-3" />
              </Link>
            </AdminSection>
          )}

          {canViewFinance && (
            <AdminSection
              title="Finance Snapshot"
              action={
                <Link to="/admin/finance" className="text-gray-500 hover:text-white text-xs">
                  Open finance
                </Link>
              }
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">Invoiced</p>
                  <p className="text-white text-xl font-bold tabular-nums">{formatZAR(stats.totalInvoiced)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">Pending</p>
                  <p className="text-white text-xl font-bold tabular-nums">{stats.pendingFinance}</p>
                </div>
              </div>
              {financeRecords.length === 0 ? (
                <p className="text-gray-600 text-xs">No finance records yet.</p>
              ) : (
                <ul className="space-y-2 border-t border-white/[0.06] pt-4">
                  {financeRecords.slice(0, 3).map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-gray-400 truncate">{r.title}</span>
                      <span className="text-white tabular-nums shrink-0">{formatZAR(Number(r.amount))}</span>
                    </li>
                  ))}
                </ul>
              )}
            </AdminSection>
          )}
        </div>

        <div className="space-y-6">
          {canViewStaffData && (
            <AdminSection
              title="Recent Projects"
              action={
                <Link to="/admin/projects" className="text-gray-500 hover:text-white text-xs">
                  All
                </Link>
              }
            >
              {projects.length === 0 ? (
                <AdminEmptyState
                  title="No projects yet"
                  description="Create your first project and add it to the portfolio."
                  action={
                    canManageContent ? (
                      <Link to="/admin/projects/new">
                        <Button size="sm" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] text-xs">
                          <Plus className="w-3 h-3 mr-1" /> Create project
                        </Button>
                      </Link>
                    ) : undefined
                  }
                />
              ) : (
                <ul className="space-y-1">
                  {projects.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/admin/projects/${p.id}`}
                        className="flex items-center gap-3 p-2.5 -mx-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                      >
                        {p.image_url ? (
                          <img src={p.image_url} alt="" className="w-9 h-9 rounded-md object-cover shrink-0 bg-white/5" />
                        ) : (
                          <div className="w-9 h-9 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
                            <FolderKanban className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-white text-sm font-medium truncate">{p.title}</p>
                          <p className="text-gray-600 text-xs truncate">{p.category}</p>
                        </div>
                        <Badge
                          className={`border-0 text-[10px] shrink-0 ${
                            p.published ? "bg-emerald-500/20 text-emerald-300" : "bg-gray-500/20 text-gray-500"
                          }`}
                        >
                          {p.published ? "Live" : "Draft"}
                        </Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </AdminSection>
          )}

          {canViewInquiries && (
            <AdminSection
              title="Latest Inquiries"
              action={
                <Link to="/admin/inquiries" className="text-gray-500 hover:text-white text-xs">
                  All {newInquiryCount > 0 && `(${newInquiryCount})`}
                </Link>
              }
            >
              {inquiries.length === 0 ? (
                <AdminEmptyState
                  title="No inquiries yet"
                  description="Contact form submissions will appear here."
                />
              ) : (
                <ul className="space-y-1">
                  {inquiries.slice(0, 5).map((inq) => (
                    <li key={inq.id}>
                      <Link
                        to="/admin/inquiries"
                        className="block p-2.5 -mx-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white text-sm font-medium truncate">{inq.name}</p>
                          <Badge className={`border-0 text-[10px] capitalize shrink-0 ${statusColors[inq.status]}`}>
                            {inq.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-xs truncate mt-0.5">
                          {inq.service ?? inq.email}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </AdminSection>
          )}
        </div>
      </div>

      <section className={`${adminCardClass} p-5 md:p-6`}>
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
                className="border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs h-9"
              >
                {action.label}
              </Button>
            </Link>
          ))}
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="ghost" className="text-gray-600 hover:text-white text-xs h-9">
              Preview site
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
