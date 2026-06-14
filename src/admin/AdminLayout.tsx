import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  LogOut,
  ExternalLink,
  Flame,
  Inbox,
  BarChart3,
  DollarSign,
  MessageSquare,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useInquiries } from "../hooks/useInquiries";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import type { UserRole } from "../lib/types/database";

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  end?: boolean;
  badge?: boolean;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  {
    to: "/admin/projects",
    label: "Projects",
    icon: FolderKanban,
    roles: ["super_admin", "admin", "editor"],
  },
  {
    to: "/admin/clients",
    label: "Clients",
    icon: Users,
    roles: ["super_admin", "admin", "editor"],
  },
  {
    to: "/admin/inquiries",
    label: "Inquiries",
    icon: Inbox,
    badge: true,
    roles: ["super_admin", "admin", "editor"],
  },
  {
    to: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
    roles: ["super_admin", "admin", "editor"],
  },
  {
    to: "/admin/finance",
    label: "Finance",
    icon: DollarSign,
    roles: ["super_admin", "admin", "finance"],
  },
  {
    to: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
    roles: ["super_admin", "admin", "editor", "finance", "viewer"],
  },
  {
    to: "/admin/users",
    label: "Team",
    icon: Shield,
    roles: ["super_admin"],
  },
];

const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  finance: "Finance",
  viewer: "Viewer",
};

export function AdminLayout() {
  const { signOut, user, profile, hasRole } = useAuth();
  const { newCount } = useInquiries();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const visibleNav = navItems.filter(
    (item) => !item.roles || item.roles.some((r) => hasRole(r))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <aside className="w-64 border-r border-white/[0.06] bg-[#06060a] flex flex-col shrink-0">
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold tracking-tight">FenixSites</span>
          </div>
          <p className="text-[11px] text-gray-600 uppercase tracking-widest pl-[42px]">
            Command Center
          </p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {visibleNav.map(({ to, label, icon: Icon, end, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#cd3f2c]/15 to-[#db7d30]/10 text-white shadow-[inset_3px_0_0_#db7d30]"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]"
                }`
              }
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                {label}
              </span>
              {badge && newCount > 0 && (
                <Badge className="bg-[#cd3f2c] text-white border-0 text-[10px] h-5 min-w-5 px-1.5">
                  {newCount}
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.06] space-y-2">
          <div className="px-3 py-2 rounded-xl bg-white/[0.03]">
            <p className="text-white text-xs font-medium truncate">
              {profile?.full_name ?? user?.email?.split("@")[0]}
            </p>
            <p className="text-gray-600 text-[10px] truncate">{user?.email}</p>
            {profile?.role && (
              <Badge className="mt-1.5 bg-white/5 text-gray-400 border-white/10 text-[9px]">
                {ROLE_LABELS[profile.role]}
              </Badge>
            )}
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </a>
          <Button
            variant="outline"
            className="w-full border-white/[0.08] text-gray-400 hover:bg-white/[0.04] hover:text-white rounded-xl"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-[#0a0a0f]">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
