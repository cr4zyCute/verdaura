import { storage } from '../db/storageEngine';
import { WebsiteInquiry, InquiryStatus, Lead } from '../db/schema';
import { crmService } from './crmService';

export const inquiryService = {
  getInquiries: (): WebsiteInquiry[] => {
    return storage.getInquiries();
  },

  submitPublicInquiry: (data: {
    name: string;
    email: string;
    phone: string;
    interest: string;
    sensitivities?: string;
    message?: string;
  }): { success: boolean; inquiry?: WebsiteInquiry; error?: string } => {
    if (!data.name?.trim()) return { success: false, error: 'Name is required' };
    if (!data.email?.trim() || !data.email.includes('@'))
      return { success: false, error: 'Valid email is required' };
    if (!data.phone?.trim()) return { success: false, error: 'Phone number is required' };

    const newInquiry: WebsiteInquiry = {
      id: `inq-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      interest: data.interest || 'General Inquiry',
      sensitivities: data.sensitivities?.trim() || undefined,
      message: data.message?.trim() || undefined,
      source: 'Website Contact Section',
      status: 'new',
      assignedToUserId: 'usr-1', // Default assigned to Elena Hawthorne
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.saveInquiry(newInquiry);

    // Auto-log activity in CRM timeline
    storage.logActivity({
      type: 'inquiry',
      title: `Website Inquiry: ${newInquiry.name}`,
      description: `Inquiry regarding ${newInquiry.interest}. Message: "${newInquiry.message || 'No additional note'}".`,
      actorId: 'public_web',
      actorName: 'Website Visitor',
    });

    storage.logAudit({
      action: 'INQUIRY_RECEIVED',
      module: 'inquiries',
      details: `Inquiry received from ${newInquiry.name} (${newInquiry.email}).`,
      actorId: 'public_web',
      actorName: 'Website Gateway',
    });

    return { success: true, inquiry: newInquiry };
  },

  updateInquiryStatus: (
    id: string,
    status: InquiryStatus,
    actorId = 'usr-1',
    actorName = 'Elena Hawthorne'
  ): WebsiteInquiry => {
    const inquiries = storage.getInquiries();
    const item = inquiries.find((i) => i.id === id);
    if (!item) throw new Error('Inquiry not found');

    item.status = status;
    item.updatedAt = new Date().toISOString();
    storage.saveInquiry(item);

    storage.logAudit({
      action: 'INQUIRY_STATUS_CHANGE',
      module: 'inquiries',
      details: `Inquiry ${item.name} marked as ${status}.`,
      actorId,
      actorName,
    });

    return item;
  },

  convertInquiryToLead: (
    inquiryId: string,
    actorId = 'usr-1',
    actorName = 'Elena Hawthorne'
  ): Lead => {
    const inquiries = storage.getInquiries();
    const inquiry = inquiries.find((i) => i.id === inquiryId);
    if (!inquiry) throw new Error('Inquiry not found');

    const createdLead = crmService.createLead(
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        source: 'Website Inquiry',
        status: 'qualified',
        priority: 'high',
        assignedToUserId: inquiry.assignedToUserId || actorId,
        assignedToName: actorName,
        estimatedValue: 250, // default estimation for botanical consultation
        interest: inquiry.interest,
        sensitivities: inquiry.sensitivities,
        notes: `Converted from Website Inquiry on ${new Date().toLocaleDateString()}. Original message: ${inquiry.message || 'None'}.`,
      },
      actorName
    );

    // Update inquiry record
    inquiry.status = 'in_progress';
    inquiry.convertedLeadId = createdLead.id;
    inquiry.updatedAt = new Date().toISOString();
    storage.saveInquiry(inquiry);

    storage.logAudit({
      action: 'INQUIRY_CONVERTED_TO_LEAD',
      module: 'inquiries',
      details: `Inquiry from ${inquiry.name} converted to CRM Lead (${createdLead.id}).`,
      actorId,
      actorName,
    });

    return createdLead;
  },
};
