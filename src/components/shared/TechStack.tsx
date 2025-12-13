'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Server, 
  Layout, 
  Palette, 
  Terminal,
  Globe,
  Cloud,
  Shield,
  GitBranch,
  Container,
  Cpu,
  Layers,
  Package,
  Zap,
  Braces
} from 'lucide-react';

const TechStack = () => {
  // Tech stack data with icons and names
  const stack = [
    { name: 'Next.js', icon: Globe },
    { name: 'TypeScript', icon: Code },
    { name: 'Tailwind CSS', icon: Palette },
    { name: 'Node.js', icon: Server },
    { name: 'React', icon: Layers },
    { name: 'Framer Motion', icon: Zap },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Docker', icon: Container },
    { name: 'Git', icon: GitBranch },
    { name: 'Prisma', icon: Database },
    { name: 'REST APIs', icon: Globe },
    { name: 'GraphQL', icon: Braces },
    { name: 'AWS', icon: Cloud },
    { name: 'Vercel', icon: Zap },
    { name: 'Linux', icon: Terminal },
    { name: 'Security', icon: Shield },
    { name: 'Performance', icon: Cpu },
    { name: 'UI/UX', icon: Layout },
    { name: 'Package', icon: Package },
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedStack = [...stack, ...stack];

  const marqueeVariants = {
    animate: {
      x: [0, -stack.length * 200], // Move left by the width of one stack
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30, // Adjust speed (slower = higher number)
          ease: "linear",
        },
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          {/* Section Header */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Tech Stack
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Technologies and tools I work with to build modern web applications.
          </motion.p>
        </motion.div>

        {/* Infinite Marquee Container */}
        <div className="relative">
          {/* Gradient Masks for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />
          
          {/* Marquee Track */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-8"
              variants={marqueeVariants}
              animate="animate"
            >
              {duplicatedStack.map((tech, index) => {
                const IconComponent = tech.icon;
                
                return (
                  <motion.div
                    key={`${tech.name}-${index}`}
                    className="flex items-center space-x-3 px-6 py-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg hover:border-indigo-500/30 transition-all duration-300 hover:bg-zinc-800/50 group min-w-fit"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <IconComponent 
                      className="w-8 h-8 text-zinc-500 group-hover:text-indigo-400 transition-colors duration-300" 
                    />
                    <span className="text-zinc-400 group-hover:text-indigo-400 font-medium transition-colors duration-300 whitespace-nowrap">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
            <Cpu className="h-5 w-5 text-indigo-400" />
            <span className="text-zinc-300">
              Always learning and exploring new technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;