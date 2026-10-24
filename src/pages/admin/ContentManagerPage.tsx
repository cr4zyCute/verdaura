import React, { useState, useEffect } from 'react';
import { contentService } from '../../lib/services/contentService';
import { useAuth } from '../../lib/auth/authContext';
import { CMSContent } from '../../lib/db/schema';
import { FileText, Save, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContentManagerPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState<CMSContent>(contentService.getContent());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setContent(contentService.getContent());
    });
    return () => unsub();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    contentService.updateContent(
      content,
      currentUser?.id || 'usr-1',
      currentUser?.name || 'Elena Hawthorne'
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <FileText className="w-3.5 h-3.5 text-forest" />
            Website CMS
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Public Website Content Control
          </h1>
          <p className="text-xs text-charcoal-600">
            Edit live storefront headlines, promotional banners, and consultation alerts in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="btn-secondary text-xs px-3.5 py-1.5 min-h-[34px] gap-1.5"
          >
            <span>Preview Public Site</span>
            <ExternalLink className="w-3 h-3 text-forest" />
          </Link>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-2.5 text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Website content saved successfully! All updates are immediately active on the storefront.
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Section 1: Hero Section */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sunflower-600" />
              <span>Hero Header &amp; Value Proposition</span>
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Primary headline and introduction visible to all storefront visitors.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">
              Botanical Badge Text
            </label>
            <input
              type="text"
              required
              value={content.heroBadge}
              onChange={(e) => setContent({ ...content, heroBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">
              Main Hero Heading (H1)
            </label>
            <input
              type="text"
              required
              value={content.heroHeading}
              onChange={(e) => setContent({ ...content, heroHeading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 font-serif text-base focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">
              Hero Introduction Paragraph
            </label>
            <textarea
              rows={3}
              required
              value={content.heroSubheading}
              onChange={(e) => setContent({ ...content, heroSubheading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 leading-relaxed focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Promotional Ribbon */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-forest-950">
                Top Announcement Ribbon
              </h3>
              <p className="text-[11px] text-charcoal-500">
                Promotional banner at the very top of every storefront page.
              </p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={content.isAnnouncementActive}
                onChange={(e) => setContent({ ...content, isAnnouncementActive: e.target.checked })}
                className="w-4 h-4 rounded text-forest focus:ring-forest"
              />
              <span className="font-semibold text-xs text-forest-950">Enable Ribbon</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">
              Ribbon Announcement Text
            </label>
            <input
              type="text"
              value={content.announcementText}
              onChange={(e) => setContent({ ...content, announcementText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: Consultation Policy Notice */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Consultation &amp; Storefront Notice
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Guidance for phone orders and on-site appointments.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">
              Appointment Notice Text
            </label>
            <input
              type="text"
              value={content.consultationNote}
              onChange={(e) => setContent({ ...content, consultationNote: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>

          <div className="text-[11px] text-charcoal-500">
            Last modified by <span className="font-semibold text-forest-900">{content.updatedBy}</span> on{' '}
            {new Date(content.updatedAt).toLocaleString()}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="submit" className="btn-primary text-xs px-6 py-2.5 min-h-[40px] gap-2">
            <Save className="w-4 h-4" />
            <span>Publish Content to Storefront</span>
          </button>
        </div>
      </form>
    </div>
  );
};
