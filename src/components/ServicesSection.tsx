import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onOpenHireModal: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenHireModal }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  return (
    <section id="services" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#FF2A2A]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                Studio Capabilities
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              WHAT I CAN BUILD FOR YOU.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light">
            End-to-end design and web engineering packages tailored to elevate venture-backed founders and forward-thinking brands.
          </p>
        </div>

        {/* Services List / Accordion-style Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const isSelected = activeServiceId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`group relative rounded-2xl p-8 transition-all duration-350 ease-out flex flex-col justify-between cursor-pointer border overflow-hidden transform hover:-translate-y-2 ${
                  isSelected
                    ? 'bg-neutral-950 border-[#FF2A2A]/60 shadow-[0_12px_40px_rgba(255,42,42,0.18)]'
                    : 'bg-neutral-950/60 border-white/10 hover:border-[#FF2A2A]/40 hover:bg-neutral-950 hover:shadow-[0_12px_35px_rgba(255,42,42,0.14)]'
                }`}
                data-cursor="SERVICE"
              >
                {/* Expanding Red Accent Line across the top on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2A2A] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out origin-center rounded-t-2xl pointer-events-none" />

                <div>
                  {/* Service Number & Status with subtle spacing expansion */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[#FF2A2A] font-bold group-hover:tracking-wider transition-all duration-300">
                      {service.number} //
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase group-hover:text-neutral-300 transition-colors">
                      READY TO SHIP
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white uppercase mb-2 group-hover:text-[#FF2A2A] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-xs font-mono text-neutral-400 mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist with subtle icon animation */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      Key Deliverables:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 font-light group/item">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2A2A] flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="transition-colors duration-200 group-hover/item:text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action with arrow slide and subtle red glow */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {service.tools.slice(0, 2).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-neutral-400 group-hover:border-white/15 border border-transparent transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenHireModal(service.title);
                    }}
                    className="group/btn inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-white hover:text-[#FF2A2A] transition-colors duration-300"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FF2A2A] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300 ease-out" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
