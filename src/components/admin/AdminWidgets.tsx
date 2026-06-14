import { memo } from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  accent?: string;
  href?: string;
}

export const AdminStatCard = memo(function AdminStatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "text-[#db7d30]",
}: AdminStatCardProps) {
  return (
    <Card className="relative overflow-hidden bg-white/[0.02] border-white/[0.06] p-5 hover:border-white/12 transition-colors duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.15em] mb-1.5 truncate">
            {label}
          </p>
          <p className="text-white text-2xl font-bold tracking-tight tabular-nums">{value}</p>
          {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
        </div>
        <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
          <Icon className={`w-4 h-4 ${accent}`} />
        </div>
      </div>
    </Card>
  );
});

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Skeleton className="h-36 w-full rounded-2xl bg-white/5" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}

export function AdminEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <p className="text-gray-600 text-xs max-w-[220px]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
