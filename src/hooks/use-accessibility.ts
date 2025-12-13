import { useEffect, useCallback } from 'react';

export const useKeyboardNavigation = () => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Handle common keyboard shortcuts
    switch (e.key) {
      case 'Escape':
        // Close modals, menus, etc.
        document.dispatchEvent(new CustomEvent('escapePress'));
        break;
      case 'Tab':
        // Ensure focus management
        if (!e.shiftKey) {
          // Forward tab - let browser handle
          document.body.classList.add('keyboard-nav');
        }
        break;
      case 'Enter':
      case ' ':
        // Handle button clicks with keyboard
        if (e.target instanceof HTMLElement && e.target.getAttribute('role') === 'button') {
          e.preventDefault();
          e.target.click();
        }
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export const useFocusManagement = (elementId: string) => {
  const setFocus = useCallback(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [elementId]);

  return { setFocus };
};

export const useAnnouncer = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    
    document.body.appendChild(announcer);
    announcer.textContent = message;
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);

  return { announce };
};