'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1 + 0.2,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.1 + 0.4,
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group"
    >
      <Card className="h-full bg-zinc-900/50 border-zinc-800/50 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 overflow-hidden">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-zinc-800/50">
          <motion.img
            variants={imageVariants}
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback image if project image doesn't exist
              (e.target as HTMLImageElement).src = '/projects/placeholder.png';
            }}
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="absolute top-3 right-3"
            >
              <Badge className="bg-indigo-500 text-white px-2 py-1 text-xs flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            </motion.div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-white group-hover:text-indigo-400 transition-colors duration-200">
            {project.title}
          </CardTitle>
          <CardDescription className="text-zinc-400 line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3">
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag, tagIndex) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>
        </CardContent>

        <CardFooter className="pt-2 gap-2">
          {project.demoUrl && (
            <Button
              variant="default"
              size="sm"
              className="bg-indigo-500 hover:bg-indigo-600 text-white flex-1"
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white flex-1"
              asChild
            >
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;