import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate, useLocation, Link } from "react-router-dom";
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
  Settings,
  Menu,
  RefreshCw,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { AdminDataProvider, useAdminData } from "../context/AdminDataContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
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
  { to: "/admin/projects", label: "Projects", icon: FolderKanban, roles: ["super_admin", "admin", "editor"] },
  { to: "/admin/clients", label: "Clients", icon: Users, roles: ["super_admin", "admin", "editor"] },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox, badge: true, roles: ["super_admin", "admin", "editor"] },
  { to: "/admin/messages", label: "Notes", icon: MessageSquare, roles: ["super_admin", "admin", "editor"] },
  { to: "/admin/finance", label: "Finance", icon: DollarSign, roles: ["super_admin", "admin", "finance"] },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, roles: ["super_admin", "admin", "editor", "finance", "viewer"] },
  { to: "/admin/users", label: "Team", icon: Shield, roles: ["super_admin"] },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  finance: "Finance",
  viewer: "Viewer",
};

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/clients": "Clients",
  "/admin/inquiries": "Inquiries",
  "/admin/messages": "Notes",
  "/admin/finance": "Finance",
  "/admin/analytics": "Analytics",
  "/admin/users": "Team",
  "/admin/settings": "Settings",
};

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { hasRole } = useAuth();
  const { newInquiryCount } = useAdminData();

  const visibleNav = navItems.filter(
    (item) => !item.roles || item.roles.some((r) => hasRole(r))
  );

  return (
    <nav className="flex-1 min-h-0 p-3 space-y-0.5 overflow-y-auto">
      {visibleNav.map(({ to, label, icon: Icon, end, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 ${
              isActive
                ? "bg-white/[0.06] text-white font-medium"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
            }`
          }
        >
          <span className="flex items-center gap-3 min-w-0">
            <Icon className="w-4 h-4 opacity-80 shrink-0" />
            <span className="truncate">{label}</span>
          </span>
          {badge && newInquiryCount > 0 && (
            <Badge className="bg-[#cd3f2c] text-white border-0 text-[10px] h-5 min-w-5 px-1.5 shrink-0">
              {newInquiryCount}
            </Badge>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function SidebarFooter({ onSignOut }: { onSignOut: () => void }) {
  const { user, profile } = useAuth();

  return (
    <div className="shrink-0 p-3 border-t border-white/[0.05] space-y-1">
      <div className="px-3 py-2.5 rounded-xl bg-white/[0.02]">
        <p className="text-white text-xs font-medium truncate">
          {profile?.full_name ?? user?.email?.split("@")[0]}
        </p>
        <p className="text-gray-500 text-[10px] truncate mt-0.5">{user?.email}</p>
        {profile?.role && (
          <Badge className="mt-1.5 bg-white/5 text-gray-400 border-white/[0.06] text-[9px]">
            {ROLE_LABELS[profile.role]}
          </Badge>
        )}
      </div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-white px-3 py-2 rounded-xl hover:bg-white/[0.03] transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        View Website
      </a>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-full justify-start text-gray-500 hover:text-white hover:bg-white/[0.03] rounded-xl h-9"
        onClick={onSignOut}
      >
        <LogOut className="w-3.5 h-3.5 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}

function AdminShell() {
  const { signOut, profile, hasRole } = useAuth();
  const { refreshing, refetch, newInquiryCount } = useAdminData();
  const canViewInquiries = hasRole("super_admin", "admin", "editor");
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const skipRouteRefetch = useRef(true);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const pageTitle =
    pageTitles[location.pathname] ??
    (location.pathname.includes("/projects/")
      ? "Edit Project"
      : location.pathname.includes("/clients/")
        ? "Edit Client"
        : "Admin");

  useEffect(() => {
    if (skipRouteRefetch.current) {
      skipRouteRefetch.current = false;
      return;
    }
    void refetch();
  }, [location.pathname, refetch]);

  const compact = profile?.settings?.compact_sidebar;

  return (
    <div className="flex min-h-screen bg-[#08080c]">
      {/* Desktop sidebar — flex column; main content scrolls independently */}
      <aside
        className={`hidden md:flex w-64 shrink-0 flex-col min-h-screen border-r border-white/[0.05] bg-[#050508] overflow-hidden ${compact ? "text-[13px]" : ""}`}
      >
        <div className={`shrink-0 border-b border-white/[0.05] ${compact ? "p-4" : "p-5"}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate leading-tight">FenixSites</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wider leading-snug mt-0.5">
                Command Center
              </p>
            </div>
          </div>
        </div>

        <SidebarNav />
        <SidebarFooter onSignOut={() => void handleSignOut()} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden">
        <header className="shrink-0 z-30 flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-14 border-b border-white/[0.05] bg-[#08080c]/95 backdrop-blur-md">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-400 h-9 w-9 p-0"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-[#050508] border-white/10 p-0 flex flex-col">
              <div className="shrink-0 p-5 border-b border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold">FenixSites</span>
                </div>
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
              <SidebarFooter onSignOut={() => void handleSignOut()} />
            </SheetContent>
          </Sheet>

          <p className="text-gray-500 text-xs font-medium flex-1 truncate hidden sm:block">
            {pageTitle}
          </p>
          <div className="flex-1 sm:hidden" />

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={refreshing}
              className="text-gray-500 hover:text-white h-9 w-9 p-0"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
            {canViewInquiries && (
              <Link to="/admin/inquiries" className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-white h-9 w-9 p-0"
                  title="Inquiries"
                >
                  <Bell className="w-4 h-4" />
                </Button>
                {newInquiryCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#cd3f2c] rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {newInquiryCount > 9 ? "9+" : newInquiryCount}
                  </span>
                )}
              </Link>
            )}
            <Link to="/admin/settings">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-white h-9 w-9 p-0"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#08080c]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export function AdminLayout() {
  return (
    <AdminDataProvider>
      <AdminShell />
    </AdminDataProvider>
  );
}
