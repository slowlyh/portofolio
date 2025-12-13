'use client';

import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { ArrowDown, Mail, Code2, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/lib/data';
import ProfileCard from '@/components/ProfileCard';

// Rotating Text Component - Optimized with accessibility
const RotatingText = () => {
  const words = ["Software Engineer", "Vibe Coder"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Slower for better accessibility

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    return {
      enter: {
        y: 20,
        opacity: 0,
        rotateX: -90,
      },
      center: {
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        rotateX: 90,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    };
  }, [shouldReduceMotion]);

  return (
    <span className="inline-block">
      <AnimatePresence mode={shouldReduceMotion ? "wait" : "wait"}>
        <motion.span
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold"
          role="status"
          aria-live="polite"
          aria-label={`Current role: ${words[currentIndex]}`}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  // Animation variants - Optimized with reduced motion support
  const containerVariants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      };
    }
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };
  }, [shouldReduceMotion]);

  const itemVariants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        },
      };
    }
    return {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    };
  }, [shouldReduceMotion]);

  // Blur-in variants - Optimized
  const blurInVariants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.3,
          },
        },
      };
    }
    return {
      hidden: { 
        filter: 'blur(10px)', 
        opacity: 0, 
        y: 20 
      },
      visible: {
        filter: 'blur(0px)', 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.6,
        },
      },
    };
  }, [shouldReduceMotion]);

  // Scroll indicator variants
  const scrollIconVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.8, // Appears after all content is visible
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  // Parallax transform - Optimized with reduced motion support
  const parallaxY = shouldReduceMotion ? 0 : scrollY * 0.5;
  const parallaxScale = shouldReduceMotion ? 1 : 1 + scrollY * 0.0002;

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      aria-labelledby="hero-heading"
    >
      {/* Parallax Background Layers - Optimized */}
      {!shouldReduceMotion && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
          style={{
            y: parallaxY * 0.3,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Static background for reduced motion */}
      {shouldReduceMotion && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
          aria-hidden="true"
        />
      )}
      
      {/* Parallax Gradient Overlay - Optimized */}
      {!shouldReduceMotion && (
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
            y: parallaxY * 0.7,
            scale: parallaxScale,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Floating Particles - Optimized */}
      {!shouldReduceMotion && (
        <motion.div 
          className="absolute inset-0"
          style={{
            y: parallaxY * 1.2,
          }}
          aria-hidden="true"
        >
          {[...Array(8)].map((_, i) => ( // Reduced from 20 to 8 for performance
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: 1 + Math.random() * 2,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout - Mobile: Single Column, Desktop: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          
          {/* Left Column - Text Content with Orchestrated Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left space-y-6"
          >
            {/* 1. Welcome Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-full">
                <Code2 className="h-4 w-4 mr-2" />
                <span className="font-mono text-sm">Welcome to my portfolio</span>
              </div>
            </motion.div>

            {/* 2. Main Headline with Cinematic Blur-In - Accessible */}
            <motion.h1
              id="hero-heading"
              variants={blurInVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                {portfolioData.name}
              </span>
            </motion.h1>

            {/* 3. Rotating Sub-headline - Accessible */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl text-zinc-300 mb-6 font-light"
            >
              I am a <RotatingText />
            </motion.h2>

            {/* 4. Bio */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {portfolioData.bio}
            </motion.p>

            {/* 5. CTA Buttons - Accessible */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              role="group"
              aria-label="Call to action buttons"
            >
              <Button
                size="lg"
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white px-8 py-4 text-base font-semibold shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(99,102,241,0.7)] hover:scale-105 transition-all duration-500 transform hover:-translate-y-1 border-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 transition-shadow focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                asChild
              >
                <a href="#projects" className="flex items-center gap-3 relative z-10">
                  <Code2 className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>View My Projects</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
              <Button
                size="lg"
                className="relative overflow-hidden group bg-white/10 border border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 px-8 py-4 text-base font-semibold before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 focus:outline-none focus:ring-4 focus:ring-white/20"
                asChild
              >
                <a href="#contact" className="flex items-center gap-3 relative z-10">
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Contact Me</span>
                  <ExternalLink className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Card with Independent Animation */}
          <div className="hidden lg:flex justify-center items-center h-[600px] relative">
            {/* Spotlight Glow Behind Profile Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-full -z-10" />
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut", 
                delay: 0.8 // Appears after text animations start
              }}
            >
              <ProfileCard
                name="Hyuu"
                title="Software Engineer"
                handle="hyuux"
                status="Vibe Coding"
                avatarUrl="/avatar.png"
                iconUrl="/icon-pattern.png"
                grainUrl="/grain-texture.png"
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(99, 102, 241, 0.4)"
                behindGlowSize="60%"
                onContactClick={() => console.log('Contact clicked')}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Optimized */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, 5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 2,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-zinc-500"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;