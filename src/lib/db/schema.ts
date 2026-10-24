/**
 * Database Schema Definitions for Verdaura Admin & xRM System
 * Designed according to Relational / SQLite & Turso Cloud conventions
 */

export type UserRole = 'owner' | 'administrator' | 'sales_staff' | 'content_editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  website?: string;
  source: string;
  status: LeadStatus;
  priority: PriorityLevel;
  assignedToUserId?: string;
  assignedToName?: string;
  estimatedValue: number;
  interest?: string;
  sensitivities?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId?: string;
  companyName?: string;
  jobTitle?: string;
  status: 'active' | 'prospect' | 'vip' | 'inactive';
  assignedToUserId?: string;
  assignedToName?: string;
  tags: string[];
  sensitivities?: string;
  preferredContactMethod: 'email' | 'phone' | 'text';
  lastContactedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website?: string;
  phone?: string;
  address?: string;
  accountOwnerId?: string;
  accountOwnerName?: string;
  tier: 'wholesale' | 'spa_partner' | 'boutique' | 'corporate';
  contactCount?: number;
  openDealsValue?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DealStage = 
  | 'qualification' 
  | 'discovery' 
  | 'proposal' 
  | 'negotiation' 
  | 'won' 
  | 'lost';

export interface Deal {
  id: string;
  title: string;
  companyId?: string;
  companyName?: string;
  contactId?: string;
  contactName?: string;
  value: number;
  currency: string;
  stage: DealStage;
  ownerId?: string;
  ownerName?: string;
  expectedCloseDate: string;
  probability: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActivityType = 
  | 'email' 
  | 'call' 
  | 'meeting' 
  | 'note' 
  | 'inquiry' 
  | 'deal_stage_change' 
  | 'task_completed';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  actorId: string;
  actorName: string;
  leadId?: string;
  contactId?: string;
  dealId?: string;
  companyId?: string;
  createdAt: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate: string;
  assignedToUserId?: string;
  assignedToName?: string;
  contactId?: string;
  contactName?: string;
  leadId?: string;
  dealId?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = 'new' | 'in_progress' | 'resolved' | 'closed';

export interface WebsiteInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  sensitivities?: string;
  message?: string;
  source: string;
  status: InquiryStatus;
  assignedToUserId?: string;
  convertedLeadId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CMSContent {
  id: string;
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  announcementText: string;
  isAnnouncementActive: boolean;
  consultationNote: string;
  updatedAt: string;
  updatedBy: string;
}

export interface AuditLog {
  id: string;
  action: string;
  module: 'auth' | 'crm' | 'content' | 'users' | 'settings' | 'inquiries';
  details: string;
  actorId: string;
  actorName: string;
  ipAddress?: string;
  timestamp: string;
}

export interface AppSettings {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  timezone: string;
  tursoDatabaseUrl: string;
  tursoAuthTokenConfigured: boolean;
  enableAuditLogs: boolean;
  autoAssignNewLeads: boolean;
}
