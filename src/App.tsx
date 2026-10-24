import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './lib/auth/authContext';
import { ProtectedRoute } from './lib/auth/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductsPage } from './pages/ProductsPage';

// Admin & xRM Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { DashboardOverviewPage } from './pages/admin/DashboardOverviewPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { LeadsPage } from './pages/admin/LeadsPage';
import { ContactsPage } from './pages/admin/ContactsPage';
import { CompaniesPage } from './pages/admin/CompaniesPage';
import { DealsPage } from './pages/admin/DealsPage';
import { ActivitiesPage } from './pages/admin/ActivitiesPage';
import { TasksPage } from './pages/admin/TasksPage';
import { InquiriesPage } from './pages/admin/InquiriesPage';
import { ContentManagerPage } from './pages/admin/ContentManagerPage';
import { UsersPage } from './pages/admin/UsersPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Storefront Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Dashboard & Analytics */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DashboardOverviewPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AnalyticsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* xRM: Lead Management */}
          <Route
            path="/admin/crm/leads"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator', 'sales_staff']}>
                <AdminLayout>
                  <LeadsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* xRM: Contacts Directory */}
          <Route
            path="/admin/crm/contacts"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator', 'sales_staff']}>
                <AdminLayout>
                  <ContactsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* xRM: Companies & Accounts */}
          <Route
            path="/admin/crm/companies"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator', 'sales_staff']}>
                <AdminLayout>
                  <CompaniesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* xRM: Deal Pipeline */}
          <Route
            path="/admin/crm/deals"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator', 'sales_staff']}>
                <AdminLayout>
                  <DealsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* xRM: Activity Stream */}
          <Route
            path="/admin/crm/activities"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator', 'sales_staff']}>
                <AdminLayout>
                  <ActivitiesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* xRM: Follow-up Tasks */}
          <Route
            path="/admin/crm/tasks"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator', 'sales_staff']}>
                <AdminLayout>
                  <TasksPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Business Operations: Website Inquiries */}
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <InquiriesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Business Operations: CMS Content Control */}
          <Route
            path="/admin/content"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator', 'content_editor']}>
                <AdminLayout>
                  <ContentManagerPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Management: Team & Roles */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['owner', 'administrator']}>
                <AdminLayout>
                  <UsersPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Management: Settings */}
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <SettingsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Management: Security Audit Logs */}
          <Route
            path="/admin/audit-logs"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <AdminLayout>
                  <AuditLogsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
