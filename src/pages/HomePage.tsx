import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/home/HeroSection';
import { HolisticComfortSection } from '../components/home/HolisticComfortSection';
import { ParallaxShopCTA } from '../components/home/ParallaxShopCTA';
// import { CategoryDiscovery } from '../components/home/CategoryDiscovery';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PhilosophyStory } from '../components/home/PhilosophyStory';
// import { FormulationsShowcase } from '../components/home/FormulationsShowcase';
// import { ServicesPreview } from '../components/home/ServicesPreview';
import { CustomFormulationsParallax } from '../components/home/CustomFormulationsParallax';
import { ContactInquirySection } from '../components/home/ContactInquirySection';
import { SalePromotionModal } from '../components/home/SalePromotionModal';
import { Footer } from '../components/layout/Footer';

export const HomePage: React.FC = () => {
  const [selectedCategory] = useState<string>('all');

  // const handleSelectCategory = (catId: string) => {
  //   setSelectedCategory(catId);
  //   // Smooth scroll down to featured section if clicked from categories
  //   const el = document.getElementById('featured');
  //   if (el) {
  //     el.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-charcoal">
      {/* Sticky Header: Main Navbar & Free Consultation Announcement Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section with provided artwork */}
        <HeroSection />

        {/* 2. Holistic Comfort & Aromatherapy Remedies Section */}
        <HolisticComfortSection />

        {/* 3. Premium Botanical Parallax Shopping CTA Section */}
        <ParallaxShopCTA />

        {/* 4. Apothecary & Wellness Categories (Commented out) */}
        {/* <CategoryDiscovery
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        /> */}

        {/* 5. Featured Formulations & Products Catalog */}
        <FeaturedProducts selectedCategory={selectedCategory} />

        {/* 6. Founder Story & Littleton Craftsmanship */}
        <PhilosophyStory />

        {/* 7. Formulation Craftsmanship (Commented out) */}
        {/* <FormulationsShowcase /> */}

        {/* 8. Wellness Services & Classes (Commented out) */}
        {/* <ServicesPreview /> */}

        {/* 7. Custom Formulations Parallax CTA */}
        <CustomFormulationsParallax />

        {/* 8. Visit, Phone Orders & Inquiry Form */}
        <ContactInquirySection />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Limited-Batch Flash Sale Promotion Modal */}
      <SalePromotionModal />
    </div>
  );
};
