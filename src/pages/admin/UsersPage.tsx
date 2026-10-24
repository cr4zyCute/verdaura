import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User, UserRole } from '../../lib/db/schema';
import { storage } from '../../lib/db/storageEngine';
import { DataTable } from '../../components/admin/DataTable';
import { useAuth } from '../../lib/auth/authContext';
import {
  ShieldCheck,
  Plus,
  X,
  Sparkles,
} from 'lucide-react';

export const UsersPage: React.FC = () => {
  const { currentUser, isOwner } = useAuth();
  const [users, setUsers] = useState<User[]>(storage.getUsers());
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'sales_staff' as UserRole,
  });

  const loadData = () => {
    setUsers(storage.getUsers());
  };

  useEffect(() => {
    const unsub = storage.subscribe(loadData);
    return () => unsub();
  }, []);

  const handleToggleActive = (user: User) => {
    if (user.role === 'owner') {
      alert('The primary business owner account cannot be deactivated.');
      return;
    }
    storage.saveUser({
      ...user,
      isActive: !user.isActive,
    });
    loadData();
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveUser(newUser);
    storage.logAudit({
      action: 'USER_INVITED',
      module: 'users',
      details: `Added new user ${newUser.name} with role ${newUser.role}.`,
      actorId: currentUser?.id || 'usr-1',
      actorName: currentUser?.name || 'Elena Hawthorne',
    });
    setFormData({ name: '', email: '', role: 'sales_staff' });
    setModalOpen(false);
    loadData();
  };

  const columns: ColumnDef<User, any>[] = [
    {
      accessorKey: 'name',
      header: 'Staff Member',
      cell: ({ row }: { row: any }) => {
        const u = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128'}
              alt={u.name}
              className="w-8 h-8 rounded-full object-cover border border-sand-300"
            />
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-950">{u.name}</h4>
              <p className="text-[11px] text-charcoal-500">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Role & Permissions',
      cell: ({ row }: { row: any }) => {
        const role = row.original.role as UserRole;
        const colors: Record<UserRole, string> = {
          owner: 'bg-forest-900 text-sunflower-400 font-bold border-forest-700',
          administrator: 'bg-forest-100 text-forest-900 font-semibold border-forest-300',
          sales_staff: 'bg-olive-50 text-olive-800 border-olive-200',
          content_editor: 'bg-amber-50 text-amber-900 border-amber-300',
          viewer: 'bg-sand-100 text-charcoal-700 border-sand-300',
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] border uppercase tracking-wider ${colors[role] || 'bg-sand-100'}`}>
            {role.replace('_', ' ')}
          </span>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Account Status',
      cell: ({ row }: { row: any }) => {
        const u = row.original;
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${
              u.isActive
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                u.isActive ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
            <span>{u.isActive ? 'Active' : 'Suspended'}</span>
          </span>
        );
      },
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Authentication',
      cell: ({ row }: { row: any }) => {
        const time = row.original.lastLogin;
        if (!time) return <span className="text-charcoal-400 text-xs italic">Never logged in</span>;
        return (
          <span className="text-xs text-charcoal-600">
            {new Date(time).toLocaleDateString()} • {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Control',
      cell: ({ row }: { row: any }) => {
        const u = row.original;
        if (u.role === 'owner') {
          return <span className="text-[10.5px] text-charcoal-400 italic">Protected</span>;
        }

        return (
          <button
            onClick={() => handleToggleActive(u)}
            className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
              u.isActive
                ? 'border-sand-300 text-charcoal-700 hover:bg-sand-100'
                : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {u.isActive ? 'Suspend' : 'Activate'}
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-forest" />
            Security &amp; Authorization
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Staff Members &amp; Role Access
          </h1>
          <p className="text-xs text-charcoal-600">
            Enforce server-side role boundaries and administrative account access.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary text-xs px-4 py-2 min-h-[38px] gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        )}
      </div>

      {/* Role Matrix Reference Card */}
      <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-xl bg-forest-50/70 border border-forest-200/60 space-y-1">
          <span className="font-bold text-forest-950">Owner</span>
          <p className="text-[11px] text-charcoal-600">
            Unrestricted access: CRM, Deals, CMS Content, User Management, Audit Logs, and Database Reset.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-olive-50/60 border border-olive-200/60 space-y-1">
          <span className="font-bold text-forest-950">Sales Staff</span>
          <p className="text-[11px] text-charcoal-600">
            Manage Leads, Contacts, Opportunities, Follow-up Tasks, and Activities. No CMS editing.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1">
          <span className="font-bold text-forest-950">Content Editor</span>
          <p className="text-[11px] text-charcoal-600">
            Access to Public Website Content CMS, promotional banners, and consultation alerts.
          </p>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search staff by name or email..."
      />

      {/* Invite Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-sand-300 shadow-botanical-lg overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-sand-200 flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sunflower-600" />
                <h3 className="font-serif font-bold text-lg text-forest-950">
                  Provision Team Member
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maya@verdaura.com"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Authorized Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest bg-white"
                >
                  <option value="sales_staff">Sales Staff</option>
                  <option value="content_editor">Content Editor</option>
                  <option value="administrator">Administrator</option>
                  <option value="viewer">Viewer (Read-Only)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-sand-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-sand-300 font-medium text-charcoal hover:bg-sand-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs px-5 py-2 min-h-[36px]">
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
