import React from 'react';
import { Award, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PhilosophyStory: React.FC = () => {
  return (
    <section
      id="story"
      className="py-10 sm:py-12 lg:py-8 xl:py-12 bg-[#F4EFE6] border-b border-sand-200 overflow-hidden lg:min-h-0 lg:max-h-[900px] lg:flex lg:items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Authentic Portrait / Apothecary Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-2.5 rounded-3xl bg-forest-900/5 rotate-1" />
              <div className="relative rounded-3xl overflow-hidden border border-sand-300 shadow-botanical-lg bg-white">
                <img
                  src="/images/soothers-remedies-sunflowers.jpg"
                  alt="Soothers handcrafted remedy oils, embroidered brand cloth, and sunflowers in Littleton test kitchen"
                  className="w-full h-[320px] sm:h-[360px] lg:h-[390px] xl:h-[430px] object-cover object-center"
                  loading="lazy"
                />
                {/* Floating Badge (Moved to Top) */}
                <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md border border-sand-200/80 shadow-md z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-forest text-sunflower-400 flex items-center justify-center shrink-0 shadow-sm">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="font-serif text-sm sm:text-base font-bold text-forest-950 block leading-tight">
                        Twink Conklin
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] text-olive-800 font-medium leading-tight block pt-0.5">
                        5th-Generation Coloradan • Certified Iridologist &amp; Aromatherapist
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Values */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            
            {/* Header */}
            <div className="space-y-1 sm:space-y-1.5">
              <span className="botanical-badge text-[11px] py-1 px-3 inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sunflower-600" />
                Authentic Heritage &amp; Craftsmanship
              </span>
              <h2 className="font-serif font-bold text-forest-950 tracking-tight text-2xl sm:text-3xl lg:text-[28px] xl:text-[34px] leading-tight">
                Born From Healing, Handcrafted in Littleton
              </h2>
            </div>

            {/* Narrative Body */}
            <div className="space-y-2 text-xs sm:text-[13px] lg:text-[13.5px] xl:text-sm text-charcoal-700 leading-relaxed font-normal">
              <p>
                Twink Conklin is a fifth-generation native of Colorado, rooted in a family tradition of care and craftsmanship. After graduating as a licensed cosmetologist in 1977 and directing salon operations for over 36 years, Twink faced a pivotal challenge in 1993 when a persistent staph infection failed conventional treatments for five years.
              </p>
              <p>
                Her breakthrough came through natural medicine. Inspired by this recovery, Twink dedicated her career to natural health disciplines starting in 1995—earning certification as an <strong>Iridologist</strong> through the Universal School of Medicine for Natural Living, and studying professional Herbology and Aromatherapy.
              </p>
              <p>
                She developed every Soothers formula right in her own test kitchen. First shared with her personal iridology clients, the results were so profound that clients urged her to make them available to everyone seeking natural remedies.
              </p>
            </div>

            {/* Editorial Quote Card */}
            <blockquote className="p-4 sm:p-4.5 rounded-2xl bg-white border-l-[5px] border-sunflower-500 border-y border-r border-sand-200 shadow-sm space-y-2">
              <p className="font-serif font-medium sm:font-semibold text-sm sm:text-base lg:text-[16px] text-forest-950 leading-snug tracking-tight">
                &ldquo;Everything is formulated with natural ingredients in concentrated formulas. We test them on ourselves first. Soothers was founded with the objective of helping those who choose the natural means to good health.&rdquo;
              </p>
              <footer className="text-xs sm:text-[12px] font-bold text-olive-900 uppercase tracking-wider flex items-center gap-2 pt-0.5">
                <span className="w-5 h-0.5 bg-sunflower-500 rounded-full inline-block" />
                <span>Twink Conklin, Founder of Soothers</span>
              </footer>
            </blockquote>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-0.5">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-sand-200 space-y-0.5 hover:border-olive-300 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-olive-700 shrink-0" />
                  <span className="text-xs font-bold text-forest-950">Concentrated Recipes</span>
                </div>
                <span className="text-[11px] text-charcoal-600 block leading-snug">No watery fillers, only active botanical goodness.</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-sand-200 space-y-0.5 hover:border-olive-300 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-olive-700 shrink-0" />
                  <span className="text-xs font-bold text-forest-950">Kitchen Crafted</span>
                </div>
                <span className="text-[11px] text-charcoal-600 block leading-snug">Blended in Littleton with genuine healing care.</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-sand-200 space-y-0.5 hover:border-olive-300 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-olive-700 shrink-0" />
                  <span className="text-xs font-bold text-forest-950">Custom Formulation</span>
                </div>
                <span className="text-[11px] text-charcoal-600 block leading-snug">Special blends created for individual allergies.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
