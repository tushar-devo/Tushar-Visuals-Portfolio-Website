import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Palette, Globe, Layers, CheckCircle, Flame, Cpu } from 'lucide-react';
import { SKILLS_DATA, TOOLS_DATA } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'graphic' | 'wordpress' | 'digital'>('all');

  const categories = [
    {
      id: 'graphic',
      title: 'Graphic Design',
      icon: Palette,
      tagline: 'Brand Identity & Visual Direction',
      description: 'Creating unforgettable logo systems, typography lockups, and social media campaigns that command respect.',
      skills: SKILLS_DATA.graphicDesign,
      accent: 'from-red-500/20 to-transparent'
    },
    {
      id: 'wordpress',
      title: 'WordPress Mastery',
      icon: Globe,
      tagline: 'Custom Architecture & Elementor',
      description: 'High-speed, conversion-focused WordPress platforms engineered with clean code and bespoke visual styling.',
      skills: SKILLS_DATA.wordPress,
      accent: 'from-neutral-500/20 to-transparent'
    },
    {
      id: 'digital',
      title: 'Digital Experience',
      icon: Layers,
      tagline: 'UI/UX & Interactive Systems',
      description: 'Human-centered interfaces, Figma design libraries, and dynamic 3D micro-interactions that engage users.',
      skills: SKILLS_DATA.digitalDesign,
      accent: 'from-red-600/20 to-transparent'
    }
  ];

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                Technical Prowess
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              SKILLS & EXPERTISE
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light">
            A comprehensive mastery spanning vector identity systems, responsive WordPress architecture, and modern digital interfaces.
          </p>
        </div>

        {/* 3 Domain Cards with Interactive Hover Tilt & Skill Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative rounded-2xl bg-neutral-950/80 border border-white/10 p-8 transition-all duration-300 hover:border-[#FF2A2A]/50 hover:shadow-[0_0_35px_rgba(255,42,42,0.12)] flex flex-col justify-between"
                data-cursor="EXP"
              >
                {/* Accent glow on top */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF2A2A] group-hover:bg-[#FF2A2A] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white uppercase mb-1">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-mono text-[#FF2A2A] mb-4 uppercase tracking-wider">
                    {cat.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-8">
                    {cat.description}
                  </p>

                  {/* Detailed Skill Bars */}
                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-300 font-medium">{skill.name}</span>
                          <span className="text-neutral-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-[#FF2A2A] to-white rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>DEPLOYMENT: PRODUCTION</span>
                  <span className="text-[#FF2A2A]">100% TAILORED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools Arsenal Grid */}
        <div className="rounded-2xl bg-neutral-950 border border-white/10 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-4 h-4 text-[#FF2A2A]" />
            <h4 className="text-sm font-mono tracking-widest uppercase text-white">
              Primary Toolkit & Software Stack
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TOOLS_DATA.map((tool) => (
              <div
                key={tool.name}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="text-sm font-display font-bold text-white">{tool.name}</div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">{tool.category}</div>
                <div className="mt-2 inline-block px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#FF2A2A]">
                  {tool.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
