import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ParallaxShopCTAProps {
  className?: string;
}

export const ParallaxShopCTA: React.FC<ParallaxShopCTAProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const img = imageRef.current;
    if (!section || !img) return;

    let ticking = false;

    const updateParallax = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is visible or near viewport (200px pre-buffer)
      if (rect.bottom >= -200 && rect.top <= windowHeight + 200) {
        // Delta from section center to viewport center
        // When section center is at viewport center: delta = 0 -> offset = 0
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const delta = sectionCenter - viewportCenter;

        // Speed multiplier 0.35: for every 100px scrolled, image shifts 35px relative to section
        // Max travel clamped to +/- 125px (250px total range for distinct, noticeable parallax)
        const speed = window.innerWidth < 640 ? 0.25 : 0.38;
        const maxOffset = window.innerWidth < 640 ? 70 : 125;
        const offset = Math.max(-maxOffset, Math.min(maxOffset, -delta * speed));

        img.style.transform = `translate3d(0px, ${offset.toFixed(1)}px, 0px)`;
      }

      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Attach listeners on both window and document
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    document.addEventListener('scroll', onScrollOrResize, { passive: true });

    // Initial positioning
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('scroll', onScrollOrResize);
    };
  }, []);

  return (
    <section
      id="shop-cta"
      ref={sectionRef}
      aria-label="Shop our products"
      className={`relative isolate overflow-hidden w-full h-[280px] sm:h-[320px] md:h-[345px] lg:h-[365px] xl:h-[375px] flex items-center border-b border-sand-300/60 select-none ${className}`}
    >
      {/* ========================================================= */}
      {/* SCROLL-DRIVEN PARALLAX BACKGROUND PHOTOGRAPH LAYER        */}
      {/* Oversized container (+280px) guarantees ZERO edge gap     */}
      {/* across the +/- 125px parallax displacement range          */}
      {/* ========================================================= */}
      <div
        className="absolute inset-x-0 -z-10 pointer-events-none select-none overflow-hidden"
        style={{
          top: '-140px',
          height: 'calc(100% + 280px)',
        }}
      >
        <img
          ref={imageRef}
          src="/images/botanical-garden-cta.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center select-none"
          style={{
            willChange: 'transform',
            transform: 'translate3d(0px, 0px, 0px)',
          }}
          loading="eager"
        />
      </div>

      {/* ========================================================= */}
      {/* SUBTLE LOCALIZED FOREST-GREEN BOTANICAL GRADIENT OVERLAY   */}
      {/* Keeps sunflowers & amber bottles vibrant while ensuring   */}
      {/* WCAG AAA text contrast on the left side                   */}
      {/* ========================================================= */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(17, 25, 19, 0.74) 0%, rgba(20, 31, 23, 0.58) 35%, rgba(25, 41, 29, 0.32) 65%, rgba(25, 41, 29, 0.1) 85%, rgba(25, 41, 29, 0.05) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* FOREGROUND CONTENT: HEADING & HIGH-CONTRAST SHOP NOW CTA  */}
      {/* Stable foreground that scrolls naturally with page        */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-xl text-left space-y-4 sm:space-y-5">
          
          {/* Main Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-5xl font-medium text-white tracking-tight leading-[1.1] drop-shadow-md">
            Shop our products.
          </h2>

          {/* Primary High-Contrast Conversion CTA Button */}
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-sunflower text-forest-950 font-sans font-bold text-sm sm:text-base tracking-wide shadow-md hover:bg-sunflower-400 hover:shadow-warm-glow hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sunflower-400/60 transition-all duration-300 min-h-[44px] min-w-[44px] group"
              aria-label="Shop our products - Browse all Soothers remedies"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-forest-950 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
