import React, { useState, useEffect } from 'react';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { useAuth } from '../../lib/auth/authContext';
import { ActivityTimeline } from '../../components/admin/ActivityTimeline';
import { ActivityType } from '../../lib/db/schema';
import { Activity as ActivityIcon, Plus, X, Sparkles } from 'lucide-react';

export const ActivitiesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activities, setActivities] = useState(crmService.getActivities());
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'call' as ActivityType,
  });

  const loadData = () => {
    setActivities(crmService.getActivities());
  };

  useEffect(() => {
    const unsub = storage.subscribe(loadData);
    return () => unsub();
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    crmService.logManualActivity({
      title: formData.title,
      description: formData.description,
      type: formData.type,
      actorId: currentUser?.id || 'usr-1',
      actorName: currentUser?.name || 'Elena Hawthorne',
    });
    setFormData({ title: '', description: '', type: 'call' });
    setModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <ActivityIcon className="w-3.5 h-3.5 text-forest" />
            CRM Activity Log
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Communication &amp; Event Stream
          </h1>
          <p className="text-xs text-charcoal-600">
            Unified record of client calls, consultations, inquiries, and stage advancements.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary text-xs px-4 py-2 min-h-[38px] gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log Activity</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs">
        <ActivityTimeline activities={activities} showFilters={true} />
      </div>

      {/* Manual Activity Logging Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-sand-300 shadow-botanical-lg overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-sand-200 flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sunflower-600" />
                <h3 className="font-serif font-bold text-lg text-forest-950">
                  Log Customer Interaction
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">Activity Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest bg-white"
                >
                  <option value="call">Phone Call</option>
                  <option value="meeting">On-Site Consultation / Meeting</option>
                  <option value="email">Email Outreach</option>
                  <option value="note">Internal Account Note</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Discussed custom diffuser oil refills"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Interaction Notes *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of conversation, questions raised, remedies discussed..."
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
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
                  Save Activity Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
