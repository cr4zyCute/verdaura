import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../db/schema';
import { storage } from '../db/storageEngine';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchUser: (userId: string) => void;
  hasRole: (roles: UserRole[]) => boolean;
  isOwner: boolean;
  canEditContent: boolean;
  canManageCRM: boolean;
  canManageUsers: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'verdaura_session_user_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check existing session
    const savedUserId = localStorage.getItem(SESSION_KEY);
    const users = storage.getUsers();

    if (savedUserId) {
      const found = users.find((u) => u.id === savedUserId && u.isActive);
      if (found) {
        setCurrentUser(found);
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } else {
      // Default initial demo session to Elena Hawthorne (Owner) for immediate convenience
      const defaultOwner = users.find((u) => u.role === 'owner') || users[0];
      if (defaultOwner) {
        localStorage.setItem(SESSION_KEY, defaultOwner.id);
        setCurrentUser(defaultOwner);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role?: UserRole): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const users = storage.getUsers();
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user && role) {
      // Allow demo quick-provision
      user = users.find((u) => u.role === role);
    }

    if (!user) {
      setIsLoading(false);
      return { success: false, error: 'No authorized administrative account found with this email.' };
    }

    if (!user.isActive) {
      setIsLoading(false);
      return { success: false, error: 'This user account has been deactivated by the system owner.' };
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    storage.saveUser(user);
    storage.logAudit({
      action: 'USER_LOGIN',
      module: 'auth',
      details: `${user.name} (${user.role}) authenticated successfully.`,
      actorId: user.id,
      actorName: user.name,
    });

    localStorage.setItem(SESSION_KEY, user.id);
    setCurrentUser(user);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      storage.logAudit({
        action: 'USER_LOGOUT',
        module: 'auth',
        details: `${currentUser.name} signed out.`,
        actorId: currentUser.id,
        actorName: currentUser.name,
      });
    }
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const users = storage.getUsers();
    const target = users.find((u) => u.id === userId);
    if (target) {
      localStorage.setItem(SESSION_KEY, target.id);
      setCurrentUser(target);
      storage.logAudit({
        action: 'USER_SWITCH',
        module: 'auth',
        details: `Session switched to ${target.name} (${target.role}).`,
        actorId: target.id,
        actorName: target.name,
      });
    }
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'owner') return true; // Owner has all permissions
    return roles.includes(currentUser.role);
  };

  const isOwner = currentUser?.role === 'owner';
  const canEditContent = hasRole(['owner', 'administrator', 'content_editor']);
  const canManageCRM = hasRole(['owner', 'administrator', 'sales_staff']);
  const canManageUsers = hasRole(['owner', 'administrator']);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        logout,
        switchUser,
        hasRole,
        isOwner,
        canEditContent,
        canManageCRM,
        canManageUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
