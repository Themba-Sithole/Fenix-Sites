import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../lib/types/database";

interface RequireRoleProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: string;
}

export function RequireRole({ roles, children, fallback = "/admin" }: RequireRoleProps) {
  const { hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasRole(...roles)) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
