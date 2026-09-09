import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import cvPdf from '../pdf/Tushar_CV.pdf';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  fileName?: string;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl = cvPdf,
  fileName = 'Tushar_CV.pdf',
}) => {
  const [downloaded, setDownloaded] = useState(false);

  // Lock body scroll while preview modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="pdf-preview-backdrop"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6"
      >
        <motion.div
          id="pdf-preview-modal-container"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl h-[92vh] max-h-[1050px] rounded-2xl sm:rounded-3xl bg-neutral-950 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-neutral-900/90 backdrop-blur-md border-b border-white/10 flex-shrink-0">
            {/* Document Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#FF2A2A]/15 border border-[#FF2A2A]/40 flex items-center justify-center text-[#FF2A2A] flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm sm:text-base text-white tracking-wide truncate">
                    {fileName}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                    PDF Document
                  </span>
                </div>
                <span className="hidden sm:block text-[11px] text-neutral-400 font-mono">
                  Tushar Visuals — Official Curriculum Vitae
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                id="pdf-modal-download-btn"
                onClick={handleDownload}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#FF2A2A] hover:bg-[#ff1515] text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(255,42,42,0.35)]"
                data-cursor="DOWNLOAD"
                title="Download CV"
              >
                {downloaded ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>Download</span>
                  </>
                )}
              </button>

              <a
                id="pdf-modal-open-tab-btn"
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-display uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Open in new browser tab"
                data-cursor="OPEN"
              >
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden md:inline">Full Tab</span>
              </a>

              <button
                id="pdf-modal-close-btn"
                onClick={onClose}
                className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/10 hover:bg-[#FF2A2A] text-white text-xs font-display uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer group"
                title="Close preview (Esc)"
                data-cursor="CLOSE"
              >
                <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
                <span className="hidden sm:inline font-mono">Close</span>
              </button>
            </div>
          </div>

          {/* PDF Viewport (Standard Page Format) */}
          <div className="relative flex-1 w-full h-full bg-neutral-950 overflow-hidden flex flex-col items-center justify-center">
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
              type="application/pdf"
              className="w-full h-full border-0 bg-neutral-900"
            >
              <iframe
                id="pdf-preview-iframe"
                src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                title="Curriculum Vitae PDF Preview"
                className="w-full h-full border-0 bg-neutral-900"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white">
                  <FileText className="w-12 h-12 text-[#FF2A2A] mb-4" />
                  <h4 className="text-lg font-display font-bold mb-2">Tushar Visuals CV Document</h4>
                  <p className="text-neutral-400 text-sm max-w-md mb-6">
                    Direct in-browser embedding is not supported by your current browser environment.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="px-6 py-2.5 rounded-full bg-[#FF2A2A] text-white font-display text-xs uppercase tracking-wider font-bold cursor-pointer"
                    >
                      Download CV PDF
                    </button>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-white/10 text-white font-display text-xs uppercase tracking-wider"
                    >
                      Open in New Tab
                    </a>
                  </div>
                </div>
              </iframe>
            </object>
          </div>

          {/* Footer Helper Note */}
          <div className="px-4 sm:px-6 py-2 bg-neutral-900/90 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span className="truncate">
              Viewing in-site PDF page preview • Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">Esc</kbd> to close
            </span>
            <button
              onClick={handleDownload}
              className="text-[#FF2A2A] hover:underline flex-shrink-0 cursor-pointer ml-3 font-bold"
            >
              Direct Download ↓
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
