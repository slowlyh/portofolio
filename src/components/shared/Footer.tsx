'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-zinc-400">
            <span>© {currentYear} Hyuu</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>Built with</span>
            <span className="text-indigo-400">Passion & Code</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;