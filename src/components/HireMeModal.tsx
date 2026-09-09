import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import logoImg from '../images/logo.jpg';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: preselectedService || 'WordPress Website',
    budgetRange: '$2,500 – $5,000',
    deadline: 'Within 4 Weeks',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 850);
  };

  const projectOptions = [
    'Graphic Design',
    'Website Design',
    'Brand & Print Graphics',
    'WordPress Website Design',
    'Marketing & Poster Graphics',
    'E-Commerce Website Design',
  ];

  const budgetOptions = [
    '< $2,500',
    '$2,500 – $5,000',
    '$5,000 – $10,000',
    '$10,000+',
  ];

  const timelineOptions = [
    'Urgent (< 2 weeks)',
    'Within 4 Weeks',
    '1 – 2 Months',
    'Flexible / Planning',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl bg-neutral-950 border border-white/15 p-6 sm:p-10 overflow-hidden shadow-[0_0_60px_rgba(255,42,42,0.15)] max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#FF2A2A] text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FF2A2A]/20 border border-[#FF2A2A] flex items-center justify-center text-[#FF2A2A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-black text-white uppercase">
                Project Inquiry Initiated!
              </h3>
              <p className="text-base text-neutral-300 max-w-lg mx-auto font-light leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. I have received your request for <span className="text-[#FF2A2A]">{formData.projectType}</span>. I will prepare a preliminary concept review and respond within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-8 py-3 rounded-full bg-[#FF2A2A] text-white font-display font-bold text-xs uppercase tracking-wider"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={logoImg}
                    alt="Tushar Visuals Logo"
                    className="w-9 h-9 object-contain rounded-lg border border-white/20 bg-neutral-900 p-0.5"
                  />
                  <div>
                    <span className="font-display font-bold text-xs uppercase tracking-widest text-white block">
                      Tushar Visuals
                    </span>
                    <span className="text-[9px] font-mono text-[#FF2A2A] tracking-wider uppercase block">
                      Commission Desk
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
                  <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                    Client Onboarding
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white uppercase">
                  READY TO BUILD SOMETHING BOLD?
                </h2>
                <p className="text-sm text-neutral-400 mt-2 font-light">
                  Tell me about your vision, goals, and timeline. Let's create an experience that commands respect.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF2A2A] text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400 uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="liam@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF2A2A] text-sm"
                    />
                  </div>
                </div>

                {/* Project Type selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase block">
                    What can I help you build? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, projectType: opt })}
                        className={`px-3 py-2 rounded-xl text-xs font-mono text-center border transition-all ${
                          formData.projectType === opt
                            ? 'bg-[#FF2A2A] text-white font-bold border-[#FF2A2A]'
                            : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range & Timeline Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase block">
                      Target Budget Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          className={`px-3 py-2 rounded-lg text-xs font-mono text-center border transition-all ${
                            formData.budgetRange === b
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase block">
                      Desired Delivery Window
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setFormData({ ...formData, deadline: t })}
                          className={`px-3 py-2 rounded-lg text-xs font-mono text-center border transition-all ${
                            formData.deadline === t
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400 uppercase">
                    Brief Project Overview & Goals *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe your objectives, existing assets or inspiration, and what success looks like..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF2A2A] text-sm resize-none"
                  />
                </div>

                {/* Reassurance Message */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs font-mono text-neutral-400">
                  <ShieldCheck className="w-5 h-5 text-[#FF2A2A] flex-shrink-0" />
                  <span>Clear communication. Custom design. No cookie-cutter solutions.</span>
                </div>

                {/* Primary CTA with Magnetic Physics & Arrow Slide */}
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  strength={6}
                  className="group w-full py-4 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,42,42,0.5)] hover:shadow-[0_0_45px_rgba(255,42,42,0.7)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  dataCursor="LAUNCH"
                >
                  {isSubmitting ? (
                    <span>Initiating Brief...</span>
                  ) : (
                    <>
                      <span>Start a Project</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </>
                  )}
                </MagneticButton>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
