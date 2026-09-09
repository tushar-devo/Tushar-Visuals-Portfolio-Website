import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Clock, ArrowRight, ArrowUpRight, CheckCircle, Send, Globe, MessageSquare } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Brand Identity',
    budget: '$2,500 – $5,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const projectTypes = [
    'Brand Identity',
    'Graphic Design',
    'WordPress Website',
    'Landing Page',
    'UI/UX Design',
    'Website Redesign',
  ];

  const budgetRanges = [
    '$1,500 – $2,500',
    '$2,500 – $5,000',
    '$5,000 – $10,000',
    '$10,000+',
  ];

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5 overflow-hidden">
      {/* Red ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#FF2A2A]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                Initiate Collaboration
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              LET'S CREATE SOMETHING GREAT.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light">
            Have a project, idea, or collaboration in mind? Let's turn it into something people remember.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Studio Information & Status (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-neutral-950 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                  STATUS: CURRENTLY BOOKING PROJECTS
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                Whether you need a flagship WordPress website, a complete brand overhaul, or conversion-focused graphics, I respond to all serious inquiries within 24 hours.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF2A2A] mt-1" />
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                      Direct Inquiries
                    </span>
                    <a
                      href="mailto:hello@tusharvisuals.com"
                      className="text-sm font-mono text-white hover:text-[#FF2A2A] transition-colors"
                    >
                      hello@tusharvisuals.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF2A2A] mt-1" />
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                      Location / Timezone
                    </span>
                    <span className="text-sm font-mono text-neutral-300">
                      Worldwide Remote • Flexible UTC / EST / CET
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF2A2A] mt-1" />
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                      Response Time
                    </span>
                    <span className="text-sm font-mono text-neutral-300">
                      Within 24 Hours Guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels Pill Box with Subtle Lift & Red Highlight */}
            <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/5">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-4">
                Explore Creative Feeds:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Behance', 'Dribbble', 'LinkedIn', 'Instagram', 'Twitter / X'].map((platform) => (
                  <span
                    key={platform}
                    className="group px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#FF2A2A]/15 hover:border-[#FF2A2A]/50 text-xs font-mono text-neutral-300 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,42,42,0.25)] cursor-pointer border border-white/10 flex items-center gap-1.5"
                    data-cursor="SOCIAL"
                  >
                    <span>{platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FF2A2A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-neutral-950 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.7)]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FF2A2A]/20 border border-[#FF2A2A] flex items-center justify-center text-[#FF2A2A]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase">
                  Message Received!
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you for reaching out to Tushar Visuals. I will review your project requirements and get back to you with next steps within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      projectType: 'Brand Identity',
                      budget: '$2,500 – $5,000',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-white/10 text-xs font-mono text-white uppercase tracking-wider hover:bg-white/20 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF2A2A] text-sm transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Your Email *
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF2A2A] text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Company / Brand Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Company / Organization
                  </label>
                  <input
                    id="contact-company-input"
                    type="text"
                    placeholder="e.g. Apex Robotics Labs"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF2A2A] text-sm transition-colors"
                  />
                </div>

                {/* Project Type Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors border ${
                            isSelected
                              ? 'bg-[#FF2A2A]/15 border-[#FF2A2A] text-white font-medium'
                              : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetRanges.map((range) => {
                      const isSelected = formData.budget === range;
                      return (
                        <button
                          type="button"
                          key={range}
                          onClick={() => setFormData({ ...formData, budget: range })}
                          className={`px-3 py-2 rounded-lg text-xs font-mono text-center transition-colors border ${
                            isSelected
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Project Details & Goals *
                  </label>
                  <textarea
                    id="contact-message-input"
                    required
                    rows={4}
                    placeholder="Tell me about your brand, current bottlenecks, desired timeline, and key deliverables..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF2A2A] text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit CTA with Magnetic Physics, Arrow Slide & Subtle Red Glow */}
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                  strength={6}
                  className="group w-full py-4 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,42,42,0.4)] hover:shadow-[0_0_45px_rgba(255,42,42,0.65)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  dataCursor="SUBMIT"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </>
                  )}
                </MagneticButton>

                <p className="text-[11px] font-mono text-neutral-500 text-center">
                  Protected by privacy agreement. Your email will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
