import React from 'react';
import { SERVICES, BUSINESS_INFO } from '../../data/verdauraData';
import { Sparkles, Calendar, CheckCircle, Phone } from 'lucide-react';

export const ServicesPreview: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#F4EFE6] border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="botanical-badge">
            <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
            Littleton Studio &amp; Consultations
          </span>
          <h2 className="section-title-fluid font-serif font-bold text-forest-950">
            Wellness Services &amp; Classes
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            All on-site services, classes, and personalized consultations are scheduled by appointment at our Littleton, Colorado location.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-200 shadow-sm hover:shadow-botanical hover:border-forest-200 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  {service.badge ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sunflower/20 text-forest-900 border border-sunflower/40">
                      {service.badge}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-olive-700 tracking-wider uppercase">
                      Studio Service
                    </span>
                  )}
                  <span className="font-sans text-base sm:text-lg font-bold text-amber-800 tracking-tight">
                    {service.price}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-800 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 pt-2 border-t border-sand-100">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-charcoal-700">
                      <CheckCircle className="w-3.5 h-3.5 text-olive-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-sand-100 flex items-center justify-between">
                <a
                  href="#contact"
                  className="text-xs font-bold text-forest-900 hover:text-sunflower-700 transition-colors flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Appointment</span>
                </a>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="p-2 rounded-full bg-sand-100 text-forest-900 hover:bg-forest hover:text-white transition-colors"
                  title="Call to book"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-white border border-sand-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto shadow-sm">
          <div className="text-left">
            <span className="font-serif text-base font-bold text-forest-950 block">
              Free Initial Consultations
            </span>
            <span className="text-xs text-charcoal-600">
              Not sure which botanical or service fits your journey? Free consultation sessions are offered by appointment.
            </span>
          </div>
          <a
            href={BUSINESS_INFO.phoneHref}
            className="btn-primary !px-5 !py-2.5 text-xs whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-sunflower-400" />
            <span>Call (303) 788-1614</span>
          </a>
        </div>
      </div>
    </section>
  );
};
