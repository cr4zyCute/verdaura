import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, PriorityLevel } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { useAuth } from '../../lib/auth/authContext';
import { X, Sparkles } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  task?: Task | null;
  onClose: () => void;
  onSaved: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, task, onClose, onSaved }) => {
  const { currentUser } = useAuth();
  const contacts = storage.getContacts();
  const leads = storage.getLeads();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending' as TaskStatus,
    priority: 'medium' as PriorityLevel,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split('T')[0],
    contactId: '',
    leadId: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        contactId: task.contactId || '',
        leadId: task.leadId || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split('T')[0],
        contactId: '',
        leadId: '',
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact = contacts.find((c) => c.id === formData.contactId);

    if (task) {
      crmService.saveTask(
        {
          ...task,
          ...formData,
          contactName: contact?.name,
          updatedAt: new Date().toISOString(),
        },
        currentUser?.name || 'Elena Hawthorne'
      );
    } else {
      const newTask: Task = {
        id: `tsk-${Date.now()}`,
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
        assignedToUserId: currentUser?.id,
        assignedToName: currentUser?.name,
        contactId: formData.contactId || undefined,
        contactName: contact?.name,
        leadId: formData.leadId || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      crmService.saveTask(newTask, currentUser?.name || 'Elena Hawthorne');
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
              {task ? 'Edit Follow-up Task' : 'Schedule Follow-up Task'}
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
            <label className="block font-semibold text-forest-950 mb-1">Task Action / Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Call Beatrice Vance to confirm class kit shipment"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Due Date *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
              />
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
              <label className="block font-semibold text-forest-950 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                className="w-full px-2.5 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Link to Contact</label>
              <select
                value={formData.contactId}
                onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="">None</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Link to Lead</label>
              <select
                value={formData.leadId}
                onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none bg-white"
              >
                <option value="">None</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Additional Details</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Context, specific oils requested, allergy notes..."
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
              {task ? 'Save Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
