import { storage } from '../db/storageEngine';
import { 
  Lead, 
  Contact, 
  Company, 
  Deal, 
  DealStage, 
  Task, 
  Activity 
} from '../db/schema';

export const crmService = {
  // --- Leads ---
  getLeads: (): Lead[] => {
    return storage.getLeads();
  },

  createLead: (
    data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>,
    actorName = 'System'
  ): Lead => {
    const newLead: Lead = {
      ...data,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveLead(newLead);

    storage.logActivity({
      type: 'inquiry',
      title: `New Lead Created: ${newLead.name}`,
      description: `Lead from ${newLead.source} (${newLead.interest || 'Botanical interest'}). Estimated value: $${newLead.estimatedValue}.`,
      actorId: 'system',
      actorName,
      leadId: newLead.id,
    });

    storage.logAudit({
      action: 'LEAD_CREATED',
      module: 'crm',
      details: `Created lead "${newLead.name}" (${newLead.email}).`,
      actorId: 'system',
      actorName,
    });

    return newLead;
  },

  updateLead: (
    lead: Lead,
    actorName = 'System'
  ): void => {
    storage.saveLead(lead);
    storage.logAudit({
      action: 'LEAD_UPDATED',
      module: 'crm',
      details: `Updated lead details for "${lead.name}".`,
      actorId: 'system',
      actorName,
    });
  },

  convertLeadToContact: (
    leadId: string,
    options?: { createDeal?: boolean; dealValue?: number },
    actorId = 'usr-1',
    actorName = 'Elena Hawthorne'
  ): { contact: Contact; deal?: Deal } => {
    const leads = storage.getLeads();
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    // Create Contact
    const contactId = `cnt-${Date.now()}`;
    const newContact: Contact = {
      id: contactId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      companyName: lead.companyName,
      status: 'active',
      assignedToUserId: lead.assignedToUserId,
      assignedToName: lead.assignedToName,
      tags: ['Converted Lead', lead.source],
      sensitivities: lead.sensitivities,
      preferredContactMethod: 'email',
      lastContactedAt: new Date().toISOString(),
      notes: `Converted from lead on ${new Date().toLocaleDateString()}. Original notes: ${lead.notes || 'None'}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveContact(newContact);

    let createdDeal: Deal | undefined;
    if (options?.createDeal) {
      createdDeal = {
        id: `deal-${Date.now()}`,
        title: `${lead.name} — Initial Order`,
        contactId: newContact.id,
        contactName: newContact.name,
        companyName: lead.companyName,
        value: options.dealValue || lead.estimatedValue || 500,
        currency: 'USD',
        stage: 'qualification',
        ownerId: lead.assignedToUserId || actorId,
        ownerName: lead.assignedToName || actorName,
        expectedCloseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
        probability: 30,
        description: `Opportunity created upon lead conversion.`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      storage.saveDeal(createdDeal);
    }

    // Mark lead as converted
    lead.status = 'converted';
    lead.updatedAt = new Date().toISOString();
    storage.saveLead(lead);

    storage.logActivity({
      type: 'note',
      title: `Lead Converted: ${lead.name}`,
      description: `Lead converted to Contact ${newContact.name}${createdDeal ? ` and Deal "${createdDeal.title}"` : ''}.`,
      actorId,
      actorName,
      leadId: lead.id,
      contactId: newContact.id,
      dealId: createdDeal?.id,
    });

    storage.logAudit({
      action: 'LEAD_CONVERTED',
      module: 'crm',
      details: `Lead "${lead.name}" converted to Contact "${newContact.name}".`,
      actorId,
      actorName,
    });

    return { contact: newContact, deal: createdDeal };
  },

  deleteLead: (id: string, actorName = 'System'): void => {
    storage.deleteLead(id);
    storage.logAudit({
      action: 'LEAD_DELETED',
      module: 'crm',
      details: `Deleted lead record ${id}.`,
      actorId: 'system',
      actorName,
    });
  },

  // --- Contacts ---
  getContacts: (): Contact[] => {
    return storage.getContacts();
  },

  saveContact: (contact: Contact, actorName = 'System'): void => {
    storage.saveContact(contact);
    storage.logAudit({
      action: 'CONTACT_SAVED',
      module: 'crm',
      details: `Saved contact record for "${contact.name}".`,
      actorId: 'system',
      actorName,
    });
  },

  deleteContact: (id: string, actorName = 'System'): void => {
    storage.deleteContact(id);
    storage.logAudit({
      action: 'CONTACT_DELETED',
      module: 'crm',
      details: `Deleted contact record ${id}.`,
      actorId: 'system',
      actorName,
    });
  },

  // Duplicate contact detection for CRM hygiene (from crm-autopilot)
  detectDuplicates: (): { field: string; value: string; contactIds: string[]; contactNames: string[] }[] => {
    const contacts = storage.getContacts();
    const emailMap: Record<string, Contact[]> = {};
    const phoneMap: Record<string, Contact[]> = {};

    contacts.forEach((c) => {
      if (c.email) {
        const cleanEmail = c.email.trim().toLowerCase();
        emailMap[cleanEmail] = emailMap[cleanEmail] || [];
        emailMap[cleanEmail].push(c);
      }
      if (c.phone) {
        const cleanPhone = c.phone.replace(/\D/g, '');
        if (cleanPhone.length >= 7) {
          phoneMap[cleanPhone] = phoneMap[cleanPhone] || [];
          phoneMap[cleanPhone].push(c);
        }
      }
    });

    const duplicates: { field: string; value: string; contactIds: string[]; contactNames: string[] }[] = [];

    Object.entries(emailMap).forEach(([email, matches]) => {
      if (matches.length > 1) {
        duplicates.push({
          field: 'Email',
          value: email,
          contactIds: matches.map((m) => m.id),
          contactNames: matches.map((m) => m.name),
        });
      }
    });

    Object.entries(phoneMap).forEach(([phone, matches]) => {
      if (matches.length > 1) {
        duplicates.push({
          field: 'Phone',
          value: phone,
          contactIds: matches.map((m) => m.id),
          contactNames: matches.map((m) => m.name),
        });
      }
    });

    return duplicates;
  },

  // --- Companies ---
  getCompanies: (): Company[] => {
    return storage.getCompanies();
  },

  saveCompany: (company: Company, actorName = 'System'): void => {
    storage.saveCompany(company);
    storage.logAudit({
      action: 'COMPANY_SAVED',
      module: 'crm',
      details: `Saved company "${company.name}".`,
      actorId: 'system',
      actorName,
    });
  },

  deleteCompany: (id: string, actorName = 'System'): void => {
    storage.deleteCompany(id);
    storage.logAudit({
      action: 'COMPANY_DELETED',
      module: 'crm',
      details: `Deleted company record ${id}.`,
      actorId: 'system',
      actorName,
    });
  },

  // --- Deals / Pipeline ---
  getDeals: (): Deal[] => {
    return storage.getDeals();
  },

  saveDeal: (deal: Deal, actorName = 'System'): void => {
    storage.saveDeal(deal);
    storage.logAudit({
      action: 'DEAL_SAVED',
      module: 'crm',
      details: `Saved deal "${deal.title}" ($${deal.value}).`,
      actorId: 'system',
      actorName,
    });
  },

  updateDealStage: (
    dealId: string, 
    newStage: DealStage, 
    actorId = 'usr-1', 
    actorName = 'Elena Hawthorne'
  ): Deal => {
    const deals = storage.getDeals();
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) throw new Error('Deal not found');

    const oldStage = deal.stage;
    deal.stage = newStage;

    // Adjust probability based on stage
    const probabilities: Record<DealStage, number> = {
      qualification: 20,
      discovery: 40,
      proposal: 60,
      negotiation: 80,
      won: 100,
      lost: 0,
    };
    deal.probability = probabilities[newStage];
    deal.updatedAt = new Date().toISOString();

    storage.saveDeal(deal);

    storage.logActivity({
      type: 'deal_stage_change',
      title: `Deal Moved: ${deal.title}`,
      description: `Moved from ${oldStage.toUpperCase()} to ${newStage.toUpperCase()} ($${deal.value} USD).`,
      actorId,
      actorName,
      dealId: deal.id,
      companyId: deal.companyId,
      contactId: deal.contactId,
    });

    storage.logAudit({
      action: 'DEAL_STAGE_UPDATE',
      module: 'crm',
      details: `Deal "${deal.title}" changed from ${oldStage} to ${newStage}.`,
      actorId,
      actorName,
    });

    return deal;
  },

  deleteDeal: (id: string, actorName = 'System'): void => {
    storage.deleteDeal(id);
    storage.logAudit({
      action: 'DEAL_DELETED',
      module: 'crm',
      details: `Deleted deal record ${id}.`,
      actorId: 'system',
      actorName,
    });
  },

  // --- Tasks ---
  getTasks: (): Task[] => {
    return storage.getTasks();
  },

  saveTask: (task: Task, actorName = 'System'): void => {
    storage.saveTask(task);
    storage.logAudit({
      action: 'TASK_SAVED',
      module: 'crm',
      details: `Saved task "${task.title}".`,
      actorId: 'system',
      actorName,
    });
  },

  toggleTaskComplete: (
    taskId: string, 
    actorId = 'usr-1', 
    actorName = 'Elena Hawthorne'
  ): Task => {
    const tasks = storage.getTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) throw new Error('Task not found');

    const isNowCompleted = task.status !== 'completed';
    task.status = isNowCompleted ? 'completed' : 'pending';
    task.completedAt = isNowCompleted ? new Date().toISOString() : undefined;
    task.updatedAt = new Date().toISOString();

    storage.saveTask(task);

    if (isNowCompleted) {
      storage.logActivity({
        type: 'task_completed',
        title: `Task Completed: ${task.title}`,
        description: `Completed task: ${task.title}`,
        actorId,
        actorName,
        contactId: task.contactId,
        leadId: task.leadId,
        dealId: task.dealId,
      });
    }

    return task;
  },

  deleteTask: (id: string, actorName = 'System'): void => {
    storage.deleteTask(id);
    storage.logAudit({
      action: 'TASK_DELETED',
      module: 'crm',
      details: `Deleted task record ${id}.`,
      actorId: 'system',
      actorName,
    });
  },

  // --- Activities ---
  getActivities: (): Activity[] => {
    return storage.getActivities();
  },

  logManualActivity: (
    activity: Omit<Activity, 'id' | 'createdAt'>
  ): Activity => {
    return storage.logActivity(activity);
  },
};
