import React, { useState } from 'react';
import { FAQS } from '../../data/verdauraData';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF7F2] border-b border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="botanical-badge">
            <HelpCircle className="w-3.5 h-3.5 text-sunflower-600" />
            Common Questions
          </span>
          <h2 className="section-title-fluid font-serif font-bold text-forest-950">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-charcoal-600 max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our handcrafted batches, personalized allergy formulations, and studio appointments.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-sand-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-forest-950">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-forest text-white'
                        : 'bg-sand-100 text-forest-900'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-charcoal-700 leading-relaxed border-t border-sand-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-charcoal-600">
            Have a question about a specific oil or sensitivity?{' '}
            <a
              href="#contact"
              className="font-bold text-forest-900 hover:text-sunflower-700 underline decoration-sand-300 underline-offset-4"
            >
              Reach out to Twink directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
