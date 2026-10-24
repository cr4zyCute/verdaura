import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { AuditLog } from '../../lib/db/schema';
import { storage } from '../../lib/db/storageEngine';
import { DataTable } from '../../components/admin/DataTable';
import { History } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>(storage.getAuditLogs());

  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setLogs(storage.getAuditLogs());
    });
    return () => unsub();
  }, []);

  const columns: ColumnDef<AuditLog, any>[] = [
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => (
        <span className="font-mono text-xs text-charcoal-700">
          {new Date(row.original.timestamp).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'module',
      header: 'System Module',
      cell: ({ row }) => {
        const mod = row.original.module;
        return (
          <span className="px-2 py-0.5 rounded-md bg-sand-100 text-forest-950 font-mono text-[10.5px] uppercase font-semibold">
            {mod}
          </span>
        );
      },
    },
    {
      accessorKey: 'action',
      header: 'Action Event',
      cell: ({ row }) => (
        <span className="font-bold text-xs text-forest-900 font-mono">
          {row.original.action}
        </span>
      ),
    },
    {
      accessorKey: 'actorName',
      header: 'Responsible Actor',
      cell: ({ row }) => (
        <span className="text-xs font-semibold text-charcoal-800">
          {row.original.actorName}
        </span>
      ),
    },
    {
      accessorKey: 'details',
      header: 'Operation Audit Details',
      cell: ({ row }) => (
        <p className="text-xs text-charcoal-700 font-normal leading-relaxed max-w-md">
          {row.original.details}
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="botanical-badge text-[11px] py-0.5 px-2.5">
          <History className="w-3.5 h-3.5 text-forest" />
          System Traceability
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
          Security &amp; Operational Audit Trail
        </h1>
        <p className="text-xs text-charcoal-600">
          Immutable chronological history of all administrative logins, record mutations, and content edits.
        </p>
      </div>

      <DataTable
        data={logs}
        columns={columns}
        searchPlaceholder="Search audit events by action, actor, or details..."
        filterColumnId="module"
        filterOptions={[
          { label: 'Authentication', value: 'auth' },
          { label: 'CRM', value: 'crm' },
          { label: 'Website Inquiries', value: 'inquiries' },
          { label: 'CMS Content', value: 'content' },
          { label: 'User Roles', value: 'users' },
          { label: 'Settings', value: 'settings' },
        ]}
      />
    </div>
  );
};
