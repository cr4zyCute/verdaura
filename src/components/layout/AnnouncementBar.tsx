import React from 'react';
import { Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/soothersData';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-forest-900 text-cream-200 border-b border-forest-800 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1.5 text-sunflower-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Free Consultations By Appointment
          </span>
          <span className="hidden md:inline text-forest-600">•</span>
          <span className="flex items-center gap-1.5 text-cream-300">
            <Clock className="w-3.5 h-3.5 text-forest-400" />
            <span>Tue – Sat: 10:00 AM – 5:00 PM MT</span>
          </span>
          <span className="hidden md:inline text-forest-600">•</span>
          <span className="flex items-center gap-1.5 text-cream-300">
            <MapPin className="w-3.5 h-3.5 text-forest-400" />
            <span>Littleton, Colorado</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="flex items-center gap-1.5 text-cream-100 hover:text-sunflower-300 transition-colors py-1 focus-visible:outline-none focus-visible:underline"
            title="Call Soothers for orders or consultation appointments"
          >
            <Phone className="w-3 h-3 text-sunflower-400" />
            <span>Orders &amp; Consultations: {BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
