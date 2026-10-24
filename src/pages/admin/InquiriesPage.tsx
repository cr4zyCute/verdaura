import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { WebsiteInquiry, InquiryStatus } from '../../lib/db/schema';
import { inquiryService } from '../../lib/services/inquiryService';
import { storage } from '../../lib/db/storageEngine';
import { DataTable } from '../../components/admin/DataTable';
import {
  MessageSquare,
  ArrowRightCircle,
  Mail,
  Phone,
  CheckCircle,
} from 'lucide-react';

export const InquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<WebsiteInquiry[]>(inquiryService.getInquiries());

  const loadData = () => {
    setInquiries(inquiryService.getInquiries());
  };

  useEffect(() => {
    const unsub = storage.subscribe(loadData);
    return () => unsub();
  }, []);

  const handleStatusChange = (id: string, status: InquiryStatus) => {
    inquiryService.updateInquiryStatus(id, status);
    loadData();
  };

  const handleConvertToLead = (id: string) => {
    try {
      const created = inquiryService.convertInquiryToLead(id);
      alert(`Inquiry successfully converted to CRM Lead: ${created.name}`);
      loadData();
    } catch (e: any) {
      alert(`Could not convert inquiry: ${e.message}`);
    }
  };

  const columns: ColumnDef<WebsiteInquiry, any>[] = [
    {
      accessorKey: 'name',
      header: 'Visitor / Inquirer',
      cell: ({ row }: { row: any }) => {
        const inq = row.original;
        return (
          <div className="space-y-0.5">
            <h4 className="font-serif font-bold text-sm text-forest-950">{inq.name}</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-charcoal-600">
              <Mail className="w-3 h-3 text-charcoal-400" />
              <a href={`mailto:${inq.email}`} className="text-forest hover:underline">
                {inq.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-charcoal-600">
              <Phone className="w-3 h-3 text-charcoal-400" />
              <span>{inq.phone}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'interest',
      header: 'Botanical Interest',
      cell: ({ row }: { row: any }) => {
        const inq = row.original;
        return (
          <div className="space-y-1 max-w-sm">
            <span className="font-semibold text-xs text-charcoal-900 block capitalize">
              {inq.interest.replace('-', ' ')}
            </span>
            {inq.sensitivities && (
              <p className="text-[11px] text-amber-900 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60 inline-block">
                Allergies: {inq.sensitivities}
              </p>
            )}
            {inq.message && (
              <p className="text-xs text-charcoal-700 italic bg-sand-50 p-2 rounded-xl border border-sand-200">
                "{inq.message}"
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Received',
      cell: ({ row }: { row: any }) => (
        <span className="text-xs text-charcoal-600">
          {new Date(row.original.createdAt).toLocaleDateString()} •{' '}
          {new Date(row.original.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Workflow Status',
      cell: ({ row }: { row: any }) => {
        const inq = row.original;
        return (
          <select
            value={inq.status}
            onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
            className="text-xs py-1 px-2 rounded-lg border border-sand-300 bg-white text-forest-950 font-medium focus:ring-1 focus:ring-forest cursor-pointer"
          >
            <option value="new">New Inquiry</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        );
      },
    },
    {
      id: 'actions',
      header: 'CRM Action',
      cell: ({ row }: { row: any }) => {
        const inq = row.original;
        return (
          <div>
            {!inq.convertedLeadId ? (
              <button
                onClick={() => handleConvertToLead(inq.id)}
                className="btn-primary text-[10.5px] px-3 py-1.5 min-h-[30px] gap-1"
                title="Convert to qualified lead in CRM"
              >
                <ArrowRightCircle className="w-3.5 h-3.5" />
                <span>Create Lead</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>Lead Created</span>
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="botanical-badge text-[11px] py-0.5 px-2.5">
          <MessageSquare className="w-3.5 h-3.5 text-forest" />
          Website Integration
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
          Website Inquiries &amp; Consultations
        </h1>
        <p className="text-xs text-charcoal-600">
          Submissions received directly from the public apothecary contact and booking form.
        </p>
      </div>

      <DataTable
        data={inquiries}
        columns={columns}
        searchPlaceholder="Search inquiries by visitor name, email, or interest..."
        filterColumnId="status"
        filterOptions={[
          { label: 'New', value: 'new' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'Resolved', value: 'resolved' },
          { label: 'Closed', value: 'closed' },
        ]}
      />
    </div>
  );
};
