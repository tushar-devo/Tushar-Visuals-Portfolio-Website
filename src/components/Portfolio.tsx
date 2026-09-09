import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Project, PortfolioCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

interface PortfolioProps {
  onSelectProject: (project: Project) => void;
  onOpenHireModal: () => void;
}

interface PortfolioCardProps {
  project: Project;
  colSpanClass: string;
  index: number;
  onSelectProject: (project: Project) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  colSpanClass,
  index,
  onSelectProject,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt motion values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  // Subtle parallax motion values for image
  const rawImageX = useMotionValue(0);
  const rawImageY = useMotionValue(0);

  // Smooth cinematic spring configs (settles cleanly within 300-400ms)
  const springConfig = { damping: 24, stiffness: 260, mass: 0.25 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const imageX = useSpring(rawImageX, springConfig);
  const imageY = useSpring(rawImageY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    // Subtle 3D tilt: max 5 degrees
    rawRotateX.set(-normY * 5);
    rawRotateY.set(normX * 5);

    // Subtle parallax counter-shift: max 5px
    rawImageX.set(-normX * 5);
    rawImageY.set(-normY * 5);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawImageX.set(0);
    rawImageY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`${colSpanClass} group relative cursor-pointer`}
      onClick={() => onSelectProject(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
      }}
      data-cursor="VIEW"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 transition-colors duration-400 group-hover:border-[#FF2A2A]/60 group-hover:shadow-[0_12px_45px_rgba(255,42,42,0.18)] flex flex-col h-full"
      >
        {/* Thumbnail Image Container with Zoom & Subtle Parallax */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
          <motion.div
            style={{
              x: imageX,
              y: imageY,
            }}
            className="w-full h-full"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106 filter brightness-95 contrast-105"
              loading="lazy"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#FF2A2A] uppercase font-semibold">
                {project.category}
              </span>
              {project.mockupType && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A]" />
                  {project.mockupType}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#FF2A2A]" />
                <span>{project.gallery.length} Mockups</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-400">
                {project.year}
              </span>
            </div>
          </div>

          {/* Central "VIEW PROJECT ↗" Reveal Badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="px-5 py-2.5 rounded-full bg-[#FF2A2A] text-white font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(255,42,42,0.65)] flex items-center gap-2 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350 ease-out border border-white/20">
              <span>View High-Res Mockups</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Floating View CTA Icon Button (Bottom Right) */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-[#FF2A2A] group-hover:border-[#FF2A2A] flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 z-10">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Meta Card Info */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
              <span>{project.client}</span>
              <span>•</span>
              <span className="text-neutral-300">{project.subtitle}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#FF2A2A] transition-colors duration-300 mb-2">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2 font-light">
              {project.shortDescription}
            </p>
          </div>

          {/* Tags & Action Button */}
          <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-400 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-white group-hover:text-[#FF2A2A] transition-colors duration-300">
              <span>Inspect Mockups</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject, onOpenHireModal }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');

  const categories: PortfolioCategory[] = [
    'All',
    'Graphic Design',
    'Website Design',
  ];

  const getCategoryCount = (cat: PortfolioCategory) => {
    if (cat === 'All') return PROJECTS.length;
    return PROJECTS.filter((p) => p.category === cat).length;
  };

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FF2A2A]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FF2A2A]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                Visual Showcase
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              SELECTED WORK
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light">
            Curated high-resolution graphic design collateral, print mockups, and high-conversion responsive website designs.
          </p>
        </div>

        {/* Category Filters - Strictly Graphic Design & Website Design */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-white/10 pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'text-black bg-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'text-neutral-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20'
                }`}
                data-cursor="FILTER"
              >
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF2A2A]" />
                )}
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-black/20 text-black font-mono'
                      : 'bg-white/10 text-neutral-400 font-mono'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Curated Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Asymmetric span: 1st & 4th are large 8 cols, others 4 or 6 cols
              const isWide = index % 3 === 0;
              const colSpanClass = isWide
                ? 'md:col-span-8'
                : index % 3 === 1
                ? 'md:col-span-4'
                : 'md:col-span-12 lg:col-span-6';

              return (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  colSpanClass={colSpanClass}
                  index={index}
                  onSelectProject={onSelectProject}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner to Hire for a Custom Project */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-[#FF2A2A] flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-white uppercase">
                Need a tailored identity or high-performance website?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                Currently booking select design and development projects for the upcoming quarter.
              </p>
            </div>
          </div>

          <MagneticButton
            id="portfolio-cta-inquire-btn"
            onClick={onOpenHireModal}
            strength={8}
            className="px-6 py-3 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white text-xs font-display font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(255,42,42,0.4)] hover:shadow-[0_0_35px_rgba(255,42,42,0.65)] whitespace-nowrap cursor-pointer transition-all duration-300"
            dataCursor="INQUIRE"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
