import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ChevronUp } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/verdauraData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#152117] text-cream-200 border-t border-forest-800/80 pt-10 pb-8 mt-14 sm:mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* MAIN 4-COLUMN BALANCED LAYOUT                             */}
        {/* Col 1: Brand Logo & Mission Statement                     */}
        {/* Col 2: Store Hours & Appointment Notice                   */}
        {/* Col 3: About Us Navigation Links                          */}
        {/* Col 4: Contact, Phone Orders & Service Area               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Brand Logo & Tagline */}
          <div className="space-y-3">
            <div className="w-full max-w-[240px] rounded-2xl overflow-hidden shadow-md border border-sunflower-500/25 bg-[#FAF7F2] p-3 transition-transform duration-300 hover:border-sunflower-400/40">
              <img
                src="/images/verdaura-logo.png"
                alt="Verdaura - Herbal Wellness & Botanical Remedies"
                className="w-full h-auto block object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-cream-300 leading-relaxed max-w-[240px]">
              Pure botanical remedies and handcrafted aromatherapy, formulated with care in Littleton, Colorado.
            </p>
          </div>

          {/* Column 2: Store Hours */}
          <div className="space-y-2">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-cream-100 tracking-tight">
              Store Hours
            </h4>
            <div className="w-10 h-1 bg-sunflower-500 rounded-full mb-3" />

            <div className="space-y-2.5 text-xs text-cream-200">
              <div>
                <span className="block font-sans text-[11px] font-bold text-sunflower-500 uppercase tracking-wider">
                  Operating Hours
                </span>
                <p className="text-cream-100 font-medium pt-0.5">
                  10:00 AM – 5:00 PM <span className="text-cream-300 font-normal">Mountain Time</span>
                </p>
              </div>

              <div>
                <span className="block font-sans text-[11px] font-bold text-sunflower-500 uppercase tracking-wider">
                  Days Open
                </span>
                <p className="text-cream-100 font-semibold uppercase tracking-wide text-[11px] pt-0.5">
                  Tuesday thru Saturday
                </p>
                <p className="text-cream-300 text-[11px]">
                  Closed Sunday &amp; Monday
                </p>
              </div>

              <div className="pt-0.5">
                <p className="text-[11px] text-sunflower-300/90 italic bg-forest-900/70 border border-forest-800/90 rounded-lg px-2.5 py-1.5 leading-snug">
                  On-site services by appointment only
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: About Us */}
          <div className="space-y-2">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-cream-100 tracking-tight">
              About Us
            </h4>
            <div className="w-10 h-1 bg-sunflower-500 rounded-full mb-3" />

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm text-cream-200">
              <Link to="/" className="hover:text-sunflower-400 transition-colors inline-block">
                Home
              </Link>
              <Link to="/products?category=remedy-oils" className="hover:text-sunflower-400 transition-colors inline-block">
                Remedies
              </Link>
              <Link to="/products" className="hover:text-sunflower-400 transition-colors inline-block">
                Shop Now
              </Link>
              <Link to="/products?category=essential-oil" className="hover:text-sunflower-400 transition-colors inline-block">
                Aromatherapy
              </Link>
              <Link to="/products?category=herbals" className="hover:text-sunflower-400 transition-colors inline-block">
                Herbals
              </Link>
              <a href="/#contact" className="hover:text-sunflower-400 transition-colors inline-block">
                Contact Us
              </a>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-cream-100 tracking-tight">
                  Contact
                </h4>
                <div className="w-10 h-1 bg-sunflower-500 rounded-full mb-3" />
              </div>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-forest-900 border border-forest-700/80 text-sunflower-400 hover:bg-forest-800 hover:text-sunflower-300 hover:border-sunflower-500/50 flex items-center justify-center transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunflower"
                aria-label="Scroll back to top"
                title="Scroll back to top"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-cream-200">
              <div>
                <span className="block text-[11px] font-semibold text-sunflower-400/90 uppercase tracking-wider mb-0.5">
                  Phone:
                </span>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 font-serif text-base font-bold text-cream-100 hover:text-sunflower-400 transition-colors group"
                  aria-label="Call Verdaura at 303-788-1614"
                >
                  <Phone className="w-3.5 h-3.5 text-sunflower-400 group-hover:scale-110 transition-transform" />
                  <span>(303) 788-1614</span>
                </a>
                <p className="text-[11px] text-sunflower-400 font-medium pt-0.5">
                  Phone Orders are Welcome
                </p>
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-sunflower-400/90 uppercase tracking-wider mb-0.5">
                  Location:
                </span>
                <p className="text-cream-100 font-medium text-xs">
                  Littleton, Colorado USA
                </p>
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-sunflower-400/90 uppercase tracking-wider mb-0.5">
                  Service Area:
                </span>
                <p className="text-cream-200 text-xs">
                  Colorado and Contiguous USA
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credit Bar */}
        <div className="mt-10 pt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-2">
          <p className="font-medium text-cream-300">
            &copy; {new Date().getFullYear()} Verdaura. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-cream-400/80">
            <span>Herbal Wellness &amp; Botanical Remedies</span>
            <span>•</span>
            <Link to="/admin" className="hover:text-sunflower-400 text-cream-300 font-medium transition-colors">
              Staff xRM Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
