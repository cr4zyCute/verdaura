import React from 'react';
import { Deal, DealStage } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { useAuth } from '../../lib/auth/authContext';
import { Building2, User, Calendar } from 'lucide-react';

interface KanbanBoardProps {
  deals: Deal[];
  onDealUpdated: () => void;
  onEditDeal: (deal: Deal) => void;
}

const STAGES: { id: DealStage; label: string; color: string }[] = [
  { id: 'qualification', label: 'Qualification', color: 'border-sand-400 bg-sand-50/50' },
  { id: 'discovery', label: 'Discovery', color: 'border-olive-300 bg-olive-50/40' },
  { id: 'proposal', label: 'Proposal', color: 'border-sunflower-400 bg-sunflower-50/30' },
  { id: 'negotiation', label: 'Negotiation', color: 'border-amber-400 bg-amber-50/30' },
  { id: 'won', label: 'Closed Won', color: 'border-emerald-500 bg-emerald-50/30' },
  { id: 'lost', label: 'Closed Lost', color: 'border-charcoal-400 bg-charcoal-50/40' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ deals, onDealUpdated, onEditDeal }) => {
  const { currentUser } = useAuth();

  const handleStageChange = (dealId: string, targetStage: DealStage) => {
    try {
      crmService.updateDealStage(
        dealId,
        targetStage,
        currentUser?.id || 'usr-1',
        currentUser?.name || 'Elena Hawthorne'
      );
      onDealUpdated();
    } catch (e) {
      console.error('Failed to change stage:', e);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
      {STAGES.map((col) => {
        const colDeals = deals.filter((d) => d.stage === col.id);
        const colTotal = colDeals.reduce((sum, d) => sum + d.value, 0);

        return (
          <div
            key={col.id}
            className="flex flex-col bg-white rounded-2xl border border-sand-200/90 shadow-xs overflow-hidden min-w-[240px]"
          >
            {/* Column Header */}
            <div className={`p-3.5 border-b border-sand-200 ${col.color}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-forest-950">{col.label}</h3>
                <span className="w-5 h-5 rounded-full bg-white text-forest-900 font-bold text-[10px] flex items-center justify-center border border-sand-300">
                  {colDeals.length}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-charcoal-600 mt-1">
                ${colTotal.toLocaleString()} USD
              </p>
            </div>

            {/* Column Deals List */}
            <div className="p-2.5 space-y-2.5 min-h-[350px] bg-[#FAF8F5]/60">
              {colDeals.length > 0 ? (
                colDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3 bg-white rounded-xl border border-sand-200/80 shadow-xs hover:shadow-botanical hover:border-forest-300 transition-all cursor-pointer group"
                    onClick={() => onEditDeal(deal)}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <h4 className="font-serif font-bold text-xs text-forest-950 line-clamp-2 leading-snug group-hover:text-forest transition-colors">
                        {deal.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between py-1 mb-1.5 border-y border-sand-100">
                      <span className="font-semibold text-xs text-amber-900">
                        ${deal.value.toLocaleString()} {deal.currency}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sand-100 text-charcoal-700 font-medium">
                        {deal.probability}% win
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-charcoal-600">
                      {deal.companyName && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Building2 className="w-3 h-3 text-forest-600 shrink-0" />
                          <span className="truncate">{deal.companyName}</span>
                        </div>
                      )}
                      {deal.contactName && (
                        <div className="flex items-center gap-1.5 truncate">
                          <User className="w-3 h-3 text-olive-600 shrink-0" />
                          <span className="truncate">{deal.contactName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-charcoal-400 shrink-0" />
                        <span>Close: {deal.expectedCloseDate}</span>
                      </div>
                    </div>

                    {/* Quick Move Selector (Accessible Stage Transition) */}
                    <div
                      className="mt-2.5 pt-2 border-t border-sand-100 flex items-center justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="text-[9px] uppercase tracking-wider text-charcoal-400 font-semibold">
                        Move
                      </label>
                      <select
                        value={deal.stage}
                        onChange={(e) => handleStageChange(deal.id, e.target.value as DealStage)}
                        className="text-[10px] py-0.5 px-1.5 rounded border border-sand-300 bg-[#FCFAF7] text-forest-950 font-medium focus:ring-1 focus:ring-forest cursor-pointer"
                      >
                        {STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-28 flex items-center justify-center text-center p-3 border border-dashed border-sand-300 rounded-xl">
                  <p className="text-[11px] text-charcoal-400 italic">No deals in this stage</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
