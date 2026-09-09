import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowUpRight, CheckCircle2, Award, Calendar, User, Tag, Maximize2, Layers } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenHireModal: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onOpenHireModal,
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Lock body scroll while modal or lightbox is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  // Find next project in the list for navigation
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex flex-col justify-start">
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              Case Study / {project.category}
            </span>
          </div>

          <button
            id="close-case-study-btn"
            onClick={onClose}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#FF2A2A] text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer"
            data-cursor="CLOSE"
          >
            <span>Close</span>
            <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Modal Main Content Container */}
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto w-full px-6 md:px-12 py-12 pb-24"
        >
          {/* Top Title & Metadata */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-xs font-mono text-[#FF2A2A] uppercase tracking-widest font-semibold">
                {project.category}
              </span>
              {project.mockupType && (
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A]" />
                  {project.mockupType}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
                Year: {project.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
                Client: {project.client}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300 font-light max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* Full-Width Featured Hero Visual / Primary Mockup */}
          <div
            onClick={() => setLightboxImage(project.featuredImage)}
            className="group relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-pointer"
          >
            <img
              src={project.featuredImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Mockup Overlay Indicator */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#FF2A2A]" />
                <span>Primary Visual Mockup</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FF2A2A] text-white text-xs font-mono flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,42,42,0.5)]">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Click to Expand</span>
              </span>
            </div>
          </div>

          {/* Key Metrics / Results Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-2xl bg-neutral-950 border border-white/10 mb-16 shadow-[0_0_30px_rgba(255,42,42,0.06)]">
            {project.results.map((metric, i) => (
              <div key={i} className="flex flex-col border-b sm:border-b-0 sm:border-r border-white/10 last:border-0 pb-4 sm:pb-0">
                <span className="text-3xl sm:text-4xl font-display font-black text-white">
                  {metric.value}
                </span>
                <span className="text-xs font-mono text-[#FF2A2A] uppercase tracking-wider mt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Detailed Editorial Sections */}
          <div className="space-y-16">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/10">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FF2A2A] tracking-widest uppercase block mb-1">
                  01 / Brief
                </span>
                <h3 className="text-xl font-display font-bold text-white uppercase">Project Overview</h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-base text-neutral-300 leading-relaxed font-light">
                  {project.overview}
                </p>
              </div>
            </div>

            {/* Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/10">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FF2A2A] tracking-widest uppercase block mb-1">
                  02 / Friction
                </span>
                <h3 className="text-xl font-display font-bold text-white uppercase">The Challenge</h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-base text-neutral-300 leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>
            </div>

            {/* Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/10">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FF2A2A] tracking-widest uppercase block mb-1">
                  03 / Architecture
                </span>
                <h3 className="text-xl font-display font-bold text-white uppercase">Creative Strategy</h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-base text-neutral-300 leading-relaxed font-light">
                  {project.strategy}
                </p>
              </div>
            </div>

            {/* Process Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/10">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FF2A2A] tracking-widest uppercase block mb-1">
                  04 / Execution
                </span>
                <h3 className="text-xl font-display font-bold text-white uppercase">Design Process</h3>
              </div>
              <div className="md:col-span-8">
                <div className="space-y-4">
                  {project.process.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF2A2A] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300 font-light">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final Solution */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/10">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FF2A2A] tracking-widest uppercase block mb-1">
                  05 / Outcome
                </span>
                <h3 className="text-xl font-display font-bold text-white uppercase">Final Solution</h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-base text-neutral-300 leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* High-Resolution Mockup Showcase Gallery */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                <div>
                  <span className="text-xs font-mono text-[#FF2A2A] tracking-widest uppercase block mb-1">
                    06 / Visual Mockups
                  </span>
                  <h3 className="text-xl font-display font-bold text-white uppercase">
                    High-Resolution Mockup Showcase
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  Click any mockup to inspect in full-resolution
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxImage(imgUrl)}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 bg-neutral-900 cursor-pointer shadow-lg"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} mockup ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-4 py-2 rounded-full bg-[#FF2A2A] text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,42,42,0.6)]">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Mockup</span>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                      Mockup {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Used */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 mr-2">Focus Disciplines:</span>
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Next Project & Inquiry CTA Navigation Footer */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => {
                onClose();
                onOpenHireModal();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,42,42,0.4)]"
            >
              <span>Commission Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Next Project Trigger */}
            <button
              onClick={() => onSelectProject(nextProject)}
              className="w-full sm:w-auto group flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display text-xs uppercase tracking-wider transition-colors cursor-pointer"
              data-cursor="NEXT"
            >
              <div className="text-right">
                <span className="block text-[10px] text-neutral-400 font-mono">Next Case Study</span>
                <span className="font-bold text-white group-hover:text-[#FF2A2A] transition-colors">
                  {nextProject.title} →
                </span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* High-Resolution Mockup Lightbox Modal */}
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <div className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3 text-neutral-400 text-xs font-mono">
                <span className="flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
                  Full Resolution Visual Mockup Inspection
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(null);
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#FF2A2A] text-white flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Fullscreen</span>
                </button>
              </div>
              <img
                src={lightboxImage}
                alt="High-resolution mockup preview"
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto max-w-full rounded-xl border border-white/20 shadow-2xl object-contain"
              />
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
