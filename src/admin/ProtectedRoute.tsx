import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-3">
          <p className="text-white font-medium">Account not set up</p>
          <p className="text-gray-500 text-sm">
            Your team profile is missing. Ask a super admin to create your account in the Team section,
            or run the profiles migration in Supabase.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
