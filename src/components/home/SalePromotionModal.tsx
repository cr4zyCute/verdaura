import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Sparkles,
  Tag,
  ArrowRight,
  Clock,
  Phone,
  Flame,
  ShieldCheck,
  Gift,
  Percent
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/verdauraData';

interface SaleProductPreview {
  id: string;
  name: string;
  regularPrice: number;
  salePrice: number;
  image: string;
  tagline: string;
  badge: string;
}

const SALE_FEATURED_PRODUCTS: SaleProductPreview[] = [
  {
    id: 'calming-diffuser-oil',
    name: 'Calming Diffuser & Bath Oil',
    regularPrice: 6.49,
    salePrice: 5.19,
    image: '/images/calming-diffuser-oil.jpg',
    tagline: 'Deep tranquil French lavender, chamomile & cedarwood for restorative rest.',
    badge: 'Most Popular',
  },
  {
    id: 'hot-flash-diffuser-oil',
    name: 'Hot Flash Diffuser & Bath Oil',
    regularPrice: 7.26,
    salePrice: 5.81,
    image: '/images/hot-flash-diffuser-oil.jpg',
    tagline: 'Instant cooling botanical comfort and emotional temperature equilibrium.',
    badge: 'Customer Favorite',
  },
  {
    id: 'breathe-ez-diffuser-oil',
    name: 'Breathe E-Z Diffuser & Bath Oil',
    regularPrice: 6.96,
    salePrice: 5.57,
    image: '/images/breathe-ez-diffuser-oil.jpg',
    tagline: 'Refreshing eucalyptus & tea tree vapors for crystal-clear respiration.',
    badge: 'Seasonal Essential',
  },
  {
    id: 'headache-diffuser-oil',
    name: 'Headache Diffuser & Bath Oil',
    regularPrice: 7.96,
    salePrice: 6.37,
    image: '/images/headache-diffuser-oil.jpg',
    tagline: 'Cooling peppermint & herbal synergy to soothe persistent head tension.',
    badge: 'Tension Relief',
  },
  {
    id: 'citrus-diffuser-oil',
    name: 'Citrus Diffuser & Bath Oil',
    regularPrice: 4.29,
    salePrice: 3.43,
    image: '/images/citrus-diffuser-oil.jpg',
    tagline: 'Sunny cold-pressed orange, lemon & lime to purify air and elevate mood.',
    badge: 'Best Value',
  },
  {
    id: 'energy-diffuser-oil',
    name: 'Energy Diffuser & Bath Oil',
    regularPrice: 5.79,
    salePrice: 4.63,
    image: '/images/energy-diffuser-oil.jpg',
    tagline: 'Stimulating rosemary & peppermint blend to banish mental fatigue.',
    badge: 'Vitality Boost',
  },
];

export const SalePromotionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Live Urgency Countdown Timer (3 hours, 42 minutes)
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 18,
  });

  // Automatically trigger modal after 5 seconds on website fresh start
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Ticking Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);
    sessionStorage.setItem('verdaura_sale_seen', 'true');
  };

  const currentProduct = SALE_FEATURED_PRODUCTS[activeIdx];

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      {/* 1. Floating Re-open Badge (Available once user interacts/closes modal) */}
      {!isOpen && hasInteracted && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1E2C21] text-cream-50 border border-sunflower-500/40 shadow-botanical-lg hover:bg-[#26382A] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunflower"
          aria-label="Reopen 20% Off Flash Sale offer"
        >
          <div className="w-6 h-6 rounded-full bg-sunflower flex items-center justify-center text-forest-950 font-bold text-xs shrink-0 animate-pulse">
            <Gift className="w-3.5 h-3.5" />
          </div>
          <div className="text-left font-sans">
            <span className="block text-xs font-bold text-sunflower tracking-wide">
              20% OFF SALE
            </span>
            <span className="block text-[10px] text-cream-200">
              Limited Batch Offer
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[10px] bg-forest-950/70 px-2 py-0.5 rounded-full border border-forest-700/60 font-mono text-sand-300 ml-1">
            <Clock className="w-3 h-3 text-sunflower-400" />
            <span>{formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}</span>
          </div>
        </button>
      )}

      {/* 2. Full-Screen Backdrop & Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sale-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-forest-950/75 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-[#FAF7F2] rounded-3xl border border-sand-300 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scaleIn">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full bg-white/90 md:bg-sand-200/80 text-charcoal-700 hover:text-forest-950 hover:bg-white shadow-sm border border-sand-300/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-label="Close sale promotion modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Rich Product Photography & Thumbnail Switcher */}
            <div className="w-full md:w-[46%] lg:w-[48%] bg-gradient-to-b from-[#1C281F] to-[#121B14] p-5 sm:p-6 flex flex-col justify-between relative text-cream-100 overflow-hidden shrink-0">
              {/* Ambient Warm Glow Background */}
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-sunflower-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-forest-600/20 blur-3xl pointer-events-none" />

              {/* Top Tag & Discount Bubble */}
              <div className="flex items-center justify-between gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunflower text-forest-950 text-[11px] font-bold tracking-wide shadow-sm uppercase">
                  <Flame className="w-3.5 h-3.5 fill-forest-950" />
                  Flash Apothecary Sale
                </span>
                <span className="text-[11px] font-medium text-sand-300 bg-forest-900/80 px-2.5 py-1 rounded-full border border-forest-700/60">
                  {currentProduct.badge}
                </span>
              </div>

              {/* Main Product Showcase Photo */}
              <div className="my-3 sm:my-4 relative rounded-2xl overflow-hidden aspect-[4/3] bg-forest-950 border border-forest-800 shadow-lg group">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* 20% OFF Corner Stamp */}
                <div className="absolute top-2.5 left-2.5 bg-[#C74D28] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>20% OFF</span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-2.5 right-2.5 bg-forest-950/85 backdrop-blur-md border border-forest-700 px-3 py-1.5 rounded-xl flex items-baseline gap-2 text-white shadow-md">
                  <span className="text-xs text-sand-400 line-through font-sans">
                    ${currentProduct.regularPrice.toFixed(2)}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-sunflower-300 font-sans tracking-tight">
                    ${currentProduct.salePrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Product Info & Thumbnails Bar */}
              <div className="z-10 space-y-2.5">
                <div>
                  <h4 className="font-serif text-lg font-bold text-cream-50 leading-snug">
                    {currentProduct.name}
                  </h4>
                  <p className="text-xs text-sand-300 leading-relaxed line-clamp-2">
                    {currentProduct.tagline}
                  </p>
                </div>

                {/* Quick Thumbnail Carousel Selector */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-sand-400 block mb-1.5 font-semibold">
                    Select Formulation To Preview:
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {SALE_FEATURED_PRODUCTS.map((prod, idx) => (
                      <button
                        key={prod.id}
                        onClick={() => setActiveIdx(idx)}
                        className={`relative rounded-xl overflow-hidden w-12 h-10 border transition-all shrink-0 ${
                          activeIdx === idx
                            ? 'border-sunflower ring-2 ring-sunflower/50 scale-105'
                            : 'border-forest-700/80 opacity-60 hover:opacity-100'
                        }`}
                        title={prod.name}
                        aria-label={`Preview ${prod.name}`}
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Sales Copy & Promo Voucher */}
            <div className="w-full md:w-[54%] lg:w-[52%] p-6 sm:p-7 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[58vh] md:max-h-none">
              
              <div className="space-y-4">
                {/* Littleton Apothecary Header Badge */}
                <div className="flex items-center gap-2">
                  <span className="botanical-badge text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
                    Littleton, CO • Test Kitchen Special
                  </span>
                </div>

                {/* Main Offer Headline */}
                <div className="space-y-1.5">
                  <h3
                    id="sale-modal-title"
                    className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2C21] tracking-tight leading-tight"
                  >
                    Take <span className="text-[#965F1A] underline decoration-sunflower/60">20% Off</span> Your Handcrafted Botanical Order
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    Crafted in small therapeutic batches by aromatherapist Twink Conklin. For a limited time, enjoy special pricing starting from just <strong className="text-forest-950 font-sans font-bold">$3.43</strong> across all pure diffuser &amp; bath formulations.
                  </p>
                </div>

                {/* Urgency Live Countdown Box */}
                <div className="bg-sand-200/50 border border-sand-300 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-charcoal-700 font-medium">
                    <Clock className="w-4 h-4 text-sunflower-600 animate-spin-slow" />
                    <span>Limited Batch Offer Ends In:</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-forest-950">
                    <span className="bg-white px-2 py-1 rounded-md border border-sand-300 shadow-2xs">
                      {formatNum(timeLeft.hours)}h
                    </span>
                    <span>:</span>
                    <span className="bg-white px-2 py-1 rounded-md border border-sand-300 shadow-2xs">
                      {formatNum(timeLeft.minutes)}m
                    </span>
                    <span>:</span>
                    <span className="bg-white px-2 py-1 rounded-md border border-sand-300 shadow-2xs text-[#A84E2C]">
                      {formatNum(timeLeft.seconds)}s
                    </span>
                  </div>
                </div>

                {/* Automatic Discount Banner */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F5EEDF] border border-sunflower-600/40 flex items-center gap-3.5 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-sunflower/20 border border-sunflower-500/50 flex items-center justify-center text-forest-900 shrink-0">
                    <Percent className="w-5 h-5 text-forest-900" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-forest-950 block">
                      20% Flash Discount Automatically Applied
                    </span>
                    <span className="text-[11px] text-charcoal-600 block mt-0.5">
                      No coupon code needed — all diffuser &amp; bath formulations reflect the sale price!
                    </span>
                  </div>
                </div>

                {/* Key Benefits Checkmarks */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-charcoal-700">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive-600 shrink-0" />
                    <span>100% Pure Therapeutic Grade</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive-600 shrink-0" />
                    <span>Handmade in Littleton, CO</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive-600 shrink-0" />
                    <span>Diffuser &amp; Bath Dual-Use</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive-600 shrink-0" />
                    <span>Free Consultations Available</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons & Direct Contact */}
              <div className="pt-4 sm:pt-5 border-t border-sand-200 mt-4 space-y-2.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <Link
                    to="/products?category=diffuser-oils"
                    onClick={handleClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#3E4D3A] text-white font-sans font-medium text-sm tracking-wide shadow-sm hover:bg-[#2E3C2B] hover:shadow-botanical hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[44px]"
                  >
                    <span>Shop All Sale Formulations</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-sand-200/70 text-forest-900 border border-sand-300 hover:bg-sand-300/80 transition-colors text-xs font-semibold min-h-[44px]"
                    title="Call Littleton Apothecary for direct phone ordering with 20% discount"
                  >
                    <Phone className="w-3.5 h-3.5 text-forest-800" />
                    <span>Call To Order</span>
                  </a>
                </div>

                <p className="text-center text-[10px] text-charcoal-500">
                  Phone orders welcome • All deliveries tracked &amp; insured from Littleton, CO
                </p>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
