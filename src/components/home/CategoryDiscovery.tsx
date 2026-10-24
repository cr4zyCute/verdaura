import React from 'react';
import { CATEGORIES } from '../../data/verdauraData';
import { Sparkles, Droplets, Leaf, Flower2, Heart, Wind, Shield } from 'lucide-react';

interface CategoryDiscoveryProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryDiscovery: React.FC<CategoryDiscoveryProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'essential-oils':
        return <Droplets className="w-5 h-5" />;
      case 'diffuser-oils':
        return <Wind className="w-5 h-5" />;
      case 'herbals':
        return <Leaf className="w-5 h-5" />;
      case 'remedy-creams':
        return <Heart className="w-5 h-5" />;
      case 'remedy-oils':
        return <Shield className="w-5 h-5" />;
      case 'bach-flowers':
        return <Flower2 className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="pt-10 sm:pt-12 md:pt-16 pb-16 md:pb-24 bg-[#FAF7F2] border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="botanical-badge">
            <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
            Botanical Disciplines
          </span>
          <h2 className="section-title-fluid font-serif font-bold text-forest-950">
            Apothecary &amp; Wellness Categories
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Explore our handcrafted remedies, from concentrated single essential oils to whole-plant herbal tinctures and therapeutic cream bases.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                  isSelected
                    ? 'bg-forest-900 text-cream-50 border-forest-900 shadow-botanical-lg scale-[1.02]'
                    : 'bg-white text-charcoal border-sand-200 hover:border-forest-300 hover:shadow-botanical hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-forest-800 text-sunflower-300'
                        : 'bg-forest-50 text-forest-800 group-hover:bg-forest-100'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                  </div>
                  <h3
                    className={`font-serif text-lg font-semibold tracking-tight ${
                      isSelected ? 'text-cream-50' : 'text-forest-950'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? 'text-cream-300' : 'text-charcoal-600'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 mt-auto flex items-center text-xs font-medium">
                  <span
                    className={
                      isSelected
                        ? 'text-sunflower-300'
                        : 'text-olive-700 group-hover:text-forest-900'
                    }
                  >
                    {isSelected ? 'Viewing Selection' : 'Browse Category →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
