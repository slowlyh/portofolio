'use client';

import { motion } from 'framer-motion';
import { Terminal, User, Code, Sparkles } from 'lucide-react';
import ScrollStream from './ScrollStream';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const terminalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="about" className="py-20 relative" aria-labelledby="about-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" aria-hidden="true" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          {/* Section Header - Proper heading hierarchy */}
          <motion.h2
            id="about-heading"
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            About Me
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Get to know more about my journey and what drives my passion for technology.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">My Journey</h3>
              </div>
              
              <ScrollStream 
                content={[
                  "I'm a passionate software engineering student with a love for creating innovative digital solutions. My journey began in 2022 as a hosting seller and bot creator, which sparked my interest in technology and automation.",
                  "Currently pursuing my studies in Software Engineering, I'm constantly learning new technologies and working on projects that challenge me to grow as a developer. I believe in the power of clean code and beautiful user experiences."
                ]}
                className="text-white"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-indigo-400">2+</div>
                <div className="text-sm text-zinc-400">Years</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-indigo-400">10+</div>
                <div className="text-sm text-zinc-400">Projects</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-indigo-400">∞</div>
                <div className="text-sm text-zinc-400">Learning</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Terminal Window */}
          <motion.div 
            variants={terminalVariants} 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Terminal Window */}
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm relative">
              {/* Glare Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </div>
              
              {/* Terminal Header */}
              <div className="bg-zinc-900/80 px-4 py-3 flex items-center gap-2 border-b border-zinc-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-zinc-400 font-mono">hyuu@portfolio:~</span>
                </div>
                <Terminal className="w-4 h-4 text-zinc-400" />
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-3">
                  {/* Command 1 */}
                  <div className="text-zinc-300">
                    <span className="text-green-400">hyuu@portfolio:~$</span>
                    <span className="text-zinc-300 ml-2">init journey --year 2022</span>
                  </div>
                  
                  <div className="text-zinc-400 ml-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span>Loading modules...</span>
                    </div>
                    <div className="ml-6 text-green-400">✓ Role: Hosting Seller & Bot Creator initialized.</div>
                    <div className="ml-6 text-green-400">✓ Interest in Automation: DETECTED.</div>
                  </div>
                  
                  <div className="h-2"></div>
                  
                  {/* Command 2 */}
                  <div className="text-zinc-300">
                    <span className="text-green-400">hyuu@portfolio:~$</span>
                    <span className="text-zinc-300 ml-2">status</span>
                  </div>
                  
                  <div className="text-zinc-400 ml-4">
                    <div className="ml-6 text-blue-400">Current: Software Engineering Student</div>
                    <div className="ml-6 text-indigo-400">Mood: Vibe Coding...</div>
                  </div>
                  
                  {/* Blinking Cursor */}
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-green-400">hyuu@portfolio:~$</span>
                    <span className="text-zinc-300 animate-pulse">█</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Glow Effect on Hover */}
            <div className="absolute inset-0 bg-indigo-500/10 rounded-xl blur-xl -z-10 group-hover:bg-indigo-500/20 transition-all duration-300"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;