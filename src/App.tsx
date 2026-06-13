import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./admin/ProtectedRoute";
import { AdminLayout } from "./admin/AdminLayout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminProjectsPage } from "./pages/admin/AdminProjectsPage";
import { AdminProjectFormPage } from "./pages/admin/AdminProjectFormPage";
import { AdminClientsPage } from "./pages/admin/AdminClientsPage";
import { AdminClientFormPage } from "./pages/admin/AdminClientFormPage";

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
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="projects/new" element={<AdminProjectFormPage />} />
              <Route path="projects/:id" element={<AdminProjectFormPage />} />
              <Route path="clients" element={<AdminClientsPage />} />
              <Route path="clients/new" element={<AdminClientFormPage />} />
              <Route path="clients/:id" element={<AdminClientFormPage />} />
            </Route>
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
