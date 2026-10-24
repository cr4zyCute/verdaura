import { storage } from '../db/storageEngine';
import { CMSContent } from '../db/schema';

export const contentService = {
  getContent: (): CMSContent => {
    return storage.getCMS();
  },

  updateContent: (
    updated: Partial<CMSContent>,
    actorId = 'usr-1',
    actorName = 'Elena Hawthorne'
  ): CMSContent => {
    const current = storage.getCMS();
    const next: CMSContent = {
      ...current,
      ...updated,
      updatedAt: new Date().toISOString(),
      updatedBy: actorName,
    };
    storage.saveCMS(next);

    storage.logAudit({
      action: 'CMS_CONTENT_UPDATED',
      module: 'content',
      details: `Website content updated by ${actorName}. Announcement: "${next.announcementText.substring(0, 40)}..."`,
      actorId,
      actorName,
    });

    return next;
  },

  subscribe: (callback: () => void): (() => void) => {
    return storage.subscribe(callback);
  },
};
