import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Contact } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { DataTable } from '../../components/admin/DataTable';
import { ContactModal } from '../../components/admin/ContactModal';
import {
  Plus,
  Users,
  Edit,
  Trash2,
  Building2,
  Mail,
  Phone,
  Tag,
  AlertTriangle,
} from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(crmService.getContacts());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [duplicates, setDuplicates] = useState<any[]>([]);

  const loadData = () => {
    setContacts(crmService.getContacts());
    setDuplicates(crmService.detectDuplicates());
  };

  useEffect(() => {
    loadData();
    const unsub = storage.subscribe(loadData);
    return () => unsub();
  }, []);

  const handleEdit = (c: Contact) => {
    setEditingContact(c);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact record?')) {
      crmService.deleteContact(id);
      loadData();
    }
  };

  const columns: ColumnDef<Contact, any>[] = [
    {
      accessorKey: 'name',
      header: 'Client / Contact',
      cell: ({ row }: { row: any }) => {
        const contact = row.original;
        return (
          <div className="space-y-0.5">
            <div className="font-serif font-bold text-sm text-forest-950 flex items-center gap-1.5">
              <span>{contact.name}</span>
              {contact.status === 'vip' && (
                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9.5px] font-bold border border-amber-300">
                  VIP
                </span>
              )}
            </div>
            {contact.jobTitle && (
              <p className="text-[11px] text-charcoal-500 font-medium">{contact.jobTitle}</p>
            )}
            {contact.companyName && (
              <div className="flex items-center gap-1 text-[11px] text-forest-700 font-medium">
                <Building2 className="w-3 h-3 text-forest-600" />
                <span>{contact.companyName}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Communication',
      cell: ({ row }: { row: any }) => {
        const contact = row.original;
        return (
          <div className="space-y-0.5 text-[11px] text-charcoal-700">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-charcoal-400" />
              <a href={`mailto:${contact.email}`} className="hover:text-forest underline">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-charcoal-400" />
              <span>{contact.phone}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: any }) => {
        const s = row.original.status as string;
        const map: Record<string, string> = {
          active: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          vip: 'bg-amber-50 text-amber-900 border-amber-300',
          prospect: 'bg-blue-50 text-blue-800 border-blue-200',
          inactive: 'bg-charcoal-50 text-charcoal-600 border-charcoal-200',
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border capitalize ${map[s] || 'bg-sand-100'}`}>
            {s}
          </span>
        );
      },
    },
    {
      accessorKey: 'tags',
      header: 'Tags & Categories',
      cell: ({ row }: { row: any }) => {
        const tags: string[] = row.original.tags || [];
        return (
          <div className="flex flex-wrap gap-1 max-w-xs">
            {tags.map((t: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sand-100 text-charcoal-800 text-[10.5px] font-medium"
              >
                <Tag className="w-2.5 h-2.5 text-forest" />
                <span>{t}</span>
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'sensitivities',
      header: 'Allergies & Sensitivities',
      cell: ({ row }: { row: any }) => {
        const sens = row.original.sensitivities;
        if (!sens) return <span className="text-charcoal-400 text-[11px] italic">None recorded</span>;
        return (
          <p className="text-[11px] text-amber-900 bg-amber-50/70 p-1.5 rounded-lg border border-amber-200/60 max-w-xs line-clamp-2">
            {sens}
          </p>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: any }) => {
        const contact = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleEdit(contact)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-forest hover:bg-sand-100 transition-colors"
              title="Edit Profile"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(contact.id)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Contact"
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
            <Users className="w-3.5 h-3.5 text-forest" />
            Directory &amp; Accounts
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Clients &amp; Commercial Contacts
          </h1>
          <p className="text-xs text-charcoal-600">
            Apothecary clients, holistic practitioners, and spa facility managers.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingContact(null);
            setModalOpen(true);
          }}
          className="btn-primary text-xs px-4 py-2 min-h-[38px] gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* CRM Autopilot Hygiene Alert Banner */}
      {duplicates.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm">
              CRM Autopilot: Duplicate Records Detected
            </h4>
            <p className="text-xs leading-relaxed text-amber-900">
              The automated hygiene sweep flagged {duplicates.length} duplicate entry across contacts (same {duplicates.map((d) => `${d.field}: ${d.value}`).join(', ')}). Review and merge to maintain accurate customer histories.
            </p>
          </div>
        </div>
      )}

      {/* TanStack Table */}
      <DataTable
        data={contacts}
        columns={columns}
        searchPlaceholder="Search clients by name, email, company, or allergy..."
        filterColumnId="status"
        filterOptions={[
          { label: 'Active Clients', value: 'active' },
          { label: 'VIP Partners', value: 'vip' },
          { label: 'Prospects', value: 'prospect' },
        ]}
      />

      <ContactModal
        isOpen={modalOpen}
        contact={editingContact}
        onClose={() => setModalOpen(false)}
        onSaved={loadData}
      />
    </div>
  );
};
