import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="process" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                Workflow Methodology
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              FROM IDEA TO IMPACT.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light">
            A battle-tested 5-stage creative process that eliminates guesswork, maintains client transparency, and guarantees remarkable results.
          </p>
        </div>

        {/* Interactive Stepped Timeline Track */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative mb-12">
          {/* Connecting Red Guide Line */}
          <div className="absolute top-6 left-12 right-12 h-0.5 bg-white/10 -z-0" />

          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left relative z-10 p-5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-neutral-900 border border-[#FF2A2A] shadow-[0_0_30px_rgba(255,42,42,0.15)]'
                    : 'bg-neutral-950/60 border border-white/5 hover:border-white/20'
                }`}
                data-cursor="STEP"
              >
                {/* Step indicator circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold mb-4 transition-colors ${
                    isActive
                      ? 'bg-[#FF2A2A] text-white'
                      : 'bg-white/10 text-neutral-400 border border-white/10'
                  }`}
                >
                  {step.step}
                </div>

                <h3 className="font-display font-bold text-lg text-white uppercase mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light line-clamp-2">
                  {step.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of the Active Step on Desktop */}
        <div className="hidden lg:block p-8 rounded-2xl bg-neutral-950 border border-white/10 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF2A2A]/5 blur-[80px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-xs font-mono text-[#FF2A2A] uppercase">
                  Stage {PROCESS_STEPS[activeStepIndex].step} // 05
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {PROCESS_STEPS[activeStepIndex].title} Phase
                </span>
              </div>

              <h3 className="text-3xl font-display font-black text-white uppercase">
                {PROCESS_STEPS[activeStepIndex].title}: {PROCESS_STEPS[activeStepIndex].summary}
              </h3>

              <p className="text-base text-neutral-300 leading-relaxed font-light">
                {PROCESS_STEPS[activeStepIndex].details}
              </p>
            </div>

            <div className="col-span-4 p-6 rounded-xl bg-black/60 border border-white/10">
              <span className="text-xs font-mono text-[#FF2A2A] uppercase tracking-wider block mb-2">
                Tangible Deliverable:
              </span>
              <p className="text-sm font-display font-bold text-white mb-4">
                {PROCESS_STEPS[activeStepIndex].deliverable}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-3 border-t border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#FF2A2A]" />
                <span>Zero guesswork • Client-synced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#FF2A2A] text-white flex items-center justify-center font-mono text-xs font-bold">
                  {step.step}
                </span>
                <h3 className="font-display font-bold text-xl text-white uppercase">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {step.details}
              </p>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs font-mono text-[#FF2A2A]">
                Deliverable: {step.deliverable}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
