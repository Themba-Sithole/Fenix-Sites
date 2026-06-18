import { memo } from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { adminCardClass } from "./AdminFormField";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  accent?: string;
}

export const AdminStatCard = memo(function AdminStatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "text-[#db7d30]",
}: AdminStatCardProps) {
  return (
    <Card
      className={`${adminCardClass} p-4 md:p-5 min-h-[104px] flex flex-col justify-between hover:border-white/[0.12] transition-colors`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-gray-500 text-[11px] uppercase tracking-[0.14em] leading-snug">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
          <Icon className={`w-4 h-4 ${accent}`} />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-white text-2xl font-bold tracking-tight tabular-nums leading-none">{value}</p>
        {sub && <p className="text-gray-600 text-xs mt-1.5">{sub}</p>}
      </div>
    </Card>
  );
});

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Skeleton className="h-28 w-full rounded-xl bg-white/5" />
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[104px] rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-xl bg-white/5" />
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
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <p className="text-gray-600 text-xs max-w-[240px] leading-relaxed">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
