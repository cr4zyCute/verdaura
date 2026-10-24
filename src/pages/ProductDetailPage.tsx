import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FEATURED_PRODUCTS, BUSINESS_INFO, CATEGORIES } from '../data/soothersData';
import { ProductItem } from '../types/soothers';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Phone,
  Heart,
  Check,
  ChevronRight,
  Star,
  Leaf,
  FlaskConical,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find product by id from database
  const product: ProductItem | undefined = FEATURED_PRODUCTS.find((p) => p.id === id);

  // Component State
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'heritage' | 'shipping'>('ingredients');
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  const [customBlendModalOpen, setCustomBlendModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Custom Blend Form State
  const [customForm, setCustomForm] = useState({
    name: '',
    phone: '',
    email: '',
    sensitivities: '',
    targetWellness: '',
  });

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Fallback for Product Not Found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-charcoal">
        {/* Sticky Header: Main Navbar & Free Consultation Announcement Bar */}
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-sand-200 flex items-center justify-center text-forest-800">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest-950 font-bold">
            Botanical Formulation Not Found
          </h1>
          <p className="text-charcoal-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            The formulation you are looking for may have been archived or seasonal. Twink Conklin can hand-craft a special custom blend tailored to your wellness needs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/#featured"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3E4D3A] text-white font-medium text-sm hover:bg-[#2E3C2B] transition-colors"
            >
              <span>Explore All Formulations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-sand-300 text-forest-900 font-medium text-sm hover:bg-sand-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-sunflower-600" />
              <span>Call (303) 788-1614</span>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Current Active Size & Price
  const currentSizes = product.sizes && product.sizes.length > 0
    ? product.sizes
    : [{ label: 'Standard Formulation', price: product.price || '$32.00', volume: '30ml' }];

  const activeSize = currentSizes[selectedSizeIndex] || currentSizes[0];

  // Category name
  const categoryObj = CATEGORIES.find((c) => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.name : product.category.replace('-', ' ');

  // Related products (exclude current)
  const relatedProducts = FEATURED_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    setAddedToCartToast(true);
    setTimeout(() => {
      setAddedToCartToast(false);
    }, 3800);
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setCustomBlendModalOpen(false);
      setInquirySubmitted(false);
      setCustomForm({ name: '', phone: '', email: '', sensitivities: '', targetWellness: '' });
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-charcoal">
      {/* 1. Sticky Header Navigation & Info Bar */}
      <Navbar />

      {/* Floating Add to Cart Toast Notification */}
      {addedToCartToast && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-[#24392A] text-white px-5 py-4 rounded-2xl shadow-botanical-lg flex items-center gap-3.5 border border-forest-700 animate-slide-up max-w-md">
          <div className="w-8 h-8 rounded-full bg-sunflower-500/20 text-sunflower-300 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-sunflower-400" />
          </div>
          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-white">Added to Your Apothecary Order</p>
            <p className="text-sand-300">
              {quantity}x {product.name} ({activeSize.label})
            </p>
          </div>
          <button
            onClick={() => setAddedToCartToast(false)}
            className="ml-auto text-sand-400 hover:text-white p-1"
          >
            &times;
          </button>
        </div>
      )}

      {/* 2. Main Product Showcase Container */}
      <main className="flex-1 pb-24 md:pb-32">
        
        {/* Breadcrumbs Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-charcoal-500 flex-wrap">
            <Link to="/" className="hover:text-forest-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-sand-400" />
            <Link to="/#featured" className="hover:text-forest-900 transition-colors">
              Apothecary
            </Link>
            <ChevronRight className="w-3 h-3 text-sand-400" />
            <span className="text-olive-700 font-medium">{categoryName}</span>
            <ChevronRight className="w-3 h-3 text-sand-400" />
            <span className="text-forest-950 font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Hero Grid (2-Columns on Desktop, Stacking on Mobile) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: Visual Presentation & Photo Gallery */}
            <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-28">
              {/* Main Product Image Card */}
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden bg-sand-100 border border-sand-300/80 shadow-sm group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                />

                {/* Badge Overlay */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2B382A]/90 backdrop-blur-md text-white border border-forest-700/60 shadow-sm">
                      <Sparkles className="w-3 h-3 text-sunflower-400" />
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Favorite & Share Buttons */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-10 h-10 rounded-full backdrop-blur-md border border-sand-300/80 flex items-center justify-center transition-all shadow-sm ${
                      isFavorite ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-white/85 text-charcoal-700 hover:bg-white'
                    }`}
                    title="Save to favorites"
                    aria-label="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottom Photo Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-sand-200/80 flex items-center justify-between text-xs text-charcoal-700 shadow-sm">
                  <span className="font-serif italic text-forest-900 font-medium">Handcrafted in Littleton, Colorado</span>
                  <span className="text-olive-700 font-semibold tracking-wider text-[11px] uppercase">Test Kitchen Blend</span>
                </div>
              </div>

              {/* Purity Guarantee Trust Strip Under Image */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white border border-sand-200 text-center space-y-1">
                  <Leaf className="w-5 h-5 text-olive-600 mx-auto" />
                  <p className="font-semibold text-xs text-forest-950">100% Botanical</p>
                  <p className="text-[10px] text-charcoal-500">Zero synthetic scent</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-sand-200 text-center space-y-1">
                  <FlaskConical className="w-5 h-5 text-sunflower-600 mx-auto" />
                  <p className="font-semibold text-xs text-forest-950">Therapeutic Grade</p>
                  <p className="text-[10px] text-charcoal-500">Steam &amp; solar steeped</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-sand-200 text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-forest-600 mx-auto" />
                  <p className="font-semibold text-xs text-forest-950">Twink Conklin</p>
                  <p className="text-[10px] text-charcoal-500">Certified Formulation</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-sand-200 text-center space-y-1">
                  <Truck className="w-5 h-5 text-charcoal-600 mx-auto" />
                  <p className="font-semibold text-xs text-forest-950">Insured Delivery</p>
                  <p className="text-[10px] text-charcoal-500">Confirmed tracking</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Information, Size Selection, and Ordering */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#696155] uppercase font-sans">
                  {categoryName}
                </span>

                {/* Rating Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-sand-300/80 text-xs text-charcoal-700 shadow-sm">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-forest-950">{product.rating || 5.0}</span>
                  <span className="text-charcoal-400">?</span>
                  <span className="text-charcoal-500">({product.reviewCount || 28} client reviews)</span>
                </div>
              </div>

              {/* Main Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B382A] tracking-tight leading-[1.08]">
                {product.name}
              </h1>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-sans text-3xl sm:text-4xl font-bold text-[#2B382A] tracking-tight">
                  {activeSize.price}
                </span>
                <span className="text-xs text-charcoal-500">
                  Includes personalized batch preparation in our test kitchen
                </span>
              </div>

              {/* In-Stock Indicator */}
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                </span>
                <span>Freshly Steeping in Littleton, Colorado ?" Ready for Dispatch</span>
              </div>

              {/* Summary Lead Description */}
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal">
                {product.shortDescription}
              </p>

              {/* Key Benefit Bullet Points */}
              {product.keyBenefits && product.keyBenefits.length > 0 && (
                <div className="p-4 rounded-2xl bg-white border border-sand-200/80 space-y-2.5">
                  <p className="text-xs font-semibold text-forest-950 uppercase tracking-wider">
                    Therapeutic &amp; Sensory Benefits
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-700">
                    {product.keyBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-olive-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size Selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
                    Select Formulation Size
                  </label>
                  <span className="text-xs text-olive-700 font-medium">
                    Selected: {activeSize.volume}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSizes.map((sizeOpt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        selectedSizeIndex === idx
                          ? 'border-forest-700 bg-forest-900/5 shadow-sm ring-1 ring-forest-700'
                          : 'border-sand-300 bg-white hover:border-sand-400 text-charcoal-700'
                      }`}
                    >
                      <p className="font-semibold text-xs text-forest-950">{sizeOpt.label}</p>
                      <p className="text-xs font-sans font-bold text-olive-800 mt-1">{sizeOpt.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter & Ordering CTA Buttons */}
              <div className="space-y-4 pt-4 border-t border-sand-200">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-sand-300 rounded-full bg-white px-2 py-1 shadow-sm shrink-0 justify-between sm:justify-start">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal-600 hover:bg-sand-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-forest-950">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal-600 hover:bg-sand-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Primary Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#3E4D3A] text-white font-sans font-medium text-sm tracking-wide shadow-sm hover:bg-[#2E3C2B] hover:shadow-botanical hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[48px]"
                  >
                    <span>Add to Order ?" {activeSize.price}</span>
                    <ArrowRight className="w-4 h-4 text-white/90" />
                  </button>
                </div>

                {/* Secondary Actions: Phone Order & Custom Sensitivity Blend */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white border border-sand-300 text-forest-900 font-sans font-medium text-xs hover:bg-sand-50 transition-colors min-h-[44px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-sunflower-600" />
                    <span>Phone Order: (303) 788-1614</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setCustomBlendModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-sunflower-100/70 border border-sunflower-300 text-forest-950 font-sans font-medium text-xs hover:bg-sunflower-200/80 transition-colors min-h-[44px]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sunflower-700" />
                    <span>Request Custom Formula</span>
                  </button>
                </div>
              </div>

              {/* 3. Deep Dive Tabbed Accordion (Ingredients, Usage Rituals, Heritage) */}
              <div className="pt-6 border-t border-sand-200">
                <div className="flex items-center border-b border-sand-200 gap-6 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                      activeTab === 'ingredients'
                        ? 'border-[#2B382A] text-[#2B382A]'
                        : 'border-transparent text-charcoal-500 hover:text-forest-900'
                    }`}
                  >
                    Botanical Ingredients
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('usage')}
                    className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                      activeTab === 'usage'
                        ? 'border-[#2B382A] text-[#2B382A]'
                        : 'border-transparent text-charcoal-500 hover:text-forest-900'
                    }`}
                  >
                    Application Rituals
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('heritage')}
                    className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                      activeTab === 'heritage'
                        ? 'border-[#2B382A] text-[#2B382A]'
                        : 'border-transparent text-charcoal-500 hover:text-forest-900'
                    }`}
                  >
                    Twink Conklin Notes
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                      activeTab === 'shipping'
                        ? 'border-[#2B382A] text-[#2B382A]'
                        : 'border-transparent text-charcoal-500 hover:text-forest-900'
                    }`}
                  >
                    Shipping &amp; Delivery
                  </button>
                </div>

                {/* Tab 1: Ingredients */}
                {activeTab === 'ingredients' && (
                  <div className="py-5 space-y-4 animate-fade-in">
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      Every botanical component is individually selected for high synergy and purity. Zero parabens, zero synthetic stabilizers, zero artificial colorants.
                    </p>
                    {product.ingredients && product.ingredients.length > 0 ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {product.ingredients.map((ing, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-sand-300 text-xs text-forest-950 font-medium shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-olive-500" />
                            {ing}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-charcoal-500">100% pure steam-distilled and cold-pressed organic botanicals.</p>
                    )}

                    {product.botanicalDetails && (
                      <div className="mt-4 p-4 rounded-2xl bg-sand-100/60 border border-sand-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="font-semibold text-charcoal-500 uppercase text-[10px]">Method</p>
                          <p className="text-forest-950 font-medium mt-0.5">{product.botanicalDetails.extractionMethod}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal-500 uppercase text-[10px]">Origin</p>
                          <p className="text-forest-950 font-medium mt-0.5">{product.botanicalDetails.origin}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal-500 uppercase text-[10px]">Purity Level</p>
                          <p className="text-forest-950 font-medium mt-0.5">{product.botanicalDetails.purity}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Usage */}
                {activeTab === 'usage' && (
                  <div className="py-5 space-y-4 animate-fade-in">
                    <div className="p-4 rounded-2xl bg-white border border-sand-200 space-y-2">
                      <p className="text-xs font-semibold text-forest-950 uppercase tracking-wide">
                        Recommended Application
                      </p>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        {product.usage || 'Warm 3 to 5 drops between your palms and breathe deeply, then massage gently onto target pulse points or disperse in a water diffuser.'}
                      </p>
                    </div>
                    <div className="text-xs text-charcoal-600 space-y-1.5">
                      <p className="font-medium text-forest-950">Apothecary Tips from Littleton, CO:</p>
                      <p>? Store in a cool, dark apothecary cabinet away from direct ultraviolet sunlight.</p>
                      <p>? Keep dropper seal securely fastened when not in use to preserve volatile essential terpenes.</p>
                      <p>? Perform a patch test before first topical use if you have severe known plant allergies.</p>
                    </div>
                  </div>
                )}

                {/* Tab 3: Heritage */}
                {activeTab === 'heritage' && (
                  <div className="py-5 space-y-4 animate-fade-in">
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-sand-200">
                      <div className="w-10 h-10 rounded-full bg-sand-200 text-forest-900 font-serif font-bold text-lg flex items-center justify-center shrink-0">
                        TC
                      </div>
                      <div className="space-y-1 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        <p className="font-bold text-forest-950">Twink Conklin, Certified Aromatherapist</p>
                        <p>
                          &ldquo;Every bottle is blended by hand right here in Littleton. We never rush the maturation cycle of whole-plant extracts, ensuring the energetic and chemical balance remains uncompromised.&rdquo;
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      {product.fullDescription}
                    </p>
                  </div>
                )}

                {/* Tab 4: Shipping */}
                {activeTab === 'shipping' && (
                  <div className="py-5 space-y-3 animate-fade-in text-xs sm:text-sm text-charcoal-700">
                    <p className="leading-relaxed">
                      {BUSINESS_INFO.shippingPolicy}
                    </p>
                    <div className="p-3.5 rounded-2xl bg-white border border-sand-200 space-y-1.5 text-xs">
                      <p className="font-bold text-forest-950">Apothecary Hours for Phone Orders:</p>
                      <p>{BUSINESS_INFO.hours}</p>
                      <p className="text-olive-700 font-semibold">{BUSINESS_INFO.phone} (Inquiries &amp; Consultations)</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 4. Custom Formulation Consultation Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="rounded-3xl bg-[#1F2D22] text-[#FAF6EE] p-8 sm:p-12 border border-forest-800 shadow-botanical-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800/80 text-sunflower-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Personalized Botanical Remedies
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Require a Custom Blend for Personal Sensitivities?
              </h2>
              <p className="text-xs sm:text-sm text-sand-300/90 leading-relaxed">
                If you have heightened allergies or require adjustments to carrier oils (e.g. substituting almond oil for coconut or jojoba), Twink Conklin hand-formulates custom blends by appointment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setCustomBlendModalOpen(true)}
                className="px-6 py-3.5 rounded-full bg-sunflower text-forest-950 font-medium text-xs sm:text-sm hover:bg-sunflower-400 transition-colors shadow-sm"
              >
                Inquire For Custom Blend
              </button>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="px-6 py-3.5 rounded-full bg-forest-800/80 border border-forest-700 text-white font-medium text-xs sm:text-sm hover:bg-forest-800 transition-colors"
              >
                Call (303) 788-1614
              </a>
            </div>
          </div>
        </section>

        {/* 5. Related Botanical Formulations */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-sand-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-semibold text-olive-700 tracking-wider">
                Complementary Formulations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 mt-1">
                Often Paired Together
              </h3>
            </div>
            <Link
              to="/#featured"
              className="text-xs sm:text-sm font-semibold text-olive-800 hover:text-forest-900 flex items-center gap-1.5"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/product/${rel.id}`)}
                className="botanical-card p-4 rounded-3xl bg-white border border-sand-200 hover:border-sand-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-100">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {rel.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-forest-900/90 text-white">
                        {rel.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-olive-700 tracking-wider">
                      {rel.category.replace('-', ' ')}
                    </span>
                    <h4 className="font-serif text-base font-bold text-forest-950 mt-1 group-hover:text-forest-800 transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-charcoal-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-sand-100">
                  <span className="font-sans font-bold text-sm text-[#2B382A]">
                    {rel.price || '$32.00'}
                  </span>
                  <span className="text-xs font-semibold text-olive-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>View Blend</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 6. Mobile Sticky Bottom Action Bar (Following responsive-design-mastery) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-sand-300 p-3.5 shadow-botanical-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-semibold text-charcoal-500 block">Total</span>
          <span className="font-sans font-bold text-lg text-forest-950">{activeSize.price}</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 max-w-[240px] py-3 px-5 rounded-full bg-[#3E4D3A] text-white font-medium text-xs tracking-wide shadow-sm hover:bg-[#2E3C2B] transition-colors flex items-center justify-center gap-2"
        >
          <span>Add to Order ({activeSize.volume})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 7. Custom Formulation Modal */}
      {customBlendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl border border-sand-300 max-w-lg w-full p-6 sm:p-8 shadow-botanical-lg relative space-y-6">
            <button
              onClick={() => setCustomBlendModalOpen(false)}
              className="absolute top-5 right-5 text-charcoal-400 hover:text-charcoal-800 p-1"
              aria-label="Close modal"
            >
              &times;
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-olive-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-forest-950">Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-charcoal-600">
                  Thank you! Twink Conklin will review your requested formulation for personal sensitivities and contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="botanical-badge">
                    <Sparkles className="w-3 h-3 text-sunflower-600" />
                    Custom Blend Formulation
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest-950">
                    Request Customization
                  </h3>
                  <p className="text-xs text-charcoal-600">
                    Formulating based on: <strong className="text-forest-900">{product.name}</strong>
                  </p>
                </div>

                <form onSubmit={handleCustomFormSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-forest-950 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={customForm.name}
                      onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-forest-950 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={customForm.phone}
                        onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                        placeholder="(303) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-forest-950 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={customForm.email}
                        onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-forest-950 mb-1">Known Allergies or Sensitivities</label>
                    <textarea
                      rows={2}
                      value={customForm.sensitivities}
                      onChange={(e) => setCustomForm({ ...customForm, sensitivities: e.target.value })}
                      placeholder="e.g. Sensitive to nut oils (almond), prefer jojoba base..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#3E4D3A] text-white font-medium text-xs hover:bg-[#2E3C2B] transition-colors"
                  >
                    Submit Customization Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* 8. Full Site Footer */}
      <Footer />
    </div>
  );
};
