import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CustomFormulationsParallaxProps {
  className?: string;
}

export const CustomFormulationsParallax: React.FC<CustomFormulationsParallaxProps> = ({ className = '' }) => {
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
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const delta = sectionCenter - viewportCenter;

        // Smooth parallax offset
        const speed = window.innerWidth < 640 ? 0.22 : 0.35;
        const maxOffset = window.innerWidth < 640 ? 60 : 110;
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
      id="custom-formulations"
      ref={sectionRef}
      aria-label="Custom Formulations"
      className={`relative isolate overflow-hidden w-full min-h-[380px] sm:min-h-[420px] md:min-h-[440px] lg:min-h-[460px] flex items-center justify-center border-b border-sand-300/60 select-none py-14 sm:py-16 ${className}`}
    >
      {/* ========================================================= */}
      {/* SCROLL-DRIVEN PARALLAX BACKGROUND PHOTOGRAPH LAYER        */}
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
          src="/images/custom-formulations-parallax.jpg"
          alt="Soothers apothecary bottles, herbs and test kitchen"
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
      {/* ATMOSPHERIC BOTANICAL OVERLAY                             */}
      {/* Ensures WCAG AAA contrast for centered content            */}
      {/* ========================================================= */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-forest-950/75 via-forest-950/65 to-forest-950/80"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* FOREGROUND CONTENT: CENTERED EDITORIAL & CALL TO ACTION   */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <div className="max-w-2xl sm:max-w-3xl mx-auto space-y-5 sm:space-y-6">
          
          {/* Subtle Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sunflower-500/20 text-sunflower-300 border border-sunflower-400/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-sunflower-400" />
            <span>Handcrafted In Littleton</span>
          </div>

          {/* Centered Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.15] drop-shadow-lg">
            Custom Formulations
          </h2>

          {/* Centered Description */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-cream-100/95 leading-relaxed font-normal max-w-2xl mx-auto drop-shadow-sm">
            We are dedicated to serving our customers needs and strive to bring you the best in quality products. If you have a specific formulation in mind, we gladly accept special orders. Contact us for custom orders.
          </p>

          {/* Primary High-Contrast Contact Us CTA Button */}
          <div className="pt-2 sm:pt-3">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2.5 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-sunflower text-forest-950 font-sans font-bold text-sm sm:text-base tracking-wide shadow-xl hover:bg-sunflower-400 hover:shadow-warm-glow hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sunflower-400/60 transition-all duration-300 min-h-[44px] min-w-[44px] group"
              aria-label="Contact us for custom orders"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-forest-950 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
