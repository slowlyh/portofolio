"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface ScrollRevealProps {
  children: string; // Must be string for splitting
  className?: string;
}

// Sub-component to handle individual character logic (Optimization)
const Char = ({ 
  children, 
  progress, 
  range 
}: { 
  children: string; 
  progress: MotionValue<number>; 
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block transition-colors duration-75">
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
};

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const element = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.35"], // Text starts lighting up at bottom, finishes at top-third
  });

  const characters = children.split("");

  return (
    <p 
      ref={element} 
      className={`flex flex-wrap ${className}`} // Flex wrap handles words correctly
    >
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        return (
          <Char key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </p>
  );
}