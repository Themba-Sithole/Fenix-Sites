import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./admin/ProtectedRoute";
import { RequireRole } from "./admin/RequireRole";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

const AdminLayout = lazy(() =>
  import("./admin/AdminLayout").then((m) => ({ default: m.AdminLayout }))
);
const AdminLoginPage = lazy(() =>
  import("./pages/admin/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage }))
);
const AdminDashboardPage = lazy(() =>
  import("./pages/admin/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminProjectsPage = lazy(() =>
  import("./pages/admin/AdminProjectsPage").then((m) => ({ default: m.AdminProjectsPage }))
);
const AdminProjectFormPage = lazy(() =>
  import("./pages/admin/AdminProjectFormPage").then((m) => ({ default: m.AdminProjectFormPage }))
);
const AdminClientsPage = lazy(() =>
  import("./pages/admin/AdminClientsPage").then((m) => ({ default: m.AdminClientsPage }))
);
const AdminClientFormPage = lazy(() =>
  import("./pages/admin/AdminClientFormPage").then((m) => ({ default: m.AdminClientFormPage }))
);
const AdminInquiriesPage = lazy(() =>
  import("./pages/admin/AdminInquiriesPage").then((m) => ({ default: m.AdminInquiriesPage }))
);
const AdminAnalyticsPage = lazy(() =>
  import("./pages/admin/AdminAnalyticsPage").then((m) => ({ default: m.AdminAnalyticsPage }))
);
const AdminFinancePage = lazy(() =>
  import("./pages/admin/AdminFinancePage").then((m) => ({ default: m.AdminFinancePage }))
);
const AdminMessagesPage = lazy(() =>
  import("./pages/admin/AdminMessagesPage").then((m) => ({ default: m.AdminMessagesPage }))
);
const AdminUsersPage = lazy(() =>
  import("./pages/admin/AdminUsersPage").then((m) => ({ default: m.AdminUsersPage }))
);
const AdminSettingsPage = lazy(() =>
  import("./pages/admin/AdminSettingsPage").then((m) => ({ default: m.AdminSettingsPage }))
);

function AdminFallback() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="dark min-h-screen bg-black">
          <Suspense fallback={<AdminFallback />}>
            <Routes>
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route
                  path="projects"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminProjectsPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="projects/new"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminProjectFormPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="projects/:id"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminProjectFormPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="clients"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminClientsPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="clients/new"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminClientFormPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="clients/:id"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminClientFormPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="inquiries"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminInquiriesPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="messages"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor"]}>
                      <AdminMessagesPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="finance"
                  element={
                    <RequireRole roles={["super_admin", "admin", "finance"]}>
                      <AdminFinancePage />
                    </RequireRole>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <RequireRole roles={["super_admin", "admin", "editor", "finance", "viewer"]}>
                      <AdminAnalyticsPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="users"
                  element={
                    <RequireRole roles={["super_admin"]}>
                      <AdminUsersPage />
                    </RequireRole>
                  }
                />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
              <Route path="/*" element={<PublicLayout />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}
