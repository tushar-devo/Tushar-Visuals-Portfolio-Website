import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ArrowRight, RotateCcw } from 'lucide-react';
import { PageView } from '../types';
import { MagneticButton } from './MagneticButton';
import logoImg from '../images/logo.jpg';

interface NavbarProps {
  activePage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
  onOpenHireModal: () => void;
  isLoaded?: boolean;
  onReload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenHireModal,
  isLoaded = true,
  onReload,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hireHovered, setHireHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageView; sectionId?: string }[] = [
    { label: 'Home', page: 'home', sectionId: 'hero' },
    { label: 'Portfolio', page: 'portfolio', sectionId: 'portfolio' },
    { label: 'Services', page: 'services', sectionId: 'services' },
    { label: 'About', page: 'about', sectionId: 'about' },
    { label: 'Resume', page: 'resume', sectionId: 'resume' },
    { label: 'Contact', page: 'contact', sectionId: 'contact' },
  ];

  const handleNavClick = (page: PageView, sectionId?: string) => {
    onNavigate(page, sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home', 'hero')}
            className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2A2A]"
            data-cursor="HOME"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black border border-white/20 p-0.5 overflow-hidden group-hover:border-[#FF2A2A] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_15px_rgba(255,42,42,0.3)]">
              <img
                src={logoImg}
                alt="Tushar Visuals Logo"
                className="w-full h-full object-contain rounded-md"
              />
              <div className="absolute -bottom-0.5 inset-x-1 h-0.5 bg-[#FF2A2A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            <div>
              <span className="block font-display font-bold tracking-widest text-sm md:text-base text-white group-hover:text-[#FF2A2A] uppercase transition-colors">
                TUSHAR VISUALS
              </span>
              <span className="hidden sm:block text-[10px] tracking-wider text-neutral-400 font-mono">
                GRAPHIC × WORDPRESS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  onClick={() => handleNavClick(item.page, item.sectionId)}
                  className={`group relative px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors rounded-full ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                  data-cursor="GOTO"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Subtle upward text movement */}
                  <span className="relative z-10 flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A]" />}
                    {item.label}
                  </span>

                  {/* Smooth red underline on hover */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-[#FF2A2A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full pointer-events-none" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Replay Button + Hire Me CTA Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {onReload && (
              <button
                type="button"
                onClick={onReload}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF2A2A]/40 text-neutral-400 hover:text-white text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer"
                title="Replay Full Reload Animation"
                data-cursor="RELOAD"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#FF2A2A]" />
                <span className="hidden xl:inline">RELOAD ANIM</span>
              </button>
            )}

            <MagneticButton
              id="nav-hire-me-btn"
              onClick={onOpenHireModal}
              onMouseEnter={() => setHireHovered(true)}
              onMouseLeave={() => setHireHovered(false)}
              strength={7}
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white text-xs md:text-sm font-semibold tracking-wider uppercase shadow-[0_0_25px_rgba(255,42,42,0.45)] hover:shadow-[0_0_35px_rgba(255,42,42,0.7)] transition-all duration-300 group overflow-hidden border border-[#ff5555]/30 cursor-pointer"
              dataCursor="HIRE ME"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="transition-all duration-300">
                  {hireHovered ? "Let's Work Together" : "Hire Me"}
                </span>
                {hireHovered ? (
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform ease-out pointer-events-none" />
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-lg border border-white/10 bg-white/5"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 bg-black/95 backdrop-blur-2xl px-6 py-8 flex flex-col justify-between border-b border-white/10 lg:hidden overflow-y-auto"
          >
            <div className="space-y-4">
              {/* Brand Header inside Mobile Drawer */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <img
                  src={logoImg}
                  alt="Tushar Visuals Logo"
                  className="w-10 h-10 object-contain rounded-lg border border-white/20 bg-neutral-950 p-1"
                />
                <div>
                  <span className="block font-display font-bold tracking-wider text-base text-white uppercase">
                    Tushar Visuals
                  </span>
                  <span className="text-[10px] tracking-wider text-[#FF2A2A] font-mono uppercase">
                    Graphic × WordPress
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                Navigation Menu
              </span>
              <div className="flex flex-col gap-2 pt-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.page, item.sectionId)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-lg font-display tracking-wider uppercase text-left transition-colors ${
                      activePage === item.page
                        ? 'bg-white/10 text-white font-bold border-l-2 border-[#FF2A2A]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHireModal();
                }}
                className="w-full py-4 rounded-full bg-[#FF2A2A] text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,42,42,0.4)]"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pt-2">
                <span>🟢 AVAILABLE FOR PROJECTS</span>
                <span>GLOBAL / REMOTE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
