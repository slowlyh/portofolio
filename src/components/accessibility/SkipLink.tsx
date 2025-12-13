'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SkipLink() {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocused(true);
      }
    };

    const handleMouseDown = () => {
      setIsFocused(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const skipToMain = () => {
    const main = document.querySelector('main');
    main?.focus();
  };

  const skipToNavigation = () => {
    const nav = document.querySelector('nav');
    nav?.focus();
  };

  return (
    <div 
      className="fixed top-0 left-0 z-[100] flex gap-2 p-4"
      style={{ transform: isFocused ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <Button
        variant="secondary"
        size="sm"
        onClick={skipToMain}
        className="bg-zinc-900 text-zinc-100 border border-zinc-700 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Skip to main content
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={skipToNavigation}
        className="bg-zinc-900 text-zinc-100 border border-zinc-700 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Skip to navigation
      </Button>
    </div>
  );
}