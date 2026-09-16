import React from 'react';
import { motion } from 'motion/react';
import { Eye, Crosshair, Compass, Code2, Gauge, MessageSquare, ArrowUpRight } from 'lucide-react';
import { WHY_WORK_WITH_ME } from '../data/portfolioData';
import { ThreeDWaveCanvas } from './ThreeDWaveCanvas';

const iconMap: Record<string, React.ElementType> = {
  Eye,
  Crosshair,
  Compass,
  Code2,
  Gauge,
  MessageSquare,
};

interface WhyProps {
  onOpenHireModal: () => void;
}

export const WhyWorkWithMe: React.FC<WhyProps> = ({ onOpenHireModal }) => {
  return (
    <section className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5 overflow-hidden">
      {/* Interactive 3D Cyber-Wave Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ThreeDWaveCanvas className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                The Standard
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              WHY TUSHAR VISUALS?
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light">
            Why high-growth founders and creative directors choose Tushar Visuals over generic agencies and templated freelancers.
          </p>
        </motion.div>

        {/* 6 Interactive Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_WORK_WITH_ME.map((item, idx) => {
            const Icon = iconMap[item.icon] || Eye;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 rounded-2xl bg-neutral-950/70 border border-white/10 hover:border-[#FF2A2A]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,42,42,0.1)] flex flex-col justify-between"
                data-cursor="VALUE"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF2A2A] group-hover:bg-[#FF2A2A] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white uppercase mb-3 group-hover:text-[#FF2A2A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>GUARANTEED QUALITY</span>
                  <span className="text-white group-hover:text-[#FF2A2A] transition-colors">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-neutral-400"
        >
          <span className="text-[#FF2A2A] font-bold">COMMITMENT //</span>
          <span>Clear communication. Custom design. No cookie-cutter solutions.</span>
          <button
            onClick={onOpenHireModal}
            className="text-white hover:text-[#FF2A2A] underline font-bold uppercase cursor-pointer"
          >
            Start a Conversation →
          </button>
        </motion.div>
      </div>
    </section>
  );
};
