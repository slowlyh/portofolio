'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Throttled scroll handler for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', icon: Home, 'aria-label': 'Navigate to home section' },
    { label: 'About', href: '#about', icon: User, 'aria-label': 'Navigate to about section' },
    { label: 'Projects', href: '#projects', icon: Code, 'aria-label': 'Navigate to projects section' },
    { label: 'Contact', href: '#contact', icon: Mail, 'aria-label': 'Navigate to contact section' },
  ];

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Main Navigation - Accessible */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-300 ${
          scrolled 
            ? 'border border-zinc-800 bg-zinc-900/80 backdrop-blur-md rounded-full top-4 w-[90%]' 
            : 'top-0 w-full'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo - Accessible */}
          <Link 
            href="#home" 
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            aria-label="Go to home section"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-200">
              Hyuu.
            </span>
          </Link>

          {/* Desktop Navigation - Accessible */}
          <div className="hidden xl:flex items-center gap-6" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center space-x-2 text-zinc-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                role="menuitem"
                aria-label={item['aria-label']}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Tablet Navigation - Icons Only - Accessible */}
          <div className="hidden lg:flex xl:hidden items-center gap-4" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center text-zinc-300 hover:text-white p-3 transition-all duration-200 rounded-full hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title={item.label}
                role="menuitem"
                aria-label={item['aria-label']}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* Right CTA Button */}
          <div className="hidden lg:block">
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
              asChild
            >
              <Link href="#contact">
                Get in Touch
              </Link>
            </Button>
          </div>

          {/* Mobile menu button - Accessible */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu - Accessible */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden"
            id="mobile-menu"
            role="menu"
          >
            <div className="mx-4 max-w-2xl mx-auto">
              <div className="bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl p-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : 0.2, 
                      delay: shouldReduceMotion ? 0 : index * 0.05 
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 text-zinc-300 hover:text-white px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-zinc-800/50 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => setIsOpen(false)}
                      role="menuitem"
                      aria-label={item['aria-label']}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA Button - Accessible */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    duration: shouldReduceMotion ? 0 : 0.2, 
                    delay: shouldReduceMotion ? 0 : navItems.length * 0.05 
                  }}
                  className="mt-4 pt-4 border-t border-zinc-800"
                >
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                    asChild
                  >
                    <Link href="#contact" onClick={() => setIsOpen(false)}>
                      Get in Touch
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;