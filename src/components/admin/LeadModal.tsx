import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, PriorityLevel } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { useAuth } from '../../lib/auth/authContext';
import { X, Sparkles } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  lead?: Lead | null;
  onClose: () => void;
  onSaved: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, lead, onClose, onSaved }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    source: 'Website Inquiry',
    status: 'new' as LeadStatus,
    priority: 'medium' as PriorityLevel,
    estimatedValue: 500,
    interest: '',
    sensitivities: '',
    notes: '',
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        companyName: lead.companyName || '',
        source: lead.source,
        status: lead.status,
        priority: lead.priority,
        estimatedValue: lead.estimatedValue,
        interest: lead.interest || '',
        sensitivities: lead.sensitivities || '',
        notes: lead.notes || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        source: 'Website Inquiry',
        status: 'new',
        priority: 'medium',
        estimatedValue: 500,
        interest: '',
        sensitivities: '',
        notes: '',
      });
    }
  }, [lead, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lead) {
      crmService.updateLead(
        {
          ...lead,
          ...formData,
          estimatedValue: Number(formData.estimatedValue) || 0,
          updatedAt: new Date().toISOString(),
        },
        currentUser?.name || 'Elena Hawthorne'
      );
    } else {
      crmService.createLead(
        {
          ...formData,
          estimatedValue: Number(formData.estimatedValue) || 0,
          assignedToUserId: currentUser?.id,
          assignedToName: currentUser?.name,
        },
        currentUser?.name || 'Elena Hawthorne'
      );
    }
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-sand-300 shadow-botanical-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-sand-200 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sunflower-600" />
            <h3 className="font-serif font-bold text-lg text-forest-950">
              {lead ? 'Edit Botanical Lead' : 'Create New Lead'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal hover:bg-sand-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Elena Hawthorne"
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@example.com"
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(303) 555-0123"
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Company / Spa (Optional)</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Rocky Mountain Sanctuary"
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                className="w-full px-2.5 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="unqualified">Unqualified</option>
                <option value="converted">Converted</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
                className="w-full px-2.5 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Est. Value ($)</label>
              <input
                type="number"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({ ...formData, estimatedValue: Number(e.target.value) })}
                className="w-full px-2.5 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Botanical Interest / Service</label>
            <input
              type="text"
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              placeholder="e.g. Custom Formulated Blend, Aromatherapy Class, Bath Soaks"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Allergies / Sensitivities</label>
            <input
              type="text"
              value={formData.sensitivities}
              onChange={(e) => setFormData({ ...formData, sensitivities: e.target.value })}
              placeholder="e.g. Sensitive to aloe vera, almond-free base only"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Internal Notes</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Consultation notes, preferred scents, or meeting context..."
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-sand-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-sand-300 font-medium text-charcoal hover:bg-sand-50 transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs px-5 py-2 min-h-[36px]">
              {lead ? 'Save Changes' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
