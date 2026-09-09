import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Terminal, ShieldCheck, HeartHandshake, Compass, Download, Eye } from 'lucide-react';
import logoImg from '../images/logo.jpg';
import cvPdf from '../pdf/Tushar_CV.pdf';

interface AboutSectionProps {
  onOpenHireModal: () => void;
  onOpenResume: () => void;
  onOpenPdfPreview?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenHireModal, onOpenResume, onOpenPdfPreview }) => {
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setCardMousePos({ x, y });
  };

  const principles = [
    { title: 'Obsessive Simplicity', desc: 'Removing everything superfluous until only visceral brand essence remains.' },
    { title: 'Architectural Grids', desc: 'Swiss typographic rigor merged with cyberpunk aesthetic discipline.' },
    { title: 'Sub-Second Speed', desc: 'No bloated code. WordPress engineering optimized down to millisecond loads.' },
  ];

  return (
    <section id="about" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
          <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
            Creative Philosophy
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase max-w-5xl leading-[1.1] mb-16">
          "DESIGN ISN'T JUST WHAT I MAKE.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-neutral-400">
            IT'S HOW I THINK."
          </span>
        </h2>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Background */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl text-neutral-200 leading-relaxed font-light">
              I’m <strong className="text-white font-semibold">Tushar</strong>, a multidisciplinary graphic designer and WordPress web designer focused on creating bold visual identities and digital experiences that connect brands with people.
            </p>

            <p className="text-base text-neutral-400 leading-relaxed font-light">
              Operating at the intersection of branding, editorial aesthetics, and high-performance web engineering, I believe that great design doesn't just decorate—it commands authority, builds emotional trust, and accelerates business growth.
            </p>

            {/* Core Capability Chips */}
            <div className="pt-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
                Disciplines & Craft Focus:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Graphic Design',
                  'Brand Identity',
                  'Logo Design',
                  'Social Media Design',
                  'UI/UX Design',
                  'WordPress Website Design',
                  'Landing Pages',
                  'Website Redesign',
                  'Creative Direction',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 hover:border-[#FF2A2A]/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 Core Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {principles.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-neutral-950/80 border border-white/5">
                  <div className="text-xs font-mono text-[#FF2A2A] mb-1">0{idx + 1} //</div>
                  <h4 className="text-sm font-display font-bold text-white mb-1">{p.title}</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenHireModal}
                className="px-6 py-3 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,42,42,0.35)] cursor-pointer transition-all duration-300"
                data-cursor="LET'S TALK"
              >
                <span>Work With Tushar</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href={cvPdf}
                download="Tushar_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF2A2A]/40 text-white text-xs font-display uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                data-cursor="DOWNLOAD"
              >
                <Download className="w-3.5 h-3.5 text-[#FF2A2A]" />
                <span>Download CV</span>
              </a>
              {onOpenPdfPreview && (
                <button
                  type="button"
                  onClick={onOpenPdfPreview}
                  className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF2A2A]/50 text-neutral-300 hover:text-white text-xs font-display uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                  data-cursor="PREVIEW"
                  title="Preview CV PDF as pop up"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FF2A2A]" />
                  <span>Preview PDF</span>
                </button>
              )}
              <button
                onClick={onOpenResume}
                className="px-5 py-3 rounded-full bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white text-xs font-display uppercase tracking-wider transition-colors cursor-pointer"
                data-cursor="CREDENTIALS"
              >
                <span>View Credentials</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Profile Artifact Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent transition-transform duration-200 ease-out cursor-pointer"
              style={{
                perspective: 1000,
                transform: isHovered
                  ? `rotateY(${cardMousePos.x}deg) rotateX(${cardMousePos.y}deg) scale3d(1.02, 1.02, 1.02)`
                  : 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setCardMousePos({ x: 0, y: 0 });
              }}
              data-cursor="CREATIVE"
            >
              <div className="w-full h-full rounded-[22px] bg-neutral-950 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                {/* Background red glow accent */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF2A2A]/20 blur-[60px] rounded-full pointer-events-none" />

                {/* Top Info */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                      STUDIO STATUS: ACTIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">ID: TV-2026</span>
                </div>

                {/* Center Official Brand Logo Frame */}
                <div className="my-auto text-center z-10 py-6">
                  <div className="relative w-28 h-28 mx-auto rounded-2xl bg-black border border-white/20 flex items-center justify-center overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-2">
                    <img
                      src={logoImg}
                      alt="Tushar Visuals Official Logo"
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-[#FF2A2A]" />
                  </div>

                  <h3 className="mt-4 font-display font-black text-2xl text-white uppercase tracking-tight">
                    TUSHAR VISUALS
                  </h3>
                  <p className="text-xs font-mono text-[#FF2A2A] tracking-wider uppercase mt-1">
                    Graphic Design × WordPress
                  </p>
                </div>

                {/* Bottom Stats Matrix */}
                <div className="z-10 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Focus</span>
                    <span className="text-xs font-semibold text-white font-display">Identity & Web</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Execution</span>
                    <span className="text-xs font-semibold text-white font-display">Zero Templates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
