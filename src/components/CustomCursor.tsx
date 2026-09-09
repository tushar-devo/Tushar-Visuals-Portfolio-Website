import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(true);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 420, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if (typeof window !== 'undefined') {
      const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(touchCheck);
      if (touchCheck) return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for data-cursor attribute or interactive tags
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
        setIsPointer(false);
      } else {
        const clickable = target.closest('button, a, input, select, textarea, [role="button"]');
        if (clickable) {
          setIsPointer(true);
          setIsHovered(false);
          setCursorText('');
        } else {
          setIsPointer(false);
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  // Calculate proportional, small, elegant dimensions
  const getDimensions = () => {
    if (isHovered && cursorText) {
      // Small, compact, refined pill: 22px height, proportional width
      const charCount = cursorText.length;
      const calculatedWidth = Math.max(32, Math.min(64, charCount * 6.5 + 14));
      return {
        width: calculatedWidth,
        height: 22,
        borderRadius: 9999,
      };
    }
    if (isHovered) {
      return {
        width: 22,
        height: 22,
        borderRadius: 9999,
      };
    }
    if (isPointer) {
      return {
        width: 20,
        height: 20,
        borderRadius: 9999,
      };
    }
    // Default resting dot: subtle 7px
    return {
      width: 7,
      height: 7,
      borderRadius: 9999,
    };
  };

  const dims = getDimensions();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Subtle cursor follow element */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: dims.width,
          height: dims.height,
          borderRadius: dims.borderRadius,
          backgroundColor: isHovered
            ? 'rgba(255, 42, 42, 0.92)'
            : isPointer
            ? 'rgba(255, 42, 42, 0.12)'
            : 'rgba(255, 42, 42, 0.95)',
          borderColor: isHovered
            ? 'rgba(255, 255, 255, 0.3)'
            : isPointer
            ? 'rgba(255, 42, 42, 0.8)'
            : 'transparent',
          borderWidth: isHovered ? 1 : isPointer ? 1.5 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.18 }}
        className="flex items-center justify-center text-center shadow-[0_0_12px_rgba(255,42,42,0.35)] backdrop-blur-[1px]"
      >
        {isHovered && cursorText ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] tracking-widest font-mono font-bold text-white uppercase select-none px-1.5 leading-none whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        ) : isPointer ? (
          <span className="w-1 h-1 rounded-full bg-[#FF2A2A]" />
        ) : null}
      </motion.div>
    </div>
  );
};
