'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Smartphone, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EXPERIENCES = [
  {
    year: "2023 - Present",
    title: "Vibe Coder & Full Stack Engineer",
    company: "Freelance / Learning",
    description: "Building AI-driven tools and full-stack web applications. Focusing on clean architecture and modern UX patterns.",
    skills: ["Next.js 14", "TypeScript", "AI Integration", "Tailwind"],
    icon: Code2
  },
  {
    year: "2022 - 2023",
    title: "Hosting Seller & Bot Creator",
    company: "Self-Employed",
    description: "Started journey by managing servers and building custom bots for communities. Learned fundamentals of deployment and backend logic.",
    skills: ["Server Management", "Bot Development", "Ubuntu"],
    icon: Server
  }
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const currentExperience = EXPERIENCES[activeTab];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-indigo-950/20 to-zinc-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-2">
            <Code2 className="h-4 w-4 mr-2" />
            My Journey
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Building digital solutions, from automation tools to full-stack applications.
          </p>
        </motion.div>

        {/* Tabbed Interface Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {/* Left Column: Navigation Tabs */}
            <div className="md:col-span-1 bg-zinc-900/50 border-r border-zinc-800">
              {/* Desktop: Vertical Tabs */}
              <div className="hidden md:block h-full">
                <nav className="p-4 space-y-2">
                  {EXPERIENCES.map((exp, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg border-l-2 transition-all duration-300 ${
                        activeTab === index
                          ? 'text-white bg-zinc-800/50 border-l-2 border-indigo-500 shadow-[inset_10px_0_20px_-10px_rgba(99,102,241,0.3)]'
                          : 'text-zinc-400 border-l-2 border-zinc-800 hover:text-zinc-300 hover:bg-zinc-800/30'
                      }`}
                    >
                      <div className="font-medium text-sm">{exp.year}</div>
                      <div className="text-xs text-zinc-500 mt-1">{exp.company}</div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Mobile: Horizontal Scrollable Tabs */}
              <div className="md:hidden">
                <div className="flex overflow-x-auto p-4 space-x-2 scrollbar-hide">
                  {EXPERIENCES.map((exp, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                        activeTab === index
                          ? 'text-white bg-zinc-800/50 border border-indigo-500'
                          : 'text-zinc-400 border border-zinc-800 hover:text-zinc-300 hover:bg-zinc-800/30'
                      }`}
                    >
                      <div className="font-medium text-sm">{exp.year}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Content Display */}
            <div className="md:col-span-3 p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="h-full"
                >
                  {/* Content Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {currentExperience.title}
                      </h3>
                      <p className="text-lg text-indigo-400 font-medium">
                        {currentExperience.company}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-zinc-800/50 border-zinc-700 text-zinc-300 font-mono text-sm">
                      {currentExperience.year}
                    </Badge>
                  </div>

                  {/* Content Body */}
                  <p className="text-zinc-400 leading-relaxed mb-8 text-base">
                    {currentExperience.description}
                  </p>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentExperience.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: skillIndex * 0.1,
                            ease: 'easeOut'
                          }}
                        >
                          <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Icon Display */}
                  <div className="mt-8 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl" />
                      <div className="relative w-16 h-16 bg-zinc-800/50 border border-zinc-700 rounded-xl flex items-center justify-center">
                        <currentExperience.icon className="w-8 h-8 text-indigo-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;