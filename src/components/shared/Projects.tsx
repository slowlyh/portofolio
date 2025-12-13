"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Lock } from "lucide-react";
import { portfolioData } from "@/lib/data";

const PROJECTS = portfolioData.projects;

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle responsive visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setVisibleCount(6);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clear existing timeout
  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Handle project card click
  const handleProjectClick = (index: number) => {
    clearExistingTimeout();
    setActiveProject(index);
    
    // Auto-hide after 6 seconds
    timeoutRef.current = setTimeout(() => {
      setActiveProject(null);
    }, 6000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearExistingTimeout();
    };
  }, []);

  const showAllProjects = () => {
    setVisibleCount(PROJECTS.length);
  };

  const hasMoreProjects = PROJECTS.length > visibleCount;

  return (
    <section id="projects" className="py-32 container mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-lg max-w-2xl mx-auto"
        >
          Explore my latest work and creative solutions built with modern technologies
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {PROJECTS.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300"
            >
              {/* Image Area */}
              <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => handleProjectClick(index)}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div 
                  className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    activeProject === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {/* Demo Button */}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 hover:scale-105 px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  
                  {/* Code Button */}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-full px-6 py-3 flex items-center gap-2 transition-colors"
                    >
                      {project.repoUrl.includes("wa.me") ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Github className="w-4 h-4" />
                      )}
                      Code
                    </a>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {hasMoreProjects && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <button
            onClick={showAllProjects}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 hover:scale-105 px-8 py-3 rounded-full transition-all duration-300"
          >
            Show More Projects
          </button>
        </motion.div>
      )}
    </section>
  );
}