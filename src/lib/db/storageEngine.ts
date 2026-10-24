import {
  User,
  Lead,
  Contact,
  Company,
  Deal,
  Activity,
  Task,
  WebsiteInquiry,
  CMSContent,
  AuditLog,
  AppSettings,
} from './schema';
import {
  SEED_USERS,
  SEED_LEADS,
  SEED_CONTACTS,
  SEED_COMPANIES,
  SEED_DEALS,
  SEED_TASKS,
  SEED_ACTIVITIES,
  SEED_INQUIRIES,
  SEED_CMS,
  SEED_AUDIT_LOGS,
  SEED_APP_SETTINGS,
} from './seedData';

type Listener = () => void;

class StorageEngine {
  private static instance: StorageEngine;
  private listeners: Set<Listener> = new Set();

  private constructor() {
    this.initialize();
  }

  public static getInstance(): StorageEngine {
    if (!StorageEngine.instance) {
      StorageEngine.instance = new StorageEngine();
    }
    return StorageEngine.instance;
  }

  private initialize(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem('verdaura_users')) {
      this.set('verdaura_users', SEED_USERS);
    }
    if (!localStorage.getItem('verdaura_leads')) {
      this.set('verdaura_leads', SEED_LEADS);
    }
    if (!localStorage.getItem('verdaura_contacts')) {
      this.set('verdaura_contacts', SEED_CONTACTS);
    }
    if (!localStorage.getItem('verdaura_companies')) {
      this.set('verdaura_companies', SEED_COMPANIES);
    }
    if (!localStorage.getItem('verdaura_deals')) {
      this.set('verdaura_deals', SEED_DEALS);
    }
    if (!localStorage.getItem('verdaura_tasks')) {
      this.set('verdaura_tasks', SEED_TASKS);
    }
    if (!localStorage.getItem('verdaura_activities')) {
      this.set('verdaura_activities', SEED_ACTIVITIES);
    }
    if (!localStorage.getItem('verdaura_inquiries')) {
      this.set('verdaura_inquiries', SEED_INQUIRIES);
    }
    if (!localStorage.getItem('verdaura_cms')) {
      this.set('verdaura_cms', SEED_CMS);
    }
    if (!localStorage.getItem('verdaura_audit_logs')) {
      this.set('verdaura_audit_logs', SEED_AUDIT_LOGS);
    }
    if (!localStorage.getItem('verdaura_settings')) {
      this.set('verdaura_settings', SEED_APP_SETTINGS);
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
    } catch (e) {
      console.error(`Error saving to localStorage key "${key}":`, e);
    }
  }

  // --- Users & Auth ---
  public getUsers(): User[] {
    return this.get<User[]>('verdaura_users', SEED_USERS);
  }
  public saveUser(user: User): void {
    const list = this.getUsers();
    const idx = list.findIndex((u) => u.id === user.id);
    if (idx >= 0) list[idx] = { ...user, updatedAt: new Date().toISOString() };
    else list.unshift({ ...user, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    this.set('verdaura_users', list);
  }

  // --- Leads ---
  public getLeads(): Lead[] {
    return this.get<Lead[]>('verdaura_leads', SEED_LEADS);
  }
  public saveLead(lead: Lead): void {
    const list = this.getLeads();
    const idx = list.findIndex((l) => l.id === lead.id);
    if (idx >= 0) list[idx] = { ...lead, updatedAt: new Date().toISOString() };
    else list.unshift({ ...lead, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    this.set('verdaura_leads', list);
  }
  public deleteLead(id: string): void {
    const list = this.getLeads().filter((l) => l.id !== id);
    this.set('verdaura_leads', list);
  }

  // --- Contacts ---
  public getContacts(): Contact[] {
    return this.get<Contact[]>('verdaura_contacts', SEED_CONTACTS);
  }
  public saveContact(contact: Contact): void {
    const list = this.getContacts();
    const idx = list.findIndex((c) => c.id === contact.id);
    if (idx >= 0) list[idx] = { ...contact, updatedAt: new Date().toISOString() };
    else list.unshift({ ...contact, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    this.set('verdaura_contacts', list);
  }
  public deleteContact(id: string): void {
    const list = this.getContacts().filter((c) => c.id !== id);
    this.set('verdaura_contacts', list);
  }

  // --- Companies ---
  public getCompanies(): Company[] {
    return this.get<Company[]>('verdaura_companies', SEED_COMPANIES);
  }
  public saveCompany(company: Company): void {
    const list = this.getCompanies();
    const idx = list.findIndex((c) => c.id === company.id);
    if (idx >= 0) list[idx] = { ...company, updatedAt: new Date().toISOString() };
    else list.unshift({ ...company, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    this.set('verdaura_companies', list);
  }
  public deleteCompany(id: string): void {
    const list = this.getCompanies().filter((c) => c.id !== id);
    this.set('verdaura_companies', list);
  }

  // --- Deals ---
  public getDeals(): Deal[] {
    return this.get<Deal[]>('verdaura_deals', SEED_DEALS);
  }
  public saveDeal(deal: Deal): void {
    const list = this.getDeals();
    const idx = list.findIndex((d) => d.id === deal.id);
    if (idx >= 0) list[idx] = { ...deal, updatedAt: new Date().toISOString() };
    else list.unshift({ ...deal, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    this.set('verdaura_deals', list);
  }
  public deleteDeal(id: string): void {
    const list = this.getDeals().filter((d) => d.id !== id);
    this.set('verdaura_deals', list);
  }

  // --- Activities ---
  public getActivities(): Activity[] {
    return this.get<Activity[]>('verdaura_activities', SEED_ACTIVITIES);
  }
  public logActivity(activity: Omit<Activity, 'id' | 'createdAt'>): Activity {
    const newActivity: Activity = {
      ...activity,
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
    };
    const list = this.getActivities();
    list.unshift(newActivity);
    this.set('verdaura_activities', list);
    return newActivity;
  }

  // --- Tasks ---
  public getTasks(): Task[] {
    return this.get<Task[]>('verdaura_tasks', SEED_TASKS);
  }
  public saveTask(task: Task): void {
    const list = this.getTasks();
    const idx = list.findIndex((t) => t.id === task.id);
    if (idx >= 0) list[idx] = { ...task, updatedAt: new Date().toISOString() };
    else list.unshift({ ...task, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    this.set('verdaura_tasks', list);
  }
  public deleteTask(id: string): void {
    const list = this.getTasks().filter((t) => t.id !== id);
    this.set('verdaura_tasks', list);
  }

  // --- Inquiries ---
  public getInquiries(): WebsiteInquiry[] {
    return this.get<WebsiteInquiry[]>('verdaura_inquiries', SEED_INQUIRIES);
  }
  public saveInquiry(inquiry: WebsiteInquiry): void {
    const list = this.getInquiries();
    const idx = list.findIndex((i) => i.id === inquiry.id);
    if (idx >= 0) list[idx] = { ...inquiry, updatedAt: new Date().toISOString() };
    else list.unshift({ ...inquiry, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    this.set('verdaura_inquiries', list);
  }

  // --- CMS Content ---
  public getCMS(): CMSContent {
    return this.get<CMSContent>('verdaura_cms', SEED_CMS);
  }
  public saveCMS(cms: CMSContent): void {
    this.set('verdaura_cms', { ...cms, updatedAt: new Date().toISOString() });
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLog[] {
    return this.get<AuditLog[]>('verdaura_audit_logs', SEED_AUDIT_LOGS);
  }
  public logAudit(entry: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const settings = this.getSettings();
    if (!settings.enableAuditLogs) return;

    const newLog: AuditLog = {
      ...entry,
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
    };
    const list = this.getAuditLogs();
    list.unshift(newLog);
    // keep max 500 audit items
    if (list.length > 500) list.length = 500;
    this.set('verdaura_audit_logs', list);
  }

  // --- Settings ---
  public getSettings(): AppSettings {
    return this.get<AppSettings>('verdaura_settings', SEED_APP_SETTINGS);
  }
  public saveSettings(settings: AppSettings): void {
    this.set('verdaura_settings', settings);
  }

  // --- Database Reset & Export / Import ---
  public resetToFactory(): void {
    localStorage.removeItem('verdaura_users');
    localStorage.removeItem('verdaura_leads');
    localStorage.removeItem('verdaura_contacts');
    localStorage.removeItem('verdaura_companies');
    localStorage.removeItem('verdaura_deals');
    localStorage.removeItem('verdaura_tasks');
    localStorage.removeItem('verdaura_activities');
    localStorage.removeItem('verdaura_inquiries');
    localStorage.removeItem('verdaura_cms');
    localStorage.removeItem('verdaura_audit_logs');
    localStorage.removeItem('verdaura_settings');
    this.initialize();
    this.notify();
  }

  public exportSqlDump(): string {
    const leads = this.getLeads();
    const contacts = this.getContacts();
    const companies = this.getCompanies();
    const deals = this.getDeals();
    const tasks = this.getTasks();

    let sql = `-- Verdaura xRM Database SQLite DDL & DML Export\n`;
    sql += `-- Generated on ${new Date().toISOString()}\n\n`;

    sql += `CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  phone TEXT,
  address TEXT,
  tier TEXT,
  notes TEXT,
  created_at TEXT,
  updated_at TEXT
);\n\n`;

    companies.forEach((c) => {
      sql += `INSERT OR REPLACE INTO companies (id, name, industry, website, phone, address, tier, notes, created_at, updated_at) VALUES ('${c.id}', '${c.name.replace(/'/g, "''")}', '${c.industry.replace(/'/g, "''")}', '${c.website || ''}', '${c.phone || ''}', '${c.address || ''}', '${c.tier}', '${(c.notes || '').replace(/'/g, "''")}', '${c.createdAt}', '${c.updatedAt}');\n`;
    });

    sql += `\nCREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_id TEXT,
  job_title TEXT,
  status TEXT,
  tags TEXT,
  sensitivities TEXT,
  created_at TEXT,
  updated_at TEXT,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);\n\n`;

    contacts.forEach((c) => {
      sql += `INSERT OR REPLACE INTO contacts (id, name, email, phone, company_id, job_title, status, tags, sensitivities, created_at, updated_at) VALUES ('${c.id}', '${c.name.replace(/'/g, "''")}', '${c.email}', '${c.phone}', '${c.companyId || ''}', '${(c.jobTitle || '').replace(/'/g, "''")}', '${c.status}', '${c.tags.join(',')}', '${(c.sensitivities || '').replace(/'/g, "''")}', '${c.createdAt}', '${c.updatedAt}');\n`;
    });

    sql += `\nCREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  source TEXT,
  status TEXT,
  priority TEXT,
  estimated_value REAL,
  created_at TEXT,
  updated_at TEXT
);\n\n`;

    leads.forEach((l) => {
      sql += `INSERT OR REPLACE INTO leads (id, name, email, phone, company_name, source, status, priority, estimated_value, created_at, updated_at) VALUES ('${l.id}', '${l.name.replace(/'/g, "''")}', '${l.email}', '${l.phone}', '${(l.companyName || '').replace(/'/g, "''")}', '${l.source}', '${l.status}', '${l.priority}', ${l.estimatedValue}, '${l.createdAt}', '${l.updatedAt}');\n`;
    });

    sql += `\nCREATE TABLE IF NOT EXISTS deals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company_id TEXT,
  contact_id TEXT,
  value REAL,
  stage TEXT,
  expected_close_date TEXT,
  probability INTEGER,
  created_at TEXT,
  updated_at TEXT
);\n\n`;

    deals.forEach((d) => {
      sql += `INSERT OR REPLACE INTO deals (id, title, company_id, contact_id, value, stage, expected_close_date, probability, created_at, updated_at) VALUES ('${d.id}', '${d.title.replace(/'/g, "''")}', '${d.companyId || ''}', '${d.contactId || ''}', ${d.value}, '${d.stage}', '${d.expectedCloseDate}', ${d.probability}, '${d.createdAt}', '${d.updatedAt}');\n`;
    });

    sql += `\nCREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT,
  priority TEXT,
  due_date TEXT,
  created_at TEXT,
  updated_at TEXT
);\n\n`;

    tasks.forEach((t) => {
      sql += `INSERT OR REPLACE INTO tasks (id, title, description, status, priority, due_date, created_at, updated_at) VALUES ('${t.id}', '${t.title.replace(/'/g, "''")}', '${(t.description || '').replace(/'/g, "''")}', '${t.status}', '${t.priority}', '${t.dueDate}', '${t.createdAt}', '${t.updatedAt}');\n`;
    });

    return sql;
  }
}

export const storage = StorageEngine.getInstance();
