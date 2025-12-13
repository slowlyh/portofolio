'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Code, Star, Zap, Package, Users, Smartphone, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlareCard from './GlareCard';

// Exact project data as specified
const PROJECTS = [
  {
    title: "Snippets",
    description: "Simple web snippets.",
    tags: ["Next.js", "AI Integration", "TypeScript"],
    imageUrl: "/projects/marktools.png",
    demoUrl: "https://code.hyuu.tech",
    repoUrl: "https://github.com/slowlyh/Snippets", // Private Contact
    featured: true, // SPAN 2x2
  },
  {
    title: "Chat Ai",
    description: "Chating with ai.",
    tags: ["React", "UI/UX"],
    imageUrl: "/projects/payment.png",
    demoUrl: "https://chat.hyuu.tech",
    repoUrl: "https://github.com/slowlyh/chat-ai",
    featured: false,
  },
  {
    title: "Slowtik",
    description: "Web downloader video from tiktok..",
    tags: ["Next.js", "TypeScript"],
    imageUrl: "/projects/norvus.png",
    demoUrl: "https://slowtik.vercel.app",
    repoUrl: "https://github.com/slowlyh/Slowtik", // Private Contact
    featured: false,
  },
];

// Stat cards for Bento Grid
const STAT_CARDS = [
  {
    label: "Total Projects",
    value: PROJECTS.length.toString(),
    icon: Package,
  },
  {
    label: "Featured Work",
    value: "Snippets",
    icon: Star,
  },
];

// Project card component for Bento Grid
const ProjectCard = ({ project, index, isStat = false, statData = null }: { 
  project?: any; 
  index: number; 
  isStat?: boolean; 
  statData?: { label: string; value: string; icon: any };
}) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (isStat && statData) {
    const IconComponent = statData.icon;
    return (
      <GlareCard>
        <div className="p-6 flex flex-col justify-center items-center text-center">
          <IconComponent className="w-8 h-8 text-indigo-400 mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{statData.value}</div>
          <div className="text-sm text-zinc-400">{statData.label}</div>
        </div>
      </GlareCard>
    );
  }

  if (!project) return null;

  const isFeatured = project.featured;
  const gridClass = isFeatured 
    ? "md:col-span-2 md:row-span-2" 
    : "md:col-span-1 md:row-span-1";

  return (
    <GlareCard
      gridClass={gridClass}
      className={`${gridClass}`}
    >
      {/* Background Image for Featured Projects */}
      {isFeatured && (
        <div className="absolute inset-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/projects/placeholder.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col ${isFeatured ? 'justify-end p-6' : 'p-6'}`}>
        {/* Featured Project Content */}
        {isFeatured ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-zinc-300 text-sm mb-4 line-clamp-2">{project.description}</p>
              </div>
              {project.featured && (
                <Badge className="bg-indigo-500 text-white px-2 py-1 text-xs">
                  Featured
                </Badge>
              )}
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-zinc-800/50 text-zinc-300 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
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
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs"
                  asChild
                >
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <Github className="h-3 w-3" />
                    Contact
                  </a>
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Regular Project Content */
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">{project.title}</h3>
                {project.featured && (
                  <Star className="w-4 h-4 text-indigo-400 fill-current" />
                )}
              </div>
              
              <p className="text-zinc-400 text-xs mb-4 line-clamp-2">{project.description}</p>
            </div>

            {/* Tech Stack Icons */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.slice(0, 2).map((tag: string) => (
                <div
                  key={tag}
                  className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center"
                  title={tag}
                >
                  <Code className="w-3 h-3 text-zinc-400" />
                </div>
              ))}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-zinc-900/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                size="sm"
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
                asChild
              >
                <a
                  href={project.repoUrl || project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Project
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </GlareCard>
  );
};

const ProjectBento = () => {
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

  // Create grid items array with projects and stats
  const gridItems = [
    { type: 'project', data: PROJECTS[0] }, // MarkTools (Featured)
    { type: 'stat', data: STAT_CARDS[0] },    // Total Projects
    { type: 'project', data: PROJECTS[1] }, // Simple Payment
    { type: 'project', data: PROJECTS[2] }, // Norvus Community
    { type: 'stat', data: STAT_CARDS[1] },    // Featured Work
  ];

  return (
    <section id="projects" className="py-24 relative">
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
            variants={headerVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            My Creations
          </motion.h2>
          
          <motion.p
            variants={headerVariants}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Selected works
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {gridItems.map((item, index) => (
            <ProjectCard
              key={`${item.type}-${index}`}
              project={item.type === 'project' ? item.data : undefined}
              isStat={item.type === 'stat'}
              statData={item.type === 'stat' ? item.data : undefined}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectBento;