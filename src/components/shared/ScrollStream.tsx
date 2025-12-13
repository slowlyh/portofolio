"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface ScrollStreamProps {
  content: string[]; // Array of paragraphs
  className?: string;
}

const Char = ({ 
  children, 
  progress, 
  range 
}: { 
  children: string; 
  progress: MotionValue<number>; 
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-colors duration-75">
      {children}
    </motion.span>
  );
};

export default function ScrollStream({ content, className }: ScrollStreamProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.5"], // Adjusts total scroll distance needed
  });

  // Calculate total characters across all paragraphs
  const totalChars = content.join("").length;
  let globalCharIndex = 0;

  return (
    <div ref={container} className={`space-y-6 ${className}`}>
      {content.map((paragraph, pIndex) => {
        const words = paragraph.split(" ");
        
        return (
          <p key={pIndex} className="block leading-relaxed">
            {words.map((word, wIndex) => {
              // Split word into chars
              const chars = word.split("");
              const wordJsx = chars.map((char, cIndex) => {
                const start = globalCharIndex / totalChars;
                const end = start + (1 / totalChars);
                globalCharIndex++; // Increment for every char in loop
                
                return (
                  <Char key={`c-${cIndex}`} progress={scrollYProgress} range={[start, end]}>
                    {char}
                  </Char>
                );
              });

              // Add space after word (except last word)
              if (wIndex < words.length - 1) {
                 const start = globalCharIndex / totalChars;
                 const end = start + (1 / totalChars);
                 globalCharIndex++;
                 wordJsx.push(
                   <Char key={`space-${wIndex}`} progress={scrollYProgress} range={[start, end]}>
                     {"\u00A0"}
                   </Char>
                 );
              }

              return <span key={`w-${wIndex}`} className="inline-block">{wordJsx}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}