import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';
import { UserRole } from '../db/schema';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-serif text-forest-900 tracking-wide">
            Authenticating Verdaura Workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = currentUser.role === 'owner' || allowedRoles.includes(currentUser.role);
    if (!hasPermission) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-sand-200 p-8 text-center space-y-4 shadow-botanical">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 mx-auto flex items-center justify-center text-xl font-bold">
              !
            </div>
            <h2 className="font-serif font-bold text-2xl text-forest-950">Access Restricted</h2>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Your account ({currentUser.name} — <span className="font-semibold capitalize">{currentUser.role.replace('_', ' ')}</span>) does not have authorization to view this module.
            </p>
            <div className="pt-2">
              <a
                href="/admin"
                className="btn-primary text-xs px-5 py-2.5"
              >
                Return to Overview
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
