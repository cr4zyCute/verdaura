import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FEATURED_PRODUCTS, CATEGORIES, BUSINESS_INFO } from '../data/soothersData';
import {
  Search,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Star
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCat = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Sync category param with URL
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.ingredients &&
          product.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price-asc') {
        const pA = parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
        const pB = parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');
        return pA - pB;
      }
      if (sortBy === 'price-desc') {
        const pA = parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
        const pB = parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');
        return pB - pA;
      }
      return 0; // default featured
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-charcoal">
      {/* Sticky Header: Main Navbar & Free Consultation Announcement Bar */}
      <Navbar />

      <main className="flex-1 pb-20">
        
        {/* Compact Breadcrumb Bar */}
        <div className="border-b border-sand-200/60 py-3 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-charcoal-500">
              <Link to="/" className="hover:text-forest-900 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-sand-400" />
              <span className="text-forest-950 font-medium">Shop</span>
            </nav>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulations, herbs (calendula, arnica)..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-sand-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 text-xs p-1"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end lg:self-auto text-xs text-charcoal-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-forest-800" />
              <label htmlFor="sort-select" className="font-medium">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-sand-300 rounded-xl px-3 py-2 text-xs text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="featured">Featured Blend</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 pt-6 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#2B382A] text-white shadow-sm'
                    : 'bg-white text-charcoal-600 border border-sand-300/80 hover:bg-sand-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-sand-200 my-8 space-y-4">
              <p className="font-serif text-2xl font-bold text-forest-950">No Formulations Found</p>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
                No products match &ldquo;{searchQuery}&rdquo;. Twink Conklin can hand-craft a special custom blend tailored to your specific wellness needs.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-2.5 rounded-full bg-[#3E4D3A] text-white text-xs font-medium hover:bg-[#2E3C2B] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="botanical-card p-4 rounded-3xl bg-white border border-sand-200 hover:border-sand-300 hover:shadow-botanical transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-forest-900/90 backdrop-blur-sm text-white border border-forest-700/60 shadow-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Meta & Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-olive-700 tracking-wider">
                        <span>{product.category.replace('-', ' ')}</span>
                        {product.rating && (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            {product.rating}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-forest-950 line-clamp-1 group-hover:text-forest-800 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Price & Link */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-sand-100">
                    <div>
                      <span className="text-[10px] uppercase text-charcoal-400 block font-semibold tracking-wider">From</span>
                      <span className="font-sans font-bold text-base sm:text-lg text-[#2B382A] tracking-tight">
                        {product.price || '$28.00'}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-forest-900/5 group-hover:bg-[#3E4D3A] group-hover:text-white text-forest-900 text-xs font-medium transition-colors">
                      <span>View Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Formulation Prompt */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="rounded-3xl bg-[#1F2D22] text-[#FAF6EE] p-8 border border-forest-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-white">
                Don&rsquo;t see the exact botanical formula you need?
              </p>
              <p className="text-xs sm:text-sm text-sand-300/90 mt-1">
                Twink Conklin hand-crafts custom blends for personal sensitivities and allergies.
              </p>
            </div>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="px-6 py-3 rounded-full bg-sunflower text-forest-950 font-medium text-xs sm:text-sm hover:bg-sunflower-400 transition-colors shrink-0"
            >
              Call for Custom Order: (303) 788-1614
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
