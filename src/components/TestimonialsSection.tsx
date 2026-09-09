import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                Client Proof & Trust
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              KIND WORDS FROM CLIENTS.
            </h2>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF2A2A] hover:border-[#FF2A2A] transition-colors"
              aria-label="Previous Testimonial"
              data-cursor="PREV"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF2A2A] hover:border-[#FF2A2A] transition-colors"
              aria-label="Next Testimonial"
              data-cursor="NEXT"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Carousel Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Large Active Quote */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-2xl bg-neutral-950 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="absolute top-6 right-6 text-white/5">
              <Quote className="w-24 h-24" />
            </div>

            <div>
              {/* Rating Stars & Project Type */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF2A2A] text-[#FF2A2A]" />
                  ))}
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-mono text-neutral-400 border border-white/10 uppercase">
                  {TESTIMONIALS[currentIndex].projectType}
                </span>
              </div>

              {/* Bold Highlight statement */}
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 leading-snug">
                "{TESTIMONIALS[currentIndex].highlight}"
              </h3>

              {/* Detailed Quote */}
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light mb-8">
                {TESTIMONIALS[currentIndex].content}
              </p>
            </div>

            {/* Author Attribution */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <img
                src={TESTIMONIALS[currentIndex].avatar}
                alt={TESTIMONIALS[currentIndex].name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />
              <div>
                <h4 className="text-base font-display font-bold text-white uppercase">
                  {TESTIMONIALS[currentIndex].name}
                </h4>
                <p className="text-xs font-mono text-[#FF2A2A]">
                  {TESTIMONIALS[currentIndex].role} — {TESTIMONIALS[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Quick List / Mini Thumbnails */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`text-left p-4 rounded-xl transition-all duration-300 border flex items-center gap-4 ${
                  currentIndex === idx
                    ? 'bg-neutral-900 border-[#FF2A2A] shadow-[0_0_20px_rgba(255,42,42,0.2)]'
                    : 'bg-neutral-950/60 border-white/5 hover:border-white/20'
                }`}
                data-cursor="SELECT"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-sm font-display font-bold text-white truncate">
                    {t.name}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 truncate">
                    {t.company}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
