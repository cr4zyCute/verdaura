import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Company } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { DataTable } from '../../components/admin/DataTable';
import {
  Building2,
  Plus,
  Globe,
  Phone,
  MapPin,
  Edit,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(crmService.getCompanies());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    phone: '',
    address: '',
    tier: 'spa_partner' as any,
    notes: '',
  });

  const loadData = () => {
    setCompanies(crmService.getCompanies());
  };

  useEffect(() => {
    const unsub = storage.subscribe(loadData);
    return () => unsub();
  }, []);

  const openCreate = () => {
    setEditingCompany(null);
    setFormData({
      name: '',
      industry: 'Luxury Wellness & Hospitality',
      website: '',
      phone: '',
      address: '',
      tier: 'spa_partner',
      notes: '',
    });
    setModalOpen(true);
  };

  const openEdit = (comp: Company) => {
    setEditingCompany(comp);
    setFormData({
      name: comp.name,
      industry: comp.industry,
      website: comp.website || '',
      phone: comp.phone || '',
      address: comp.address || '',
      tier: comp.tier,
      notes: comp.notes || '',
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompany) {
      crmService.saveCompany({
        ...editingCompany,
        ...formData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      const newComp: Company = {
        id: `comp-${Date.now()}`,
        ...formData,
        contactCount: 0,
        openDealsValue: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      crmService.saveCompany(newComp);
    }
    loadData();
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this company account record?')) {
      crmService.deleteCompany(id);
      loadData();
    }
  };

  const columns: ColumnDef<Company, any>[] = [
    {
      accessorKey: 'name',
      header: 'Company / Organization',
      cell: ({ row }: { row: any }) => {
        const c = row.original;
        return (
          <div className="space-y-0.5">
            <h4 className="font-serif font-bold text-sm text-forest-950 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-forest" />
              <span>{c.name}</span>
            </h4>
            <p className="text-[11px] text-charcoal-500">{c.industry}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'tier',
      header: 'Account Tier',
      cell: ({ row }: { row: any }) => {
        const tier = row.original.tier as string;
        const map: Record<string, string> = {
          spa_partner: 'bg-forest-50 text-forest-900 border-forest-300',
          wholesale: 'bg-amber-50 text-amber-900 border-amber-300',
          boutique: 'bg-sunflower-50 text-sunflower-900 border-sunflower-300',
          corporate: 'bg-blue-50 text-blue-900 border-blue-200',
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border capitalize ${map[tier] || 'bg-sand-100'}`}>
            {tier.replace('_', ' ')}
          </span>
        );
      },
    },
    {
      accessorKey: 'website',
      header: 'Website & Contact',
      cell: ({ row }: { row: any }) => {
        const c = row.original;
        return (
          <div className="space-y-0.5 text-xs text-charcoal-700">
            {c.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-charcoal-400" />
                <a href={c.website} target="_blank" rel="noreferrer" className="text-forest hover:underline">
                  {c.website.replace('https://', '')}
                </a>
              </div>
            )}
            {c.phone && (
              <div className="flex items-center gap-1 text-[11px] text-charcoal-500">
                <Phone className="w-3 h-3 text-charcoal-400" />
                <span>{c.phone}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'address',
      header: 'Location',
      cell: ({ row }: { row: any }) => {
        const addr = row.original.address;
        if (!addr) return <span className="text-charcoal-400 text-xs italic">Not listed</span>;
        return (
          <div className="flex items-center gap-1 text-xs text-charcoal-700">
            <MapPin className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
            <span>{addr}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'openDealsValue',
      header: 'Open Pipeline',
      cell: ({ row }: { row: any }) => {
        const val = row.original.openDealsValue || 0;
        return (
          <span className="font-bold text-xs text-forest-900">
            ${val.toLocaleString()} USD
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: any }) => {
        const comp = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openEdit(comp)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-forest hover:bg-sand-100 transition-colors"
              title="Edit Account"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(comp.id)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Account"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <Building2 className="w-3.5 h-3.5 text-forest" />
            Commercial &amp; B2B Accounts
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Companies &amp; Spa Partners
          </h1>
          <p className="text-xs text-charcoal-600">
            Luxury wellness resorts, integrative clinics, and wholesale retail boutiques.
          </p>
        </div>

        <button onClick={openCreate} className="btn-primary text-xs px-4 py-2 min-h-[38px] gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      <DataTable
        data={companies}
        columns={columns}
        searchPlaceholder="Search accounts by name, industry, or location..."
        filterColumnId="tier"
        filterOptions={[
          { label: 'Spa Partners', value: 'spa_partner' },
          { label: 'Wholesale Accounts', value: 'wholesale' },
          { label: 'Boutique Retailers', value: 'boutique' },
        ]}
      />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-sand-300 shadow-botanical-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 border-b border-sand-200 flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sunflower-600" />
                <h3 className="font-serif font-bold text-lg text-forest-950">
                  {editingCompany ? 'Edit B2B Account' : 'Register New Account'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal hover:bg-sand-200/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">Company / Facility Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rocky Mountain Sanctuary Spa"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-forest-950 mb-1">Industry / Sector</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Luxury Wellness"
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-forest-950 mb-1">Account Tier</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
                  >
                    <option value="spa_partner">Spa Partner</option>
                    <option value="wholesale">Wholesale Clinic</option>
                    <option value="boutique">Boutique Retail</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-forest-950 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-forest-950 mb-1">Business Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(303) 555-0100"
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Physical Address / Region</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Vail Valley, CO 81657"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Account Notes &amp; Terms</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Contract terms, wholesale volume discount tiers..."
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
                />
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
                  {editingCompany ? 'Save Account' : 'Register Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
