import { Droplet, Sparkles, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/verdauraData';

export const FormulationsShowcase: React.FC = () => {
  return (
    <section id="formulations" className="py-20 md:py-28 bg-[#FAF7F2] border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="botanical-badge">
            <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
            Signature Bases &amp; Targeted Remedies
          </span>
          <h2 className="section-title-fluid font-serif font-bold text-forest-950">
            Formulation Craftsmanship
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Every product is made with concentrated natural bases, free of empty fillers, and designed to nourish both skin and spirit.
          </p>
        </div>

        {/* Dual Foundation Comparison: Cream Blends vs Oil Blends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cream Blends Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-botanical space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-olive-50 text-olive-800 border border-olive-200">
                <Droplet className="w-3.5 h-3.5 text-olive-600" />
                Extra Strength Cream Blends
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                Botanical Cream Base
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Concentrated emollient cream formulated for deep skin absorption and long-lasting moisture. Never greasy, deeply penetrating.
              </p>
              <div className="p-4 rounded-2xl bg-sand-100/60 border border-sand-200 space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-forest-900 block">
                  Enriched With Active Botanicals:
                </span>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  Aloe vera (barbadensis leaf juice), raw shea butter, jojoba oil, apricot kernel oil, green tea extract, retinol (vitamin A), panthenol (vitamin B5), tocopherol (vitamin E), and witch hazel.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
              <span className="text-xs font-medium text-olive-800">Available in Plain &amp; Custom Scented</span>
              <a href="#contact" className="text-xs font-bold text-forest-900 hover:text-sunflower-700 transition-colors">
                Order Custom Blend →
              </a>
            </div>
          </div>

          {/* Oil Blends Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-botanical space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                <Droplet className="w-3.5 h-3.5 text-amber-700" />
                Extra Strength Oil Blends
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                Nutrient Carrier Oil Base
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Formulated for therapeutic body massage, muscle soothing, and concentrated localized application with maximum cellular glide.
              </p>
              <div className="p-4 rounded-2xl bg-sand-100/60 border border-sand-200 space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-forest-900 block">
                  Cold-Pressed Base Oils:
                </span>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  Grape seed oil, sweet almond oil, apricot kernel oil, and golden jojoba oil. Formulated in concentrated ratios with pure essential oils listed on each bottle.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
              <span className="text-xs font-medium text-amber-900">Effective for Targeted Massage</span>
              <a href="#contact" className="text-xs font-bold text-forest-900 hover:text-amber-800 transition-colors">
                Inquire Formulations →
              </a>
            </div>
          </div>
        </div>

        {/* Targeted Formulas Callout */}
        <div className="bg-forest-900 rounded-3xl p-8 sm:p-12 text-cream-100 shadow-botanical-lg grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-forest-800">
          <div className="md:col-span-2 space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-forest-800 text-sunflower-300 border border-forest-700">
              <Sparkles className="w-3.5 h-3.5" />
              Specialized Formulations for You
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
              &ldquo;Verdaura can formulate a special blend just for you.&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-cream-300 leading-relaxed max-w-xl">
              Do you have a sensitive reaction to aloe vera, specific carrier nuts, or citrus oils? Twink Conklin routinely custom-formulates individual recipes for clients with allergies or targeted wellness needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
            <a
              href="#contact"
              className="btn-sunflower text-center text-xs font-bold"
            >
              Request Custom Formula
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="btn-secondary !bg-forest-800/80 !border-forest-700 !text-cream-100 hover:!bg-forest-800 text-center text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-sunflower-400" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
