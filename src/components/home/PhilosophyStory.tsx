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
                  src="/images/verdaura-remedies-sunflowers.jpg"
                  alt="Verdaura handcrafted botanical remedies, embroidered linen cloth, and sunflowers in Littleton artisan studio"
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
                        Elena Hawthorne
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] text-olive-800 font-medium leading-tight block pt-0.5">
                        Founder &amp; Master Herbalist • Clinical Aromatherapist
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
                Born From Botanical Wisdom, Handcrafted in Littleton
              </h2>
            </div>

            {/* Narrative Body */}
            <div className="space-y-2 text-xs sm:text-[13px] lg:text-[13.5px] xl:text-sm text-charcoal-700 leading-relaxed font-normal">
              <p>
                Elena Hawthorne grew up surrounded by high-altitude wildflowers along the Colorado foothills, learning the ancient language of plants from her grandmother, an herbalist and gardener. Fascinated by how earth-grown remedies could gently restore balance to the nervous system and skin, Elena pursued clinical botanical medicine and natural distillation, dedicating over two decades to studying pure plant energetics and organic whole-herb extractions.
              </p>
              <p>
                After witnessing how synthetic fragrances, petroleum bases, and mass-market additives overwhelmed delicate bodies, Elena retreated to her Littleton sunroom studio. Beside blooming sunflowers, organic lavender, and wild chamomile, she began hand-crafting small-batch botanical elixirs, testing every concentrated tincture and cold-pressed oil with uncompromising standards.
              </p>
              <p>
                What began as custom comforting blends for neighbors experiencing stubborn tension, sleep difficulties, and hormonal fatigue quickly grew through word of mouth. Clients reported profound relief from the very first drop, inspiring Elena to found Verdaura: an artisan botanical sanctuary where pure plant wisdom, clean science, and gentle human care unite.
              </p>
            </div>

            {/* Editorial Quote Card */}
            <blockquote className="p-4 sm:p-4.5 rounded-2xl bg-white border-l-[5px] border-sunflower-500 border-y border-r border-sand-200 shadow-sm space-y-2">
              <p className="font-serif font-medium sm:font-semibold text-sm sm:text-base lg:text-[16px] text-forest-950 leading-snug tracking-tight">
                &ldquo;Nature never rushes, yet nothing is left unhealed. At Verdaura, we take the purest essences of the earth and blend them with reverent care—delivering concentrated relief that honors your body, mind, and spirit.&rdquo;
              </p>
              <footer className="text-xs sm:text-[12px] font-bold text-olive-900 uppercase tracking-wider flex items-center gap-2 pt-0.5">
                <span className="w-5 h-0.5 bg-sunflower-500 rounded-full inline-block" />
                <span>Elena Hawthorne, Founder of Verdaura</span>
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
