import { FolderKanban, Users, Inbox } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";
import { useInquiries } from "../../hooks/useInquiries";
import { useAuth } from "../../context/AuthContext";
import { AdminPageHeader, AdminSection } from "../../components/admin/AdminFormField";
import { AdminStatCard } from "../../components/admin/AdminWidgets";

export function AdminAnalyticsPage() {
  const { hasRole } = useAuth();
  const canViewInquiries = hasRole("super_admin", "admin", "editor");

  const { projects, loading: pLoading } = useProjects({ admin: true });
  const { clients, loading: cLoading } = useClients();
  const { inquiries, loading: iLoading } = useInquiries({ enabled: canViewInquiries });

  if (pLoading || cLoading || (canViewInquiries && iLoading)) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const published = projects.filter((p) => p.published).length;
  const byCategory = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.filter_category] = (acc[p.filter_category] ?? 0) + 1;
    return acc;
  }, {});

  const clientByStatus = clients.reduce<Record<string, number>>((acc, c) => {
    acc[c.status] = (acc[c.status] ?? 0) + 1;
    return acc;
  }, {});

  const inquiryByStatus = inquiries.reduce<Record<string, number>>((acc, inq) => {
    acc[inq.status] = (acc[inq.status] ?? 0) + 1;
    return acc;
  }, {});

  const publishRate = projects.length ? Math.round((published / projects.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analytics"
        description="Overview of your agency performance"
      />

      <div className={`grid gap-4 ${canViewInquiries ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        <AdminStatCard label="Publish rate" value={`${publishRate}%`} icon={FolderKanban} />
        <AdminStatCard label="Total clients" value={clients.length} icon={Users} accent="text-emerald-400" />
        {canViewInquiries && (
          <AdminStatCard label="Total inquiries" value={inquiries.length} icon={Inbox} />
        )}
      </div>

      <div className={`grid gap-6 ${canViewInquiries ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <AdminSection title="Projects by category">
          {Object.keys(byCategory).length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(byCategory).map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-400 capitalize">{cat}</span>
                    <span className="text-white tabular-nums">{count}</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-full"
                      style={{ width: `${(count / projects.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminSection>

        <AdminSection title="Clients by status">
          {Object.keys(clientByStatus).length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(clientByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between text-sm py-1">
                  <span className="text-gray-400 capitalize">{status}</span>
                  <span className="text-white font-medium tabular-nums">{count}</span>
                </div>
              ))}
            </div>
          )}
        </AdminSection>

        {canViewInquiries && (
          <AdminSection title="Inquiries by status">
            {Object.keys(inquiryByStatus).length === 0 ? (
              <p className="text-gray-500 text-sm">No data yet</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(inquiryByStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between text-sm py-1">
                    <span className="text-gray-400 capitalize">{status}</span>
                    <span className="text-white font-medium tabular-nums">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </AdminSection>
        )}
      </div>
    </div>
  );
}
