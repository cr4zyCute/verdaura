import React, { useState } from 'react';
import { Phone, Clock, MapPin, Send, CheckCircle2, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/verdauraData';

export const ContactInquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'custom-blend',
    sensitivities: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('303-788-1614');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Please provide a valid email address.';
    if (!formData.phone.trim())
      errs.phone = 'Please provide a contact phone number.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Verdaura and Schedule Consultations"
      className="py-10 sm:py-12 lg:py-8 xl:py-10 bg-[#F4EFE6] border-b border-sand-200 lg:min-h-0 lg:max-h-[900px] lg:flex lg:items-center relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Business Info, Phone & Store Hours           */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Header */}
            <div className="space-y-1">
              <span className="botanical-badge text-[11px] py-0.5 px-2.5">
                <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
                Connect With Verdaura
              </span>
              <h2 className="font-serif font-bold text-forest-950 text-2xl sm:text-3xl lg:text-[28px] xl:text-[34px] tracking-tight leading-tight">
                Visit or Inquire Directly
              </h2>
              <p className="text-xs sm:text-[13px] text-charcoal-700 leading-relaxed font-normal">
                Whether you need a custom remedy formulated for sensitive skin, want to schedule an appointment, or have questions about a rare botanical oil, Elena is here to help.
              </p>
            </div>

            {/* Business Contact Cards */}
            <div className="space-y-3">
              
              {/* Phone Order Card with 1-Tap Call & Copy (Icon-Only Buttons) */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-sand-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-forest-950 font-serif text-base font-bold">
                    <div className="w-8 h-8 rounded-full bg-forest text-sunflower-400 flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span>Phone Orders &amp; Booking</span>
                  </div>

                  {/* Icon-Only Action Buttons: 1-Tap Call & Copy Number */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* 1-Tap Call Button (Icon Only) */}
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="w-8 h-8 rounded-full bg-forest-900 text-sunflower-400 hover:bg-forest-800 hover:text-sunflower-300 flex items-center justify-center transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                      aria-label="Call (303) 788-1614 directly"
                      title="Call (303) 788-1614 directly"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    {/* Copy Phone Number Button (Icon Only) */}
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="w-8 h-8 rounded-full bg-forest-900 text-sunflower-400 hover:bg-forest-800 hover:text-sunflower-300 flex items-center justify-center transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                      aria-label={copied ? "Phone number copied" : "Copy phone number"}
                      title={copied ? "Copied to clipboard!" : "Copy (303) 788-1614"}
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-0.5">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="text-lg sm:text-xl font-bold font-serif text-amber-800 hover:text-amber-900 transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  {copied && (
                    <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full animate-fade-in">
                      Copied!
                    </span>
                  )}
                </div>

                <p className="text-[11.5px] text-charcoal-600 leading-snug">
                  Phone orders are always welcome during regular store hours.
                </p>
              </div>

              {/* Hours Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-sand-200 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2.5 text-forest-950 font-serif text-base font-bold">
                  <div className="w-8 h-8 rounded-full bg-forest text-sunflower-400 flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span>Store Hours (Mountain Time)</span>
                </div>
                <div className="pl-10 text-xs space-y-0.5 text-charcoal-700">
                  <div className="font-semibold text-forest-950">
                    Tuesday thru Saturday: 10:00 am – 5:00 pm
                  </div>
                  <div className="text-charcoal-500 text-[11px]">
                    Closed Sunday &amp; Monday • On-site services by appointment only.
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-sand-200 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2.5 text-forest-950 font-serif text-base font-bold">
                  <div className="w-8 h-8 rounded-full bg-forest text-sunflower-400 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>Location &amp; Delivery</span>
                </div>
                <div className="pl-10 text-xs text-charcoal-700 leading-snug">
                  <span className="font-semibold text-forest-950">Littleton, Colorado, USA</span>
                  <span className="text-charcoal-500 text-[11px] block">
                    Shipping throughout Colorado &amp; continental USA. Tracked &amp; confirmed.
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Streamlined Consultation Request Form       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-sand-200 shadow-botanical space-y-4">
              <div>
                <span className="botanical-badge text-[10px] py-0.5 px-2 mb-1">
                  Inquiry &amp; Consultation Request
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 leading-tight">
                  Schedule an Appointment or Order Custom Blends
                </h3>
                <p className="text-xs text-charcoal-600 mt-0.5">
                  Tell us about your wellness goals or skin sensitivities.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-forest-50 border border-forest-200 text-center space-y-3 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-forest text-sunflower-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-forest-950">
                      Inquiry Received (Demo Mode)
                    </h4>
                    <p className="text-xs text-charcoal-700 leading-relaxed max-w-md mx-auto">
                      Thank you, <strong>{formData.name}</strong>. Your consultation details have been recorded. For immediate assistance, feel free to call our Littleton studio at <strong>(303) 788-1614</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        interest: 'custom-blend',
                        sensitivities: '',
                        message: '',
                      });
                    }}
                    className="btn-secondary !text-xs !py-1.5 !px-3.5"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full px-3.5 py-2 rounded-xl border border-sand-300 bg-[#FAF7F2]/60 text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-amber-800 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-2.5 h-2.5" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-sand-300 bg-[#FAF7F2]/60 text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-amber-800 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-2.5 h-2.5" />
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(303) 555-0199"
                        className="w-full px-3.5 py-2 rounded-xl border border-sand-300 bg-[#FAF7F2]/60 text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-amber-800 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-2.5 h-2.5" />
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                        Botanical Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-sand-300 bg-[#FAF7F2]/60 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                      >
                        <option value="custom-blend">Custom Formulated Blend</option>
                        <option value="aromatherapy-consultation">Aromatherapy Consultation ($65)</option>
                        <option value="aromatherapy-class">Aromatherapy Class ($300)</option>
                        <option value="product-order">General Product Order or Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Known Allergies */}
                  <div>
                    <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                      Known Allergies or Sensitivities (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.sensitivities}
                      onChange={(e) => setFormData({ ...formData, sensitivities: e.target.value })}
                      placeholder="e.g. Sensitive to aloe vera, allergic to almonds, citrus-free"
                      className="w-full px-3.5 py-2 rounded-xl border border-sand-300 bg-[#FAF7F2]/60 text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                      How Can Elena Help You? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals or preferred appointment days..."
                      className="w-full px-3.5 py-2 rounded-xl border border-sand-300 bg-[#FAF7F2]/60 text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="btn-primary w-full text-center text-xs font-semibold !py-2.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Consultation Request</span>
                    </button>
                    <p className="text-[10px] text-charcoal-500 text-center mt-1.5">
                      Frontend demonstration mode. No backend database required in this phase.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
