import { BarChart3, FolderKanban, Users, Inbox } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";
import { useInquiries } from "../../hooks/useInquiries";
import { Card } from "../../components/ui/card";

export function AdminAnalyticsPage() {
  const { projects, loading: pLoading } = useProjects({ admin: true });
  const { clients, loading: cLoading } = useClients();
  const { inquiries, loading: iLoading } = useInquiries();

  if (pLoading || cLoading || iLoading) {
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
      <div>
        <h1 className="text-white text-2xl font-semibold mb-1">Analytics</h1>
        <p className="text-gray-500 text-sm">Overview of your agency performance</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-white/[0.03] border-white/10 p-6 text-center">
          <FolderKanban className="w-8 h-8 text-[#db7d30] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white">{publishRate}%</p>
          <p className="text-gray-500 text-sm">Publish rate</p>
        </Card>
        <Card className="bg-white/[0.03] border-white/10 p-6 text-center">
          <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <p className="text-3xl font-bold text-white">{clients.length}</p>
          <p className="text-gray-500 text-sm">Total clients</p>
        </Card>
        <Card className="bg-white/[0.03] border-white/10 p-6 text-center">
          <Inbox className="w-8 h-8 text-[#cd3f2c] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white">{inquiries.length}</p>
          <p className="text-gray-500 text-sm">Total inquiries</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/[0.03] border-white/10 p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-[#db7d30]" />
            <h2 className="text-white font-medium">Projects by Type</h2>
          </div>
          {Object.keys(byCategory).length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(byCategory).map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 capitalize">{cat}</span>
                    <span className="text-white">{count}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-full"
                      style={{ width: `${(count / projects.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="bg-white/[0.03] border-white/10 p-6">
          <h2 className="text-white font-medium mb-5">Clients by Status</h2>
          {Object.keys(clientByStatus).length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(clientByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{status}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="bg-white/[0.03] border-white/10 p-6">
          <h2 className="text-white font-medium mb-5">Inquiries by Status</h2>
          {Object.keys(inquiryByStatus).length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(inquiryByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{status}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
