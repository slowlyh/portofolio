'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SpotifyWidget from '@/components/shared/SpotifyWidget';

const FavoritePlaylist = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate random heights for audio visualizer bars
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial random heights
    const heights = Array.from({ length: 6 }, () => Math.random() * 100);
    setBarHeights(heights);

    // Animate bars if playing
    if (isPlaying) {
      const interval = setInterval(() => {
        setBarHeights(Array.from({ length: 6 }, () => Math.random() * 100));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 flex items-center justify-center -z-30 pointer-events-none">
        <h1 className="text-[200px] font-black text-white/5 leading-none select-none">
          MUSIC
        </h1>
      </div>

      {/* Main Container - Split Layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          
          {/* LEFT COLUMN - The Vibe / Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-full">
                On Repeat
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
            >
              Soundtrack of Code
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-zinc-400 max-w-lg"
            >
              Music is the fuel for my logic. This is what keeps me in the spirit of learning.
            </motion.p>

            {/* Visualizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-end gap-2 h-16"
            >
              {barHeights.map((height, index) => (
                <motion.div
                  key={index}
                  className="w-3 bg-indigo-500 rounded-t"
                  style={{ height: `${height}%` }}
                  animate={{
                    height: isPlaying ? `${Math.random() * 100}%` : `${height}%`,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: index * 0.05,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - The Widget Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative flex justify-center items-center lg:min-h-[500px]"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-indigo-500/30 blur-[100px] w-full h-full -z-20 rounded-full" />
            
            {/* Glass Backdrop */}
            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl -rotate-6 scale-110 -z-10" />
            
            {/* Spotify Widget with Tilt */}
            <div className="relative z-10 rotate-3 transform transition-transform hover:rotate-6 duration-300">
              <SpotifyWidget onPlayStateChange={setIsPlaying} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Stage Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-20 left-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl -z-20" 
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl -z-20" 
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute top-1/3 right-1/3 w-32 h-32 bg-green-500/10 rounded-full blur-xl -z-20" 
      />
    </section>
  );
};

export default FavoritePlaylist;