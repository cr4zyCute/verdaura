import React, { useState, useEffect } from 'react';
import { Deal, DealStage } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { useAuth } from '../../lib/auth/authContext';
import { X, Sparkles } from 'lucide-react';

interface DealModalProps {
  isOpen: boolean;
  deal?: Deal | null;
  onClose: () => void;
  onSaved: () => void;
}

export const DealModal: React.FC<DealModalProps> = ({ isOpen, deal, onClose, onSaved }) => {
  const { currentUser } = useAuth();
  const companies = storage.getCompanies();
  const contacts = storage.getContacts();

  const [formData, setFormData] = useState({
    title: '',
    companyId: '',
    contactId: '',
    value: 1000,
    currency: 'USD',
    stage: 'qualification' as DealStage,
    expectedCloseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
    probability: 30,
    description: '',
  });

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title,
        companyId: deal.companyId || '',
        contactId: deal.contactId || '',
        value: deal.value,
        currency: deal.currency,
        stage: deal.stage,
        expectedCloseDate: deal.expectedCloseDate,
        probability: deal.probability,
        description: deal.description || '',
      });
    } else {
      setFormData({
        title: '',
        companyId: '',
        contactId: '',
        value: 1000,
        currency: 'USD',
        stage: 'qualification',
        expectedCloseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
        probability: 30,
        description: '',
      });
    }
  }, [deal, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const company = companies.find((c) => c.id === formData.companyId);
    const contact = contacts.find((c) => c.id === formData.contactId);

    if (deal) {
      crmService.saveDeal(
        {
          ...deal,
          ...formData,
          companyName: company?.name,
          contactName: contact?.name,
          value: Number(formData.value) || 0,
          probability: Number(formData.probability) || 0,
          updatedAt: new Date().toISOString(),
        },
        currentUser?.name || 'Elena Hawthorne'
      );
    } else {
      const newDeal: Deal = {
        id: `deal-${Date.now()}`,
        title: formData.title,
        companyId: formData.companyId || undefined,
        companyName: company?.name,
        contactId: formData.contactId || undefined,
        contactName: contact?.name,
        value: Number(formData.value) || 0,
        currency: formData.currency,
        stage: formData.stage,
        ownerId: currentUser?.id,
        ownerName: currentUser?.name,
        expectedCloseDate: formData.expectedCloseDate,
        probability: Number(formData.probability) || 0,
        description: formData.description || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      crmService.saveDeal(newDeal, currentUser?.name || 'Elena Hawthorne');
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-sand-300 shadow-botanical-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 sm:p-5 border-b border-sand-200 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sunflower-600" />
            <h3 className="font-serif font-bold text-lg text-forest-950">
              {deal ? 'Edit Deal Opportunity' : 'New Sales Opportunity'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal hover:bg-sand-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-forest-950 mb-1">Deal Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Seasonal In-Room Diffuser Package"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Related Company</label>
              <select
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="">None / Private Account</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Primary Contact</label>
              <select
                value={formData.contactId}
                onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="">None Specified</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.companyName ? `(${c.companyName})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Deal Value ($) *</label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Stage</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value as DealStage })}
                className="w-full px-2.5 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="qualification">Qualification</option>
                <option value="discovery">Discovery</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Closed Won</option>
                <option value="lost">Closed Lost</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Expected Close Date</label>
            <input
              type="date"
              value={formData.expectedCloseDate}
              onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Description &amp; Order Scope</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Package breakdown, delivery schedule, custom oils requested..."
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-sand-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-sand-300 font-medium text-charcoal hover:bg-sand-50"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs px-5 py-2 min-h-[36px]">
              {deal ? 'Save Opportunity' : 'Create Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
