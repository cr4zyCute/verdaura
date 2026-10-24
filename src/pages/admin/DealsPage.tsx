import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Deal, DealStage } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { KanbanBoard } from '../../components/admin/KanbanBoard';
import { DataTable } from '../../components/admin/DataTable';
import { DealModal } from '../../components/admin/DealModal';
import {
  GitPullRequest,
  Plus,
  LayoutGrid,
  Table as TableIcon,
  Building2,
  User,
  Calendar,
  Edit,
  Trash2,
} from 'lucide-react';

export const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(crmService.getDeals());
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  const loadData = () => {
    setDeals(crmService.getDeals());
  };

  useEffect(() => {
    const unsub = storage.subscribe(loadData);
    return () => unsub();
  }, []);

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this deal opportunity?')) {
      crmService.deleteDeal(id);
      loadData();
    }
  };

  const totalValue = deals
    .filter((d) => d.stage !== 'lost')
    .reduce((sum, d) => sum + d.value, 0);

  const columns: ColumnDef<Deal, any>[] = [
    {
      accessorKey: 'title',
      header: 'Deal Title',
      cell: ({ row }: { row: any }) => (
        <div className="font-serif font-bold text-sm text-forest-950">
          {row.original.title}
        </div>
      ),
    },
    {
      accessorKey: 'companyName',
      header: 'Account / Contact',
      cell: ({ row }: { row: any }) => {
        const d = row.original;
        return (
          <div className="space-y-0.5 text-xs text-charcoal-700">
            {d.companyName && (
              <div className="flex items-center gap-1 font-semibold text-forest-900">
                <Building2 className="w-3 h-3 text-forest-600" />
                <span>{d.companyName}</span>
              </div>
            )}
            {d.contactName && (
              <div className="flex items-center gap-1 text-[11px] text-charcoal-500">
                <User className="w-3 h-3 text-olive-600" />
                <span>{d.contactName}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'value',
      header: 'Value ($)',
      cell: ({ row }: { row: any }) => (
        <span className="font-bold text-xs text-forest-900">
          ${row.original.value.toLocaleString()} {row.original.currency}
        </span>
      ),
    },
    {
      accessorKey: 'stage',
      header: 'Stage',
      cell: ({ row }: { row: any }) => {
        const stage = row.original.stage as DealStage;
        const colors: Record<DealStage, string> = {
          qualification: 'bg-sand-100 text-charcoal-800 border-sand-300',
          discovery: 'bg-olive-50 text-olive-800 border-olive-200',
          proposal: 'bg-sunflower-50 text-sunflower-900 border-sunflower-300',
          negotiation: 'bg-amber-50 text-amber-900 border-amber-300',
          won: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          lost: 'bg-charcoal-50 text-charcoal-600 border-charcoal-300',
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border capitalize ${colors[stage] || 'bg-sand-100'}`}>
            {stage}
          </span>
        );
      },
    },
    {
      accessorKey: 'probability',
      header: 'Win Prob.',
      cell: ({ row }: { row: any }) => <span>{row.original.probability}%</span>,
    },
    {
      accessorKey: 'expectedCloseDate',
      header: 'Expected Close',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-1 text-xs text-charcoal-600">
          <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
          <span>{row.original.expectedCloseDate}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: any }) => {
        const deal = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleEdit(deal)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-forest hover:bg-sand-100 transition-colors"
              title="Edit Deal"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(deal.id)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Deal"
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
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <GitPullRequest className="w-3.5 h-3.5 text-forest" />
            Commercial Opportunities
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Sales &amp; Supply Pipeline
          </h1>
          <p className="text-xs text-charcoal-600">
            Total active opportunities: <span className="font-semibold text-forest-900">${totalValue.toLocaleString()} USD</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-white border border-sand-300 rounded-xl shadow-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-forest text-cream-50 font-semibold shadow-xs'
                  : 'text-charcoal-600 hover:text-forest'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-forest text-cream-50 font-semibold shadow-xs'
                  : 'text-charcoal-600 hover:text-forest'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => {
              setEditingDeal(null);
              setModalOpen(true);
            }}
            className="btn-primary text-xs px-4 py-2 min-h-[38px] gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Opportunity</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'kanban' ? (
        <KanbanBoard deals={deals} onDealUpdated={loadData} onEditDeal={handleEdit} />
      ) : (
        <DataTable
          data={deals}
          columns={columns}
          searchPlaceholder="Search opportunities by title, account, or stage..."
          filterColumnId="stage"
          filterOptions={[
            { label: 'Qualification', value: 'qualification' },
            { label: 'Discovery', value: 'discovery' },
            { label: 'Proposal', value: 'proposal' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Closed Won', value: 'won' },
            { label: 'Closed Lost', value: 'lost' },
          ]}
        />
      )}

      <DealModal
        isOpen={modalOpen}
        deal={editingDeal}
        onClose={() => setModalOpen(false)}
        onSaved={loadData}
      />
    </div>
  );
};
