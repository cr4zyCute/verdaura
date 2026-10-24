import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  GitPullRequest,
  CalendarCheck,
  Activity as ActivityIcon,
  MessageSquare,
  FileText,
  BarChart3,
  ShieldCheck,
  Settings,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../lib/auth/authContext';
import { storage } from '../../lib/db/storageEngine';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, logout, switchUser, isOwner, canEditContent, canManageCRM, canManageUsers } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const users = storage.getUsers();
  const inquiries = storage.getInquiries();
  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative ${
      isActive
        ? 'bg-forest-900 text-sunflower-400 font-semibold shadow-sm'
        : 'text-forest-100 hover:text-white hover:bg-forest-800/80'
    }`;

  const renderNavGroup = (title: string, items: { label: string; to: string; icon: React.ReactNode; badge?: number; allowed?: boolean }[]) => {
    const visibleItems = items.filter((item) => item.allowed !== false);
    if (visibleItems.length === 0) return null;

    return (
      <div className="space-y-1 py-1.5">
        {!collapsed && (
          <div className="px-3 text-[10px] uppercase tracking-wider font-semibold text-forest-300/70 py-1">
            {title}
          </div>
        )}
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={navLinkClass}
            title={collapsed ? item.label : undefined}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-sunflower text-forest-950">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col antialiased text-charcoal">
      {/* Top Mobile Bar */}
      <header className="lg:hidden bg-forest-950 text-white px-4 py-3 flex items-center justify-between border-b border-forest-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-forest-200 hover:text-white hover:bg-forest-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg text-cream tracking-wide">Verdaura</span>
            <span className="text-[10px] uppercase font-semibold bg-forest-800 text-sunflower-400 px-1.5 py-0.5 rounded">
              xRM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="text-[11px] text-forest-200 hover:text-white flex items-center gap-1 bg-forest-900 px-2 py-1 rounded-md"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Container */}
        <aside
          className={`bg-forest text-white flex flex-col justify-between transition-all duration-300 z-30 fixed lg:static inset-y-0 left-0 border-r border-forest-800/80 shadow-lg lg:shadow-none ${
            mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
          } ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
        >
          {/* Top Brand Section */}
          <div className="p-4 border-b border-forest-800/80 flex items-center justify-between">
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-forest-900 border border-sunflower/30 flex items-center justify-center text-sunflower-400 shrink-0 shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-base text-cream tracking-wide leading-none">
                    Verdaura
                  </h1>
                  <span className="text-[10px] text-forest-300 tracking-wider uppercase font-semibold">
                    Admin &amp; xRM Portal
                  </span>
                </div>
              </div>
            ) : (
              <div className="mx-auto w-9 h-9 rounded-xl bg-forest-900 border border-sunflower/30 flex items-center justify-center text-sunflower-400 shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 custom-scrollbar">
            {renderNavGroup('Overview', [
              { label: 'Dashboard', to: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Analytics', to: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> },
            ])}

            {renderNavGroup('Relationship Management', [
              { label: 'Leads', to: '/admin/crm/leads', icon: <UserCheck className="w-4 h-4" />, allowed: canManageCRM },
              { label: 'Contacts', to: '/admin/crm/contacts', icon: <Users className="w-4 h-4" />, allowed: canManageCRM },
              { label: 'Companies (B2B)', to: '/admin/crm/companies', icon: <Building2 className="w-4 h-4" />, allowed: canManageCRM },
              { label: 'Deal Pipeline', to: '/admin/crm/deals', icon: <GitPullRequest className="w-4 h-4" />, allowed: canManageCRM },
              { label: 'Tasks & Follow-ups', to: '/admin/crm/tasks', icon: <CalendarCheck className="w-4 h-4" />, allowed: canManageCRM },
              { label: 'Activity Timeline', to: '/admin/crm/activities', icon: <ActivityIcon className="w-4 h-4" />, allowed: canManageCRM },
            ])}

            {renderNavGroup('Business Operations', [
              {
                label: 'Website Inquiries',
                to: '/admin/inquiries',
                icon: <MessageSquare className="w-4 h-4" />,
                badge: pendingInquiriesCount,
              },
              {
                label: 'Website Content (CMS)',
                to: '/admin/content',
                icon: <FileText className="w-4 h-4" />,
                allowed: canEditContent,
              },
            ])}

            {renderNavGroup('Management', [
              { label: 'Team & Roles', to: '/admin/users', icon: <ShieldCheck className="w-4 h-4" />, allowed: canManageUsers },
              { label: 'Settings', to: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
              { label: 'Audit Logs', to: '/admin/audit-logs', icon: <History className="w-4 h-4" />, allowed: isOwner },
            ])}
          </div>

          {/* User Account / Footer Section */}
          <div className="p-3 border-t border-forest-800/80 bg-forest-950/60">
            {!collapsed ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 px-1 py-1">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128'}
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full object-cover border border-sand-300/40"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-cream truncate leading-none">
                      {currentUser?.name}
                    </p>
                    <span className="text-[10px] text-sunflower-400/90 capitalize">
                      {currentUser?.role.replace('_', ' ')}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-forest-300 hover:text-amber-400 hover:bg-forest-800 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Profile Switcher (for testing multi-role authorizations) */}
                <div className="pt-1 border-t border-forest-800/60">
                  <label className="block text-[9px] uppercase tracking-wider text-forest-400 mb-1">
                    Simulate Role
                  </label>
                  <select
                    value={currentUser?.id}
                    onChange={(e) => switchUser(e.target.value)}
                    className="w-full text-[11px] bg-forest-900 border border-forest-700 rounded-lg text-forest-100 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-sunflower"
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.role.replace('_', ' ')})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-1">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128'}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover border border-sand-300/40"
                  title={`${currentUser?.name} (${currentUser?.role})`}
                />
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-forest-300 hover:text-amber-400 hover:bg-forest-800 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Desktop Navigation & Breadcrumbs Bar */}
          <div className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white border-b border-sand-200">
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal-500 font-medium capitalize">
                Verdaura Workspace
              </span>
              <span className="text-charcoal-400">/</span>
              <span className="text-xs font-semibold text-forest-900 capitalize">
                {location.pathname.replace('/admin', '').replace('/', '') || 'Overview'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/60 text-xs text-forest-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Local-First DB Active</span>
              </div>

              <Link
                to="/"
                target="_blank"
                className="btn-secondary text-xs px-3.5 py-1.5 min-h-[32px] gap-1.5"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3 h-3 text-forest-700" />
              </Link>
            </div>
          </div>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
