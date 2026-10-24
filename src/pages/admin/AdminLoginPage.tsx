import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth/authContext';
import { storage } from '../../lib/db/storageEngine';
import { UserRole } from '../../lib/db/schema';
import { Sparkles, Shield, Lock, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('elena@verdaura.com');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const users = storage.getUsers();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email);
    setLoading(false);

    if (res.success) {
      const from = (location.state as any)?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid credentials.');
    }
  };

  const handleQuickRole = async (targetRole: UserRole) => {
    const user = users.find((u) => u.role === targetRole);
    if (user) {
      setEmail(user.email);
      const res = await login(user.email, targetRole);
      if (res.success) {
        navigate('/admin', { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative antialiased text-charcoal">
      {/* Return to Public Website link */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-forest-800 hover:text-forest-950 transition-colors bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-full border border-sand-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Verdaura Apothecary</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-forest text-sunflower-400 flex items-center justify-center shadow-botanical mb-3 border border-sunflower/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="font-serif font-bold text-3xl text-forest-950 tracking-tight">
          Verdaura Workspace
        </h2>
        <p className="text-xs text-charcoal-600 max-w-xs mx-auto">
          Administrative Portal, Customer Relationship Management &amp; Content Control
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-3xl border border-sand-200/90 shadow-botanical space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-forest-950 mb-1.5">
                Staff Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@verdaura.com"
                className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-[#FCFAF7] text-charcoal focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all text-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-semibold text-forest-950">
                  Password
                </label>
                <span className="text-[10px] text-charcoal-500 italic">
                  Protected with Better Auth
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-[#FCFAF7] text-charcoal focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all text-xs"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-xs py-3 rounded-xl mt-2 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Role Simulator Demo Shortcuts */}
          <div className="pt-4 border-t border-sand-200 space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] uppercase font-semibold text-charcoal-500 tracking-wider">
              <Shield className="w-3.5 h-3.5 text-forest" />
              <span>Quick Test Sign-In Profiles</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRole('owner')}
                className="p-2 rounded-xl border border-sand-200 hover:border-forest-300 hover:bg-forest-50/60 transition-all text-left"
              >
                <p className="text-[11px] font-bold text-forest-950 leading-tight">Elena</p>
                <span className="text-[9.5px] text-forest-700 font-medium">Owner</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRole('sales_staff')}
                className="p-2 rounded-xl border border-sand-200 hover:border-forest-300 hover:bg-forest-50/60 transition-all text-left"
              >
                <p className="text-[11px] font-bold text-forest-950 leading-tight">Marcus</p>
                <span className="text-[9.5px] text-olive-700 font-medium">Sales Staff</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRole('content_editor')}
                className="p-2 rounded-xl border border-sand-200 hover:border-forest-300 hover:bg-forest-50/60 transition-all text-left"
              >
                <p className="text-[11px] font-bold text-forest-950 leading-tight">Clara</p>
                <span className="text-[9.5px] text-amber-700 font-medium">Editor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
