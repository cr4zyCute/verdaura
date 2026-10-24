import React from 'react';
import { Check } from 'lucide-react';

interface HolisticComfortSectionProps {
  className?: string;
}

const alternativeBlendsColumns = [
  // Column 1
  [
    'Back and Neck Pain',
    'Boils',
    'Bruises',
    'Dry Skin',
    'Fatigue',
    'PMS',
  ],
  // Column 2
  [
    'Snoring',
    'Insomnia',
    'Itchy Skin',
    'Headaches',
    'Minor Injuries',
    'Body Cream',
  ],
  // Column 3
  [
    'Muscle Spasms',
    'Nervous Tension',
    'Hot-Flashes',
    'Sciatica',
    'Scars',
    'Nite-Nite',
  ],
  // Column 4
  [
    'Sore Muscles',
    'Blemishes',
    'Sniffles, Cold, & Cough',
    'Varicosity',
    'Warts',
    'Smoother Skin Cream',
  ],
];

const pureEssentialOilsColumns = [
  // Column 1
  [
    'Anise Seed',
    'Cedarwood',
    'Cinnamon',
    'Citronella',
    'Clove',
  ],
  // Column 2
  [
    'Eucalyptus',
    'Geranium',
    'Grapefruit',
    'Lavender',
    'Lemongrass',
  ],
  // Column 3
  [
    'Lime',
    'Orange',
    'Patchouli',
    'Peppermint',
    'Pine',
  ],
  // Column 4
  [
    'Rosemary',
    'Sage',
    'Tea Tree',
    'Wintergreen',
    'Ylang Ylang & more...',
  ],
];

export const HolisticComfortSection: React.FC<HolisticComfortSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="holistic-comfort"
      aria-label="Holistic Comfort and Aromatherapy Remedies"
      className={`relative isolate overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8 lg:pb-10 bg-[#FAF7F2] border-b border-sand-200 flex items-center ${className}`}
    >
      {/* ========================================================= */}
      {/* AUTHENTIC BOTANICAL LILY LINE ART BACKGROUND (PNG)        */}
      {/* Soft, delicate watermark opacity (18-22%) so words shine */}
      {/* ========================================================= */}
      <div
        className="absolute -top-12 -left-12 sm:-left-8 md:left-0 w-[520px] sm:w-[660px] lg:w-[740px] xl:w-[820px] pointer-events-none select-none -z-10 opacity-15 sm:opacity-20 lg:opacity-22 mix-blend-multiply transition-opacity duration-300"
        aria-hidden="true"
      >
        <img
          src="/images/botanical-lily-lineart.png"
          alt=""
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Two-Column Side-by-Side Grid: Left (35%) / Right (65%) — Open & Unboxed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* ========================================================= */}
          {/* LEFT SIDE (35%): Brand Introduction & Original Narrative   */}
          {/* Crisp, high-contrast typography over subtle floral nuance */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4 xl:space-y-5 text-left relative z-10">
            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-3xl xl:text-[42px] font-semibold text-forest-950 tracking-tight leading-[1.14] drop-shadow-[0_1px_2px_rgba(250,247,242,0.95)]">
              &ldquo;Indulge In Everyday<br />
              <span className="italic font-serif text-forest-900">Comfort&rdquo;</span>
            </h2>

            {/* Subheading */}
            <p className="font-sans text-[11px] sm:text-xs xl:text-[12.5px] font-bold tracking-[0.18em] text-[#7A4B1B] uppercase leading-snug drop-shadow-[0_1px_1px_rgba(250,247,242,0.9)]">
              Verdaura Is Your Source For Holistic Aromatherapy Products In Littleton Colorado
            </p>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm xl:text-[14.5px] text-[#1E2922] leading-relaxed font-normal drop-shadow-[0_1px_1px_rgba(250,247,242,0.85)]">
              Verdaura – Brings you all natural formulated holistic remedy healing products, that apply to the body, mind, spirit, and social aspects of life, for those who want to achieve and maintain good health. All of our products are made with natural ingredients and formulated to soothe and rejuvenate your mind, body, and spirit. Use our products to alleviate problems without the side effects of harsh chemicals.
            </p>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE (65%): Natural, Unboxed Checkmark Lists         */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6">
            
            {/* ------------------------------------------------------- */}
            {/* Top Group: Alternative Essential Oil Blends (24 items)  */}
            {/* ------------------------------------------------------- */}
            <div>
              <h3 className="font-serif text-lg sm:text-xl xl:text-[22px] font-semibold text-forest-950 mb-3 sm:mb-3.5 tracking-tight text-left">
                Alternative Essential Oil Blends
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 sm:gap-x-4 lg:gap-x-3 xl:gap-x-5 gap-y-2 sm:gap-y-2.5">
                {alternativeBlendsColumns.map((col, colIdx) => (
                  <ul key={`blend-col-${colIdx}`} className="space-y-1.5 sm:space-y-2 list-none p-0 m-0">
                    {col.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full bg-sunflower-500 text-white flex items-center justify-center shrink-0 shadow-xs"
                          aria-hidden="true"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="font-sans text-xs sm:text-[13px] font-medium text-charcoal-800 leading-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Subtle Horizontal Divider */}
            <div className="w-full h-px bg-sand-300/80 my-4 sm:my-5" aria-hidden="true" />

            {/* ------------------------------------------------------- */}
            {/* Bottom Group: 100% Pure Essential Oils (20 items)       */}
            {/* ------------------------------------------------------- */}
            <div>
              <h3 className="font-serif text-lg sm:text-xl xl:text-[22px] font-semibold text-forest-950 mb-3 sm:mb-3.5 tracking-tight text-left">
                100% Pure Essential Oils
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 sm:gap-x-4 lg:gap-x-3 xl:gap-x-5 gap-y-2 sm:gap-y-2.5">
                {pureEssentialOilsColumns.map((col, colIdx) => (
                  <ul key={`pure-col-${colIdx}`} className="space-y-1.5 sm:space-y-2 list-none p-0 m-0">
                    {col.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full bg-sunflower-500 text-white flex items-center justify-center shrink-0 shadow-xs"
                          aria-hidden="true"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="font-sans text-xs sm:text-[13px] font-medium text-charcoal-800 leading-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
