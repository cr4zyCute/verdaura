import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS, BUSINESS_INFO } from '../../data/verdauraData';
import { ProductItem } from '../../types/verdaura';
import { Sparkles, Info, X, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  selectedCategory: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ selectedCategory }) => {
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

  const displayedProducts =
    selectedCategory === 'all'
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="featured" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <span className="botanical-badge">
              <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
              Handcrafted Apothecary
            </span>
            <h2 className="section-title-fluid font-serif font-bold text-forest-950">
              Highlighted Botanical Formulations
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Every blend is handcrafted in small batches right in Littleton, Colorado, using pure therapeutic oils and organic botanical extracts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal-500 font-medium">
              Showing {displayedProducts.length} of {FEATURED_PRODUCTS.length} formulations
            </span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="botanical-card overflow-hidden flex flex-col group"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-forest-900/90 backdrop-blur-sm text-cream-50 border border-forest-700/50 shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.price && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-sunflower text-forest-950 shadow-sm">
                    {product.price}
                  </span>
                )}
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-olive-700 font-semibold">
                    {product.category.replace('-', ' ')}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-forest-950 line-clamp-1 group-hover:text-forest-800 transition-colors">
                    <Link to={`/product/${product.id}`} className="hover:underline decoration-olive-600/50">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Key Ingredients Pill preview */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="pt-2 border-t border-sand-100 flex flex-wrap gap-1">
                    {product.ingredients.slice(0, 3).map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-sand-100/70 text-charcoal-700"
                      >
                        {ing}
                      </span>
                    ))}
                    {product.ingredients.length > 3 && (
                      <span className="text-[10px] text-olive-800 font-medium self-center pl-1">
                        +{product.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Card Action */}
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#3E4D3A] text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-[#2E3C2B] transition-all shadow-sm group/btn"
                  >
                    <span>View Formula</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                  <button
                    onClick={() => setActiveProduct(product)}
                    className="p-2.5 rounded-xl bg-sand-100 border border-sand-200 text-forest-900 hover:bg-sand-200 transition-colors"
                    title="Quick preview"
                    aria-label={`Quick preview ${product.name}`}
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State when filter yields none */}
        {displayedProducts.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-sand-200 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-olive-700 mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950">
              Custom Blends Available in This Category
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              We carry custom handcrafted preparations for this category upon appointment. Contact Twink directly for individual formulations.
            </p>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="btn-primary !px-6 !py-2.5 text-xs inline-flex"
            >
              <Phone className="w-3.5 h-3.5 text-sunflower-400" />
              <span>Inquire: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-forest-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl border border-sand-200 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-sand-200 flex items-center justify-between bg-white">
              <div>
                <span className="botanical-badge text-[10px] mb-1">
                  {activeProduct.category.replace('-', ' ')}
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-950">
                  {activeProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveProduct(null)}
                className="p-2 rounded-full bg-sand-100 text-charcoal hover:bg-sand-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Image Frame */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-sand-100 border border-sand-200">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-semibold text-forest-900">
                  Formulation Details
                </h4>
                <p className="text-sm text-charcoal-700 leading-relaxed">
                  {activeProduct.fullDescription}
                </p>
              </div>

              {/* Ingredients */}
              {activeProduct.ingredients && activeProduct.ingredients.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-semibold text-forest-900">
                    Botanical Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProduct.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-white border border-sand-200 text-forest-900 font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-olive-600" />
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Usage */}
              {activeProduct.usage && (
                <div className="p-4 rounded-xl bg-forest-50 border border-forest-200/60 space-y-1">
                  <h5 className="font-serif text-sm font-semibold text-forest-900">
                    Suggested Application:
                  </h5>
                  <p className="text-xs text-charcoal-700 leading-relaxed">
                    {activeProduct.usage}
                  </p>
                </div>
              )}

              {/* Inquire Action Box */}
              <div className="p-4 rounded-2xl bg-white border border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-forest-950 block">
                    Phone Orders &amp; Custom Sizing
                  </span>
                  <span className="text-xs text-charcoal-600">
                    Handcrafted in Littleton, Colorado • Delivery confirmed &amp; insured
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/product/${activeProduct.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#3E4D3A] text-white text-xs font-medium hover:bg-[#2E3C2B] transition-colors"
                  >
                    <span>Full Product Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="btn-primary !px-4 !py-2.5 text-xs whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-sunflower-400" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
