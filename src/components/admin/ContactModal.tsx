import React, { useState, useEffect } from 'react';
import { Contact } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { useAuth } from '../../lib/auth/authContext';
import { X, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  contact?: Contact | null;
  onClose: () => void;
  onSaved: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  contact,
  onClose,
  onSaved,
}) => {
  const { currentUser } = useAuth();
  const companies = storage.getCompanies();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyId: '',
    jobTitle: '',
    status: 'active' as 'active' | 'prospect' | 'vip' | 'inactive',
    tagsString: '',
    sensitivities: '',
    preferredContactMethod: 'email' as 'email' | 'phone' | 'text',
    notes: '',
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        companyId: contact.companyId || '',
        jobTitle: contact.jobTitle || '',
        status: contact.status,
        tagsString: contact.tags.join(', '),
        sensitivities: contact.sensitivities || '',
        preferredContactMethod: contact.preferredContactMethod,
        notes: contact.notes || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyId: '',
        jobTitle: '',
        status: 'active',
        tagsString: 'Private Client',
        sensitivities: '',
        preferredContactMethod: 'email',
        notes: '',
      });
    }
  }, [contact, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const company = companies.find((c) => c.id === formData.companyId);

    const tags = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (contact) {
      crmService.saveContact(
        {
          ...contact,
          ...formData,
          companyName: company?.name,
          tags,
          updatedAt: new Date().toISOString(),
        },
        currentUser?.name || 'Elena Hawthorne'
      );
    } else {
      const newContact: Contact = {
        id: `cnt-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyId: formData.companyId || undefined,
        companyName: company?.name,
        jobTitle: formData.jobTitle || undefined,
        status: formData.status,
        assignedToUserId: currentUser?.id,
        assignedToName: currentUser?.name,
        tags,
        sensitivities: formData.sensitivities || undefined,
        preferredContactMethod: formData.preferredContactMethod,
        lastContactedAt: new Date().toISOString(),
        notes: formData.notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      crmService.saveContact(newContact, currentUser?.name || 'Elena Hawthorne');
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
              {contact ? 'Edit Contact Profile' : 'Add New Contact'}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Company / Account</label>
              <select
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="">No Company (Individual Client)</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Job Title</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="e.g. Spa Director, Client"
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Relationship Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="active">Active Client</option>
                <option value="vip">VIP Partner</option>
                <option value="prospect">Prospect</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={formData.tagsString}
              onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
              placeholder="e.g. Spa Partner, Custom Blends, Wholesale"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Botanical Sensitivities &amp; Allergies</label>
            <input
              type="text"
              value={formData.sensitivities}
              onChange={(e) => setFormData({ ...formData, sensitivities: e.target.value })}
              placeholder="e.g. Severe aloe sensitivity, citrus-free only"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Internal Relationship Notes</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
              {contact ? 'Save Contact' : 'Create Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
