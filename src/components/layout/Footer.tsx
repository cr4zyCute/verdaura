import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ChevronUp } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/soothersData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#152117] text-cream-200 border-t border-forest-800/80 pt-10 pb-8 mt-14 sm:mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* MAIN 3-COLUMN LAYOUT                                      */}
        {/* Col 1: Banner + Information (Littleton, Store Hours, Phone)*/}
        {/* Col 2: About Us Links                                     */}
        {/* Col 3: Contact & Service Area                             */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Banner Image + Littleton & Store Hours Below */}
          <div className="md:col-span-5 space-y-4 flex flex-col items-start">
            <div className="w-full max-w-[300px] rounded-xl overflow-hidden shadow-md border border-sunflower-500/25 bg-forest-900/60 transition-transform duration-300 hover:border-sunflower-400/40">
              <img
                src="/images/soothers-footer-banner.png"
                alt="Soothers - Handcrafted Aromatherapy & Botanical Remedies"
                className="w-full h-auto block object-cover"
                width={300}
                height={93}
                loading="lazy"
              />
            </div>

            {/* Information directly at the bottom of the image */}
            <div className="space-y-2 text-left max-w-[320px]">
              <p className="font-serif text-sm sm:text-base text-cream-100 font-medium leading-snug">
                Soothers products are made in Littleton, Colorado USA
              </p>

              <p className="font-sans text-xs text-sunflower-400 font-semibold tracking-wide">
                Phone Orders are Welcome
              </p>

              <div className="pt-1 space-y-0.5 text-xs text-cream-200">
                <p className="font-sans text-[11px] font-bold text-sunflower-500 uppercase tracking-widest">
                  STORE HOURS
                </p>
                <p className="text-cream-200">
                  10:00 am - 5:00 pm - Mountain Time
                </p>
                <p className="font-semibold text-cream-100 uppercase tracking-wide text-[11px]">
                  TUESDAY thru SATURDAY
                </p>
                <p className="text-cream-300 text-[11px]">
                  Closed Sunday &amp; Monday
                </p>
                <p className="text-[11px] text-sunflower-300/90 italic pt-0.5">
                  (ON SITE SERVICES BY APPOINTMENT ONLY!)
                </p>
              </div>

              <div className="pt-1.5">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 text-sunflower-400 hover:text-sunflower-300 font-serif text-base font-bold tracking-wide transition-colors group"
                  aria-label="Call Soothers at 303-788-1614"
                >
                  <Phone className="w-3.5 h-3.5 text-sunflower-400 group-hover:scale-110 transition-transform" />
                  <span>303-788-1614</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-cream-100 tracking-tight">
              About Us
            </h4>
            <div className="w-10 h-1 bg-sunflower-500 rounded-full mb-4" />

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-cream-200">
              {/* Sub-Column 1 */}
              <ul className="space-y-2.5 list-none p-0 m-0">
                <li>
                  <Link to="/" className="hover:text-sunflower-400 transition-colors inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-sunflower-400 transition-colors inline-block">
                    Shop Now
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=herbals" className="hover:text-sunflower-400 transition-colors inline-block">
                    Herbals
                  </Link>
                </li>
              </ul>

              {/* Sub-Column 2 */}
              <ul className="space-y-2.5 list-none p-0 m-0">
                <li>
                  <Link to="/products?category=remedy-oils" className="hover:text-sunflower-400 transition-colors inline-block">
                    Remedies
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=essential-oil" className="hover:text-sunflower-400 transition-colors inline-block">
                    Aromatherapy
                  </Link>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-sunflower-400 transition-colors inline-block">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact & Back to Top */}
          <div className="md:col-span-3 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-cream-100 tracking-tight">
                  Contact
                </h4>
                <div className="w-10 h-1 bg-sunflower-500 rounded-full mb-4" />
              </div>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-forest-900 border border-forest-700/80 text-sunflower-400 hover:bg-forest-800 hover:text-sunflower-300 hover:border-sunflower-500/50 flex items-center justify-center transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunflower"
                aria-label="Scroll back to top"
                title="Scroll back to top"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-cream-200">
              <div>
                <span className="block text-[11px] font-semibold text-sunflower-400/90 uppercase tracking-wider mb-0.5">
                  Phone:
                </span>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="font-serif text-sm sm:text-base font-bold text-cream-100 hover:text-sunflower-400 transition-colors"
                >
                  (303) 788-1614
                </a>
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-sunflower-400/90 uppercase tracking-wider mb-0.5">
                  Service Area
                </span>
                <span className="text-cream-100 font-medium">
                  Colorado and USA
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credit Bar */}
        <div className="mt-10 pt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-2">
          <p className="font-medium text-cream-300">
            &copy; {new Date().getFullYear()} Soothers. All rights reserved.
          </p>
          <p className="text-[11px] text-cream-400/70">
            Website by web.com
          </p>
        </div>

      </div>
    </footer>
  );
};
