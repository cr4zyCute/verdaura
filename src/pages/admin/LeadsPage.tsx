import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Lead, LeadStatus } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { DataTable } from '../../components/admin/DataTable';
import { LeadModal } from '../../components/admin/LeadModal';
import {
  Plus,
  UserCheck,
  Edit,
  Trash2,
  Phone,
  Mail,
  Building2,
  ArrowRightCircle,
} from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(crmService.getLeads());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const loadLeads = () => {
    setLeads(crmService.getLeads());
  };

  useEffect(() => {
    const unsub = storage.subscribe(loadLeads);
    return () => unsub();
  }, []);

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setModalOpen(true);
  };

  const handleConvert = (leadId: string) => {
    if (confirm('Convert this qualified lead into an active Client Contact and initial Sales Deal?')) {
      crmService.convertLeadToContact(leadId, { createDeal: true });
      loadLeads();
    }
  };

  const handleDelete = (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead record?')) {
      crmService.deleteLead(leadId);
      loadLeads();
    }
  };

  const columns: ColumnDef<Lead, any>[] = [
    {
      accessorKey: 'name',
      header: 'Lead Name & Company',
      cell: ({ row }: { row: any }) => {
        const lead = row.original;
        return (
          <div className="space-y-0.5">
            <div className="font-serif font-bold text-sm text-forest-950 flex items-center gap-1.5">
              <span>{lead.name}</span>
              {lead.priority === 'urgent' && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            {lead.companyName && (
              <div className="flex items-center gap-1 text-[11px] text-charcoal-500">
                <Building2 className="w-3 h-3 text-forest-600" />
                <span>{lead.companyName}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Contact Details',
      cell: ({ row }: { row: any }) => {
        const lead = row.original;
        return (
          <div className="space-y-0.5 text-[11px] text-charcoal-700">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-charcoal-400" />
              <a href={`mailto:${lead.email}`} className="hover:text-forest underline">
                {lead.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-charcoal-400" />
              <span>{lead.phone}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: any }) => {
        const status = row.original.status as LeadStatus;
        const colors: Record<LeadStatus, string> = {
          new: 'bg-sunflower-100 text-sunflower-900 border-sunflower-300',
          contacted: 'bg-blue-50 text-blue-800 border-blue-200',
          qualified: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          unqualified: 'bg-charcoal-100 text-charcoal-600 border-charcoal-300',
          converted: 'bg-forest-100 text-forest-900 border-forest-300',
        };
        return (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border capitalize ${
              colors[status] || 'bg-sand-100'
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }: { row: any }) => {
        const priority = row.original.priority as string;
        const colors: Record<string, string> = {
          low: 'text-charcoal-500',
          medium: 'text-olive-700 font-medium',
          high: 'text-amber-800 font-semibold',
          urgent: 'text-red-700 font-bold',
        };
        return <span className={`capitalize text-xs ${colors[priority] || ''}`}>{priority}</span>;
      },
    },
    {
      accessorKey: 'source',
      header: 'Source & Interest',
      cell: ({ row }: { row: any }) => {
        const lead = row.original;
        return (
          <div className="space-y-0.5 text-xs">
            <span className="font-semibold text-charcoal-800">{lead.source}</span>
            {lead.interest && (
              <p className="text-[11px] text-charcoal-500 truncate max-w-xs">{lead.interest}</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'estimatedValue',
      header: 'Est. Value',
      cell: ({ row }: { row: any }) => {
        const val = row.original.estimatedValue;
        return (
          <span className="font-bold text-xs text-forest-900">
            ${val ? val.toLocaleString() : '0'} USD
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: any }) => {
        const lead = row.original;
        return (
          <div className="flex items-center gap-1.5">
            {lead.status !== 'converted' && (
              <button
                onClick={() => handleConvert(lead.id)}
                className="px-2 py-1 rounded-lg bg-forest-50 hover:bg-forest text-forest hover:text-white border border-forest-200 transition-colors text-[10.5px] font-semibold flex items-center gap-1"
                title="Convert to Contact and Deal"
              >
                <ArrowRightCircle className="w-3.5 h-3.5" />
                <span>Convert</span>
              </button>
            )}

            <button
              onClick={() => handleEdit(lead)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-forest hover:bg-sand-100 transition-colors"
              title="Edit Lead"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleDelete(lead.id)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Lead"
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
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <UserCheck className="w-3.5 h-3.5 text-forest" />
            xRM Lead Management
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Botanical Leads &amp; Prospects
          </h1>
          <p className="text-xs text-charcoal-600">
            Capture, qualify, and convert new customer inquiries and wholesale prospects.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingLead(null);
            setModalOpen(true);
          }}
          className="btn-primary text-xs px-4 py-2 min-h-[38px] gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* TanStack Table */}
      <DataTable
        data={leads}
        columns={columns}
        searchPlaceholder="Search leads by name, email, company, or source..."
        filterColumnId="status"
        filterOptions={[
          { label: 'New', value: 'new' },
          { label: 'Contacted', value: 'contacted' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'Converted', value: 'converted' },
        ]}
      />

      <LeadModal
        isOpen={modalOpen}
        lead={editingLead}
        onClose={() => setModalOpen(false)}
        onSaved={loadLeads}
      />
    </div>
  );
};
