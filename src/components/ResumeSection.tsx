import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Briefcase, GraduationCap, Award, FileText, CheckCircle2, ArrowUpRight, Eye } from 'lucide-react';
import { RESUME_EXPERIENCE, EDUCATION_DATA, CERTIFICATIONS_DATA, TOOLS_DATA } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { PdfPreviewModal } from './PdfPreviewModal';
import cvPdf from '../pdf/Tushar_CV.pdf';

interface ResumeSectionProps {
  onOpenHireModal: () => void;
  onOpenPdfPreview?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenHireModal, onOpenPdfPreview }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [internalPreviewOpen, setInternalPreviewOpen] = useState(false);

  const handleOpenPreview = () => {
    if (onOpenPdfPreview) {
      onOpenPdfPreview();
    } else {
      setInternalPreviewOpen(true);
    }
  };

  const handleDownloadCV = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    // Directly download the authentic Tushar_CV.pdf file
    const link = document.createElement('a');
    link.href = cvPdf;
    link.download = 'Tushar_CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <section id="resume" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-widest text-[#FF2A2A] uppercase">
                Curriculum Vitae
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              RESUME / CREDENTIALS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              id="download-cv-btn"
              onClick={handleDownloadCV}
              strength={7}
              className="group px-6 py-3.5 rounded-full bg-white hover:bg-[#FF2A2A] text-black hover:text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,42,42,0.5)] cursor-pointer"
              dataCursor="DOWNLOAD"
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download CV'}</span>
            </MagneticButton>

            <button
              id="preview-pdf-btn"
              type="button"
              onClick={handleOpenPreview}
              className="px-4 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF2A2A]/50 text-neutral-300 hover:text-white text-xs font-display uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(255,42,42,0.2)]"
              data-cursor="PREVIEW"
              title="Preview CV PDF as page size pop up"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span>Preview PDF</span>
            </button>
          </div>
        </div>

        {/* Profile Card Intro */}
        <div className="p-8 rounded-2xl bg-neutral-950 border border-white/10 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[#FF2A2A] uppercase tracking-widest block mb-1">
              Candidate Profile
            </span>
            <h3 className="text-2xl font-display font-bold text-white uppercase">
              Tushar Visuals — Senior Graphic & WordPress Designer
            </h3>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl font-light">
              Available for high-impact contract roles, flagship web design projects, and ongoing creative direction retainer engagements.
            </p>
          </div>

          <MagneticButton
            onClick={onOpenHireModal}
            strength={6}
            className="group px-5 py-2.5 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,42,42,0.4)] hover:shadow-[0_0_30px_rgba(255,42,42,0.6)] cursor-pointer transition-all duration-300"
            dataCursor="INTERVIEW"
          >
            <span>Book Interview / Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>

        {/* Two-Column Resume Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Experience Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <Briefcase className="w-5 h-5 text-[#FF2A2A]" />
              <h3 className="text-xl font-display font-bold text-white uppercase">
                Work Experience
              </h3>
            </div>

            <div className="space-y-8 relative pl-6 border-l border-white/10 ml-2">
              {RESUME_EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-[#FF2A2A]" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono text-[#FF2A2A]">{exp.period}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                      {exp.type}
                    </span>
                  </div>

                  <h4 className="text-lg font-display font-bold text-white uppercase">
                    {exp.role}
                  </h4>
                  <div className="text-xs font-mono text-neutral-400 mb-3">{exp.company}</div>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light mb-4">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-400 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2A2A] flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education, Certifications & Tools (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
                <GraduationCap className="w-5 h-5 text-[#FF2A2A]" />
                <h3 className="text-xl font-display font-bold text-white uppercase">
                  Education
                </h3>
              </div>

              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-neutral-950 border border-white/5">
                  <span className="text-xs font-mono text-[#FF2A2A]">{edu.year}</span>
                  <h4 className="text-base font-display font-bold text-white uppercase mt-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">{edu.institution}</p>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">{edu.honors}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
                <Award className="w-5 h-5 text-[#FF2A2A]" />
                <h3 className="text-xl font-display font-bold text-white uppercase">
                  Certifications
                </h3>
              </div>

              <div className="space-y-3">
                {CERTIFICATIONS_DATA.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-950 border border-white/5">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-display font-bold text-white uppercase">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#FF2A2A]">{cert.year}</span>
                    </div>
                    <p className="text-[11px] font-mono text-neutral-400 mt-1">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Tools Matrix */}
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
                <FileText className="w-5 h-5 text-[#FF2A2A]" />
                <h3 className="text-xl font-display font-bold text-white uppercase">
                  Core Software & Skills
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  'Adobe Photoshop',
                  'Adobe Illustrator',
                  'Figma UI/UX',
                  'WordPress Core',
                  'Elementor Pro',
                  'Tailwind CSS',
                  'WooCommerce',
                  'Three.js / 3D',
                ].map((tool) => (
                  <div
                    key={tool}
                    className="p-3 rounded-lg bg-neutral-950 border border-white/5 text-xs font-mono text-neutral-300"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal In-Site PDF Pop-Up Modal (Fallback) */}
      {!onOpenPdfPreview && (
        <PdfPreviewModal
          isOpen={internalPreviewOpen}
          onClose={() => setInternalPreviewOpen(false)}
        />
      )}
    </section>
  );
};
