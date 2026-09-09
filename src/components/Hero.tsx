import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { ThreeDHeroCanvas } from './ThreeDHeroCanvas';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onViewWork: () => void;
  onHireMe: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWork, onHireMe }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-black"
    >
      {/* Background ambient red glow & subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FF2A2A]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 right-10 w-[400px] h-[400px] bg-[#FF2A2A]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Tagline Pill */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF2A2A] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
            Graphic Design • WordPress • Visual Identity • Digital Experiences
          </span>
        </motion.div>
      </div>

      {/* Main Hero Grid: Left Content, Right/Center 3D Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
        {/* Left Column: Bold Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tight leading-[1.05] text-white uppercase mb-6">
              I DESIGN{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                VISUALS
              </span>{' '}
              THAT MAKE BRANDS{' '}
              <span className="relative inline-block text-white">
                IMPOSSIBLE
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#FF2A2A]" />
              </span>{' '}
              TO IGNORE.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl leading-relaxed mb-8 font-light"
          >
            Graphic Designer & WordPress Web Designer crafting bold identities, digital experiences,
            and websites that stand out. Merging architectural discipline with cyber-minimal aesthetics.
          </motion.p>

          {/* Action CTAs with Magnetic Physics, Arrow Slide & Subtle Red Glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              id="hero-view-work-btn"
              onClick={onViewWork}
              strength={8}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-display font-bold text-sm tracking-wider uppercase hover:bg-[#FF2A2A] hover:text-white transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,42,42,0.65)] cursor-pointer"
              dataCursor="PORTFOLIO"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </MagneticButton>

            <MagneticButton
              id="hero-hire-me-btn"
              onClick={onHireMe}
              strength={8}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-white/20 hover:border-[#FF2A2A] text-white font-display font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#FF2A2A]/10 hover:shadow-[0_0_30px_rgba(255,42,42,0.3)] cursor-pointer"
              dataCursor="START"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF2A2A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
            </MagneticButton>
          </motion.div>

          {/* Micro Stat Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10 max-w-lg"
          >
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white">35+</div>
              <div className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                Bespoke Systems
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-[#FF2A2A]">0.6s</div>
              <div className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                Avg WP Speed
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white">100%</div>
              <div className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                Client Rating
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Monogram Sculpture */}
        <div className="lg:col-span-5 h-[380px] sm:h-[480px] lg:h-[580px] relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 3D Canvas with mouse tracking and red reflections */}
            <ThreeDHeroCanvas className="w-full h-full" />
          </div>

          {/* Floating contextual tag overlay */}
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded text-[10px] font-mono text-neutral-400 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#FF2A2A]" />
            <span>INTERACTIVE 3D • DRAG & HOVER</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Scroll Indicator & Availability Status */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-white/5">
        <motion.button
          onClick={onViewWork}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="group flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
          data-cursor="SCROLL"
        >
          <span className="text-[#FF2A2A]">↓</span>
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#FF2A2A]" />
        </motion.button>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-300">AVAILABLE Q1/Q2</span>
          </div>
          <span className="text-neutral-600">•</span>
          <span>BASED IN GLOBAL REMOTE</span>
        </div>
      </div>
    </section>
  );
};
