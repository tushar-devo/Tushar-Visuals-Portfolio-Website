import React from 'react';
import { ArrowUpRight, ArrowUp, Globe, Instagram, Linkedin, Palette, Share2 } from 'lucide-react';
import { PageView } from '../types';
import { MagneticButton } from './MagneticButton';
import logoImg from '../images/logo.jpg';

interface FooterProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
  onOpenHireModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenHireModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; page: PageView; sectionId: string }[] = [
    { label: 'Home', page: 'home', sectionId: 'hero' },
    { label: 'Portfolio', page: 'portfolio', sectionId: 'portfolio' },
    { label: 'Services', page: 'services', sectionId: 'services' },
    { label: 'About', page: 'about', sectionId: 'about' },
    { label: 'Resume', page: 'resume', sectionId: 'resume' },
    { label: 'Contact', page: 'contact', sectionId: 'contact' },
  ];

  const socialLinks = [
    { name: 'Behance', url: 'https://behance.net', icon: Palette },
    { name: 'Dribbble', url: 'https://dribbble.com', icon: Globe },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
    { name: 'Twitter / X', url: 'https://x.com', icon: Share2 },
  ];

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      {/* Background subtle crimson ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#FF2A2A]/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top CTA Row with Magnetic Effect, Animated Underline & Arrow Slide */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-16 border-b border-white/10 gap-8">
          <div className="group/cta inline-block cursor-pointer" onClick={onOpenHireModal}>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF2A2A] block mb-2">
              Next-Generation Collaborations
            </span>
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                Have a project in mind?
              </h2>
              {/* Animated Red Underline */}
              <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#FF2A2A] scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-400 ease-out origin-left rounded-full" />
            </div>
          </div>

          <MagneticButton
            id="footer-cta-btn"
            onClick={onOpenHireModal}
            strength={9}
            className="group px-8 py-4 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_35px_rgba(255,42,42,0.4)] hover:shadow-[0_0_50px_rgba(255,42,42,0.7)] transition-all duration-300 cursor-pointer"
            dataCursor="LET'S TALK"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
          </MagneticButton>
        </div>

        {/* Middle Navigation & Social Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/10">
          {/* Brand & Tagline */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-black border border-white/20 p-1 overflow-hidden shadow-[0_0_20px_rgba(255,42,42,0.2)] flex-shrink-0">
                <img
                  src={logoImg}
                  alt="Tushar Visuals Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <div className="text-2xl font-display font-black tracking-widest text-white uppercase">
                  TUSHAR VISUALS
                </div>
                <span className="text-[10px] tracking-wider text-[#FF2A2A] font-mono uppercase block">
                  Graphic × WordPress Studio
                </span>
              </div>
            </div>
            <p className="text-base text-neutral-300 font-light max-w-sm">
              Designing visuals. Building experiences.
            </p>
            <p className="text-xs font-mono text-neutral-500 max-w-xs">
              Graphic Design • Custom WordPress Architecture • Brand Identity Systems • Digital Impact.
            </p>
          </div>

          {/* Nav Links with hover underline & slight upward motion */}
          <div className="md:col-span-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF2A2A] block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.page, item.sectionId)}
                    className="group relative inline-flex items-center text-sm text-neutral-400 hover:text-white transition-all duration-300 font-display uppercase tracking-wider hover:-translate-y-0.5"
                  >
                    <span>{item.label}</span>
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#FF2A2A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence with subtle lift & red highlight */}
          <div className="md:col-span-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF2A2A] block mb-4">
              Connect / Social
            </span>
            <div className="space-y-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF2A2A]/50 hover:bg-[#FF2A2A]/10 text-neutral-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,42,42,0.2)]"
                    data-cursor="SOCIAL"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-[#FF2A2A] transition-colors duration-300">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-display uppercase tracking-wider font-semibold">
                        {item.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#FF2A2A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Giant Monolithic Brand Wordmark */}
        <div className="pt-12 pb-8 overflow-hidden select-none">
          <div className="font-syne font-black text-center text-4xl sm:text-7xl md:text-8xl lg:text-[112px] tracking-tighter text-white/[0.08] hover:text-white/[0.14] transition-colors duration-400 uppercase whitespace-nowrap">
            TUSHAR VISUALS
          </div>
        </div>

        {/* Bottom Copyright & Back to Top with arrow animation */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 Tushar Visuals. All Rights Reserved. Crafted with Graphic & WordPress Precision.
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-all duration-300 uppercase cursor-pointer hover:-translate-y-0.5"
            data-cursor="TOP"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF2A2A] group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};
