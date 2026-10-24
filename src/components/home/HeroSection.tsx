import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SeamlessHeroVideo } from './SeamlessHeroVideo';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-sand-200">
      {/* Mobile Visual Showcase (Top of Hero on Mobile/Tablet) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:hidden overflow-hidden bg-[#FAF7F2]">
        <SeamlessHeroVideo
          videoSrc="/videos/hero-leaves.mp4"
          posterSrc="/images/hero-video-poster.jpg"
          className="w-full h-full object-cover object-bottom select-none"
        />
        {/* Soft bottom blend to page background */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent pointer-events-none" />
      </div>

      {/* Cinematic Hero Container */}
      <div className="relative w-full flex items-center lg:min-h-[690px]">
        {/* Desktop Background Seamless Hero Video (Right-aligned) */}
        <div className="hidden lg:block absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#FAF7F2]">
          <div className="w-full h-full translate-x-32 xl:translate-x-48 transition-transform duration-300">
            <SeamlessHeroVideo
              videoSrc="/videos/hero-leaves.mp4"
              posterSrc="/images/hero-video-poster.jpg"
              className="w-full h-full object-cover object-[center_bottom] select-none"
            />
          </div>
        </div>

        {/* Desktop Left-Side Pure White/Cream Gradient to Transparent */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[58%] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, #FAF7F2 0%, #FAF7F2 25%, rgba(250, 247, 242, 0.95) 45%, rgba(250, 247, 242, 0.6) 70%, rgba(250, 247, 242, 0) 100%)',
          }}
        />

        {/* Foreground Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-4 pb-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Content Column: Clean Editorial Flow on mobile, Left Column on desktop */}
            <div className="lg:col-span-7 max-w-xl space-y-5 sm:space-y-6">
              
              {/* Colorado Heritage Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sand-300/80 shadow-xs text-xs font-sans text-forest-900">
                <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
                <span className="font-medium tracking-wide">Littleton, Colorado</span>
                <span className="text-sand-400">•</span>
                <span className="text-charcoal-600">Apothecary &amp; Aromatherapy</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#696155] uppercase">
                  Artisan Botanical Remedies
                </p>

                <h1 className="font-serif tracking-tight text-[#2B382A] leading-[1.08] text-3xl sm:text-4xl md:text-5xl lg:text-[64px]">
                  Handcrafted Wellness,
                  <br />
                  <span className="italic font-normal font-serif text-[#3A4B37]">Formulated with Nature</span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal max-w-lg">
                Pure therapeutic essential oils, concentrated herbal extracts, and custom holistic remedies created in small batches in Littleton, Colorado.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3E4D3A] text-white font-sans font-medium text-sm tracking-wide shadow-sm hover:bg-[#2E3C2B] hover:shadow-botanical hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[48px]"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 text-white/90" />
                </a>

                <a
                  href="#story"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 backdrop-blur-sm border border-sand-300/80 text-forest-900 font-sans font-medium text-sm tracking-wide hover:bg-white hover:border-forest-600 hover:-translate-y-0.5 transition-all duration-300 min-h-[48px]"
                >
                  <span>Our Story</span>
                </a>
              </div>

              {/* Micro Trust Proof */}
              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-charcoal-600">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive-500" />
                  100% Concentrated Natural Formulas
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sunflower-500" />
                  Free Consultations By Appointment
                </span>
              </div>
            </div>

            {/* Right Column: Empty spacer for grid balance on desktop */}
            <div className="hidden lg:block lg:col-span-5 relative pointer-events-none" />

          </div>
        </div>
      </div>

      {/* Trust & Littleton Heritage Strip */}
      <div className="bg-[#1F2D22] text-[#FAF6EE] py-4 px-4 sm:px-6 border-t border-forest-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-forest-800/80">
          <div className="px-2 py-2">
            <p className="font-serif text-base sm:text-lg text-sunflower-300 font-medium">Littleton, CO</p>
            <p className="text-xs text-sand-300/90 font-sans">Handcrafted in our test kitchen</p>
          </div>
          <div className="px-2 py-2">
            <p className="font-serif text-base sm:text-lg text-sunflower-300 font-medium">Custom Blends</p>
            <p className="text-xs text-sand-300/90 font-sans">Formulated for personal sensitivities</p>
          </div>
          <div className="px-2 py-2">
            <p className="font-serif text-base sm:text-lg text-sunflower-300 font-medium">Insured Delivery</p>
            <p className="text-xs text-sand-300/90 font-sans">All shipments tracked &amp; confirmed</p>
          </div>
          <div className="px-2 py-2">
            <p className="font-serif text-base sm:text-lg text-sunflower-300 font-medium">(303) 788-1614</p>
            <p className="text-xs text-sand-300/90 font-sans">Phone orders &amp; inquiries welcome</p>
          </div>
        </div>
      </div>
    </section>
  );
};
