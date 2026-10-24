import React from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';

export const SafetyAndFormulas: React.FC = () => {
  return (
    <section
      id="safety-formulas"
      aria-label="Safety Precautions and Concentrated Formulas"
      className="py-16 sm:py-20 lg:py-24 bg-[#152117] text-cream-100 border-b border-forest-800/80 relative isolate overflow-hidden"
    >
      {/* Subtle Botanical Watermarks in Corners */}
      <div
        className="absolute -top-20 -left-20 w-[420px] h-auto pointer-events-none select-none -z-10 opacity-10 mix-blend-screen"
        aria-hidden="true"
      >
        <img
          src="/images/botanical-lily-lineart.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div
        className="absolute -bottom-20 -right-20 w-[420px] h-auto pointer-events-none select-none -z-10 opacity-10 mix-blend-screen rotate-180 scale-x-[-1]"
        aria-hidden="true"
      >
        <img
          src="/images/botanical-lily-lineart.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* 2x2 CHECKERBOARD GRID (Matching Reference Layout)         */}
        {/* Row 1: Image (Chamomile) | Safety Precautions             */}
        {/* Row 2: Concentrated Formulas | Image (Floral Infusion)    */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* ------------------------------------------------------- */}
          {/* 1. TOP-LEFT: Chamomile Essential Oil Bottle Image       */}
          {/* ------------------------------------------------------- */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-forest-800 bg-forest-900 group min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] flex">
            <img
              src="/images/chamomile-essential-oil.png"
              alt="Pure chamomile flowers with cork-stoppered essential oil bottle"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle inner gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* ------------------------------------------------------- */}
          {/* 2. TOP-RIGHT: Safety Precautions Golden Card            */}
          {/* ------------------------------------------------------- */}
          <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#EAB332] via-[#DF9F28] to-[#CD8B1A] text-forest-950 shadow-xl border border-sunflower-300/40 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-950/15 text-forest-950 border border-forest-950/20">
                <ShieldAlert className="w-3.5 h-3.5 text-forest-950" />
                <span>Essential Usage Guidance</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-forest-950 tracking-tight leading-tight">
                Safety Precautions
              </h3>

              <p className="text-xs sm:text-sm lg:text-[14px] text-forest-950/90 leading-relaxed font-medium">
                Always consult an Aromatherapist regarding the use of essential oils, and tell your Physician that you are using essential oils. Take care and use caution in the application of all products. They are absorbed through the skin. Essential oils for use on the skin need to be diluted with a base and/or carrier oil. Test all products on inside of elbow or behind the ear lobe for 24 hours. If allergic reaction occurs discontinue use. Our cream and oil products are for external use only. Do not put in eyes or mouth. Keep out of the reach of small children.
              </p>
            </div>

            {/* Pet Warning Notice */}
            <div className="p-3 sm:p-4 rounded-2xl bg-forest-950/10 border border-forest-950/15 text-forest-950">
              <p className="text-[11.5px] sm:text-xs leading-relaxed font-semibold italic">
                (*Essential oils can be harmful and even fatal to pets. Do not apply them to your pet unless under the supervision of a Certified Aromatherapist and/or Veterinarian.*)
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* 3. BOTTOM-LEFT: Concentrated Formulas Golden Card       */}
          {/* ------------------------------------------------------- */}
          <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#EAB332] via-[#DF9F28] to-[#CD8B1A] text-forest-950 shadow-xl border border-sunflower-300/40 flex flex-col justify-between space-y-5 order-3 lg:order-3">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-950/15 text-forest-950 border border-forest-950/20">
                <Sparkles className="w-3.5 h-3.5 text-forest-950" />
                <span>Pure &amp; Potent Botanical Bases</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-forest-950 tracking-tight leading-tight">
                Concentrated Formulas
              </h3>

              <p className="text-xs sm:text-sm lg:text-[14.5px] text-forest-950/90 leading-relaxed font-medium">
                All Soothers products are in concentrated formulas so that you do not need to use much, and the products last longer. The formulations of all herbal creams and oils can be used almost anywhere on the body. We test them on ourselves.
              </p>
            </div>

            {/* Application Areas Highlight */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-forest-950/10 border border-forest-950/15 text-forest-950">
              <p className="text-xs sm:text-[13.5px] leading-relaxed font-semibold">
                All creams and oil products can be applied on the skin, feet, hands, face, and meridians.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* 4. BOTTOM-RIGHT: Herbal Infusion Cup Image              */}
          {/* ------------------------------------------------------- */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-forest-800 bg-forest-900 group min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] flex order-4 lg:order-4">
            <img
              src="/images/botanical-infusion-cup.png"
              alt="Fresh purple and pink botanical flower petals brewing in white herbal bowl"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle inner gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
