import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/soothersData';
import { AnnouncementBar } from './AnnouncementBar';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', isRouter: true },
    { name: 'Herbals', href: '/products?category=herbals', isRouter: true },
    { name: 'Remedies', href: '/products?category=remedy-oils', isRouter: true },
    { name: 'Aromatherapy', href: '/products?category=essential-oil', isRouter: true },
    { name: 'Services', href: '/#safety-formulas', isRouter: false },
    { name: 'FAQ', href: '/#custom-formulations', isRouter: false },
    { name: 'Contact Us', href: '/#contact', isRouter: false },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-sand-200/80 py-3'
            : 'bg-[#FAF7F2] border-b border-sand-200/60 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 xl:gap-8">
          
          {/* Brand Logo & Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-lg shrink-0"
          >
            <img
              src="/images/soothers-logo.png"
              alt="Soothers Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-3xl sm:text-4xl tracking-tight text-[#2D3A2C] group-hover:text-forest transition-colors">
              soothers
            </span>
          </Link>

          {/* Desktop Center Navigation Links (Single Line, No Wrap) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-nowrap whitespace-nowrap" aria-label="Main Navigation">
            {navLinks.map((item) => (
              item.isRouter ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-xs xl:text-[13.5px] font-sans font-medium text-[#484238] hover:text-[#2D3A2C] transition-colors py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#3E4D3A] after:transition-all hover:after:w-full"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs xl:text-[13.5px] font-sans font-medium text-[#484238] hover:text-[#2D3A2C] transition-colors py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#3E4D3A] after:transition-all hover:after:w-full"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* Desktop Right Utilities (Cart Bag & Shop Pill Button, Search removed) */}
          <div className="hidden sm:flex items-center gap-3.5 xl:gap-4 shrink-0">
            {/* Shopping Bag / Featured Drawer Icon */}
            <a
              href="/#featured"
              className="p-2 rounded-full text-[#484238] hover:text-[#2D3A2C] hover:bg-sand-200/50 transition-all relative"
              aria-label="View featured remedies"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sunflower-500" />
            </a>

            {/* Shop Pill Button */}
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3E4D3A] text-white font-sans font-medium text-xs sm:text-sm tracking-wide shadow-sm hover:bg-[#2E3C2B] hover:shadow-botanical hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <span>Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Actions: Phone & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="p-2.5 rounded-full bg-sand-200/60 text-[#2D3A2C]"
              aria-label="Call Soothers"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-sand-200/60 text-[#2D3A2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </div>

      {/* Free Consultation Announcement Bar */}
      <AnnouncementBar />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(100%+1px)] bg-[#FAF7F2] border-b border-sand-200 shadow-xl py-6 px-6 max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-3">
            <div className="pb-3 border-b border-sand-200">
              <span className="text-xs uppercase tracking-wider text-olive-800 font-semibold block mb-1">
                Handcrafted Apothecary
              </span>
              <p className="text-xs text-charcoal-600">
                Littleton, Colorado • Tue–Sat 10am–5pm MT
              </p>
            </div>

            <nav className="flex flex-col gap-1 py-2">
              {navLinks.map((item) => (
                item.isRouter ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3 rounded-lg text-base font-serif font-medium text-forest-950 hover:bg-sand-100 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 text-sand-400" />
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3 rounded-lg text-base font-serif font-medium text-forest-950 hover:bg-sand-100 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 text-sand-400" />
                  </a>
                )
              ))}
            </nav>

            <div className="pt-3 border-t border-sand-200 space-y-2">
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#3E4D3A] text-white font-sans font-medium text-sm"
              >
                <span>Shop All Botanical Blends</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-sand-100 text-forest-900 font-sans font-medium text-sm border border-sand-200"
              >
                <Phone className="w-4 h-4 text-forest-800" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
