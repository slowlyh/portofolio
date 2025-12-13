'use client';

import { MouseEvent } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface GlareCardProps {
  children: ReactNode;
  className?: string;
  gridClass?: string;
}

const GlareCard = ({ children, className = "", gridClass = "" }: GlareCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Dynamic gradient background that follows mouse
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      return `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`;
    }
  );

  return (
    <motion.div
      className={`relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 ${gridClass}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare Layer - The Magic */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background }}
      />
      
      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlareCard;