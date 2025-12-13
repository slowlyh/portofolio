'use client';

import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Calendar, ExternalLink, Github, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PROJECTS = [
  {
    title: "Snippets",
    description: "Simple web snippets.",
    tags: ["Next.js", "AI Integration", "TypeScript"],
    imageUrl: "/projects/marktools.png",
    demoUrl: "https://code.hyuu.tech",
    repoUrl: "https://github.com/slowlyh/Snippets", // Private Contact
    featured: true, // SPAN 2x2
    year: "2025"
  },
  {
    title: "Chat Ai",
    description: "Chating with ai.",
    tags: ["React", "UI/UX"],
    imageUrl: "/projects/payment.png",
    demoUrl: "https://chat.hyuu.tech",
    repoUrl: "https://github.com/slowlyh/chat-ai",
    featured: false,
    year: "2025"
  },
  {
    title: "Slowtik",
    description: "Web downloader video from tiktok..",
    tags: ["Next.js", "TypeScript"],
    imageUrl: "/projects/norvus.png",
    demoUrl: "https://slowtik.vercel.app",
    repoUrl: "https://github.com/slowlyh/Slowtik", // Private Contact
    featured: false,
    year: "2025"
  },
];

const ProjectList = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // For mouse follow effect (optional advanced feature)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={headerVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Interactive Directory
          </motion.h2>
          
          <motion.p
            variants={headerVariants}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Explore my projects through an interactive experience
          </motion.p>
        </motion.div>

        {/* Desktop Interactive List */}
        <div className="hidden md:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Floating Image Container */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
              <motion.div
                animate={{
                  opacity: hoveredProject !== null ? 1 : 0,
                  scale: hoveredProject !== null ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="w-80 h-60 rounded-lg overflow-hidden shadow-2xl"
              >
                {hoveredProject !== null && (
                  <img
                    src={PROJECTS[hoveredProject].imageUrl}
                    alt={PROJECTS[hoveredProject].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/projects/placeholder.png';
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* Project List */}
            <div className="space-y-1">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={rowVariants}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative cursor-pointer border-b border-zinc-800/50 py-6 pr-32 transition-all duration-300 hover:border-zinc-700"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Project Title */}
                    <div className="flex-1">
                      <motion.h3
                        animate={{
                          color: hoveredProject === index ? "#6366f1" : "#ffffff",
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-bold transition-colors duration-200"
                      >
                        {project.title}
                      </motion.h3>
                      {project.featured && (
                        <Badge className="mt-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Middle: Tech Stack */}
                    <div className="flex-1 flex justify-center">
                      <div className="flex flex-wrap gap-2 max-w-md justify-center">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-colors duration-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Right: Arrow Icon or Year */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{project.year}</span>
                      </div>
                      <motion.div
                        animate={{
                          x: hoveredProject === index ? 5 : 0,
                          y: hoveredProject === index ? -5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-zinc-500 group-hover:text-indigo-400 transition-colors duration-200"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <motion.div
                    animate={{
                      opacity: hoveredProject === index ? 1 : 0,
                      y: hoveredProject === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2"
                  >
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs"
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all text-xs"
                        asChild
                      >
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          {project.repoUrl.includes('wa.me') ? (
                            <>
                              <Lock className="w-4 h-4" />
                              Private
                            </>
                          ) : (
                            <>
                              <Github className="w-4 h-4" />
                              Code
                            </>
                          )}
                        </a>
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Fallback - Card Stack */}
        <div className="md:hidden space-y-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 shadow-xl"
            >
              {/* Project Image */}
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/projects/placeholder.png';
                  }}
                />
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  {project.featured && (
                    <Badge className="bg-indigo-500 text-white px-2 py-1 text-xs">
                      Featured
                    </Badge>
                  )}
                </div>

                <p className="text-zinc-400 text-sm">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-zinc-800/50 text-zinc-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {project.demoUrl && (
                    <Button
                      size="sm"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs flex-1"
                      asChild
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={`bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all text-xs flex-1 ${
                        project.repoUrl.includes('wa.me') ? 'opacity-70' : ''
                      }`}
                      asChild
                    >
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1"
                      >
                        {project.repoUrl.includes('wa.me') ? (
                          <>
                            <Lock className="w-4 h-4" />
                            Private
                          </>
                        ) : (
                          <>
                            <Github className="w-4 h-4" />
                            Code
                          </>
                        )}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;