import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../images/logo.jpg';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING STUDIO PIPELINE...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'MOUNTING 3D SHADERS & LIGHTING RIG...' },
      { at: 40, text: 'CALIBRATING GRAPHIC & WORDPRESS NODES...' },
      { at: 70, text: 'SYNCHRONIZING INTERACTION PHYSICS...' },
      { at: 92, text: 'PREPARING SPATIAL INTERFACES...' },
      { at: 100, text: 'SYSTEM READY // WELCOME TO TUSHAR VISUALS' },
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Faster progression curve that feels responsive and high-tech
      const step = Math.floor(Math.random() * 8) + 4;
      currentProgress = Math.min(currentProgress + step, 100);
      setProgress(currentProgress);

      const matching = [...statuses].reverse().find((s) => currentProgress >= s.at);
      if (matching) {
        setStatusText(matching.text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 750); // allow exit curtain animation
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader-curtain"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Subtle background tech grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          
          {/* Ambient red center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF2A2A]/12 blur-[150px] rounded-full pointer-events-none" />

          {/* Top Bar: Brand Identifier & Telemetry */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A2A] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                TUSHAR VISUALS // ARCHITECTURAL STUDIO
              </span>
            </div>
            <div className="hidden sm:block text-xs font-mono text-neutral-500 uppercase tracking-wider">
              RELOAD SEQUENCE • 2026
            </div>
          </div>

          {/* Center Content: Monogram Icon with Pulse Ring & Digital Percentage */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
            {/* Logo Badge with Dual Orbiting Rings */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed border-[#FF2A2A]/40"
              />
              {/* Inner counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/20"
              />
              {/* Logo Core */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-[#FF2A2A] shadow-[0_0_30px_rgba(255,42,42,0.5)] relative z-10 bg-black">
                <img
                  src={logoImg}
                  alt="Tushar Visuals"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Giant Monospace Numeric Counter */}
            <div className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-tighter text-white uppercase mb-4 flex items-baseline justify-center">
              <span>{progress.toString().padStart(2, '0')}</span>
              <span className="text-2xl sm:text-4xl text-[#FF2A2A] ml-2 font-mono font-normal">
                %
              </span>
            </div>

            {/* Live Changing Status Line */}
            <motion.div
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-neutral-300 uppercase h-6"
            >
              {statusText}
            </motion.div>
          </div>

          {/* Bottom Bar: Laser Red Progress Bar & Calibration Note */}
          <div className="relative z-10 w-full max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>BOOT SEQUENCE</span>
              <span>{progress === 100 ? 'AUTHENTICATED' : 'SYNCHRONIZING...'}</span>
            </div>

            {/* Full-width laser bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF2A2A] via-white to-[#FF2A2A] shadow-[0_0_15px_rgba(255,42,42,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1">
              <span>EST. 2021 — 2026</span>
              <span>ALL VISUAL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
