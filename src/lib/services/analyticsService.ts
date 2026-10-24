import { storage } from '../db/storageEngine';
import { DealStage, LeadStatus } from '../db/schema';

export interface DashboardMetrics {
  totalLeads: number;
  newLeadsCount: number;
  totalContacts: number;
  totalCompanies: number;
  activeDealsCount: number;
  totalPipelineValue: number;
  weightedPipelineValue: number;
  wonDealsValue: number;
  wonDealsCount: number;
  pendingInquiriesCount: number;
  tasksDueTodayCount: number;
  taskCompletionRate: number;
  leadConversionRate: number;
}

export interface PipelineStageStat {
  stage: DealStage;
  label: string;
  count: number;
  value: number;
  color: string;
}

export interface SourceStat {
  source: string;
  count: number;
  percentage: number;
}

export const analyticsService = {
  getSummaryMetrics: (): DashboardMetrics => {
    const leads = storage.getLeads();
    const contacts = storage.getContacts();
    const companies = storage.getCompanies();
    const deals = storage.getDeals();
    const tasks = storage.getTasks();
    const inquiries = storage.getInquiries();

    const newLeads = leads.filter((l) => l.status === 'new').length;
    const convertedLeads = leads.filter((l) => l.status === 'converted').length;
    const leadConversionRate = leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0;

    const openDeals = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
    const totalPipelineValue = openDeals.reduce((sum, d) => sum + d.value, 0);
    const weightedPipelineValue = openDeals.reduce((sum, d) => sum + (d.value * (d.probability / 100)), 0);

    const wonDeals = deals.filter((d) => d.stage === 'won');
    const wonDealsValue = wonDeals.reduce((sum, d) => sum + d.value, 0);

    const pendingInquiries = inquiries.filter((i) => i.status === 'new' || i.status === 'in_progress').length;

    const todayStr = new Date().toISOString().split('T')[0];
    const tasksDueToday = tasks.filter((t) => t.dueDate === todayStr && t.status !== 'completed').length;
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    return {
      totalLeads: leads.length,
      newLeadsCount: newLeads,
      totalContacts: contacts.length,
      totalCompanies: companies.length,
      activeDealsCount: openDeals.length,
      totalPipelineValue,
      weightedPipelineValue: Math.round(weightedPipelineValue),
      wonDealsValue,
      wonDealsCount: wonDeals.length,
      pendingInquiriesCount: pendingInquiries,
      tasksDueTodayCount: tasksDueToday,
      taskCompletionRate,
      leadConversionRate,
    };
  },

  getPipelineStageStats: (): PipelineStageStat[] => {
    const deals = storage.getDeals();
    const stages: { stage: DealStage; label: string; color: string }[] = [
      { stage: 'qualification', label: 'Qualification', color: '#9FB18D' }, // olive-400
      { stage: 'discovery', label: 'Discovery', color: '#80946D' },      // olive-500
      { stage: 'proposal', label: 'Proposal', color: '#D7A22F' },       // sunflower
      { stage: 'negotiation', label: 'Negotiation', color: '#DA7D47' },  // amber-500
      { stage: 'won', label: 'Closed Won', color: '#3E5642' },          // forest-600
      { stage: 'lost', label: 'Closed Lost', color: '#756F65' },         // charcoal-500
    ];

    return stages.map(({ stage, label, color }) => {
      const stageDeals = deals.filter((d) => d.stage === stage);
      const count = stageDeals.length;
      const value = stageDeals.reduce((acc, d) => acc + d.value, 0);
      return { stage, label, count, value, color };
    });
  },

  getLeadSourceStats: (): SourceStat[] => {
    const leads = storage.getLeads();
    if (leads.length === 0) return [];

    const sourceCounts: Record<string, number> = {};
    leads.forEach((l) => {
      const src = l.source || 'Direct / Other';
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    });

    return Object.entries(sourceCounts)
      .map(([source, count]) => ({
        source,
        count,
        percentage: Math.round((count / leads.length) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  },

  getLeadsByStatus: (): { status: LeadStatus; label: string; count: number }[] => {
    const leads = storage.getLeads();
    const statuses: { status: LeadStatus; label: string }[] = [
      { status: 'new', label: 'New Uncontacted' },
      { status: 'contacted', label: 'Contacted' },
      { status: 'qualified', label: 'Qualified' },
      { status: 'unqualified', label: 'Unqualified' },
      { status: 'converted', label: 'Converted' },
    ];

    return statuses.map(({ status, label }) => ({
      status,
      label,
      count: leads.filter((l) => l.status === status).length,
    }));
  },

  exportCsvReport: (type: 'leads' | 'contacts' | 'deals'): string => {
    if (type === 'leads') {
      const leads = storage.getLeads();
      const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Source', 'Status', 'Priority', 'Est Value', 'Created At'];
      const rows = leads.map((l) => [
        l.id,
        `"${(l.name || '').replace(/"/g, '""')}"`,
        l.email,
        l.phone,
        `"${(l.companyName || '').replace(/"/g, '""')}"`,
        l.source,
        l.status,
        l.priority,
        l.estimatedValue,
        l.createdAt,
      ]);
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    if (type === 'contacts') {
      const contacts = storage.getContacts();
      const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Title', 'Status', 'Tags', 'Sensitivities', 'Created At'];
      const rows = contacts.map((c) => [
        c.id,
        `"${(c.name || '').replace(/"/g, '""')}"`,
        c.email,
        c.phone,
        `"${(c.companyName || '').replace(/"/g, '""')}"`,
        `"${(c.jobTitle || '').replace(/"/g, '""')}"`,
        c.status,
        `"${c.tags.join('; ')}"`,
        `"${(c.sensitivities || '').replace(/"/g, '""')}"`,
        c.createdAt,
      ]);
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    const deals = storage.getDeals();
    const headers = ['ID', 'Title', 'Company', 'Contact', 'Value', 'Currency', 'Stage', 'Probability', 'Expected Close', 'Owner'];
    const rows = deals.map((d) => [
      d.id,
      `"${(d.title || '').replace(/"/g, '""')}"`,
      `"${(d.companyName || '').replace(/"/g, '""')}"`,
      `"${(d.contactName || '').replace(/"/g, '""')}"`,
      d.value,
      d.currency,
      d.stage,
      `${d.probability}%`,
      d.expectedCloseDate,
      `"${(d.ownerName || '').replace(/"/g, '""')}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
