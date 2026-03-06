'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { Mail } from 'lucide-react';
import { siteConfig, getVisibleNavLinks } from '@/lib/content';
import { contactEmail } from '@/lib/config';
import { cn } from '@/lib/cn';

// Simple throttle utility to limit scroll handler execution
function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, delay - timeSinceLastCall);
    }
  };
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const sectionIds = useRef<string[]>([]);

  const visibleNavLinks = getVisibleNavLinks();

  // Initialize cached DOM elements on mount
  useEffect(() => {
    const ids = ['hero', ...visibleNavLinks.map(l => l.href.replace('#', ''))];
    sectionIds.current = [...ids].reverse();
    sectionsRef.current = sectionIds.current
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
  }, [visibleNavLinks]);

  const updateScrollState = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    for (const element of sectionsRef.current) {
      if (element.getBoundingClientRect().top <= 150) {
        setActiveSection(element.id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = throttle(updateScrollState, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollState]);

  useEffect(() => {
    if (sectionsRef.current.length === 0) return;
    const frameId = requestAnimationFrame(() => {
      updateScrollState();
    });
    return () => cancelAnimationFrame(frameId);
  }, [updateScrollState]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border bg-[--glass-bg-scrolled] shadow-sm backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]'
          : 'bg-[--glass-bg] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]'
      )}
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="text-lg font-bold text-foreground transition-colors hover:text-primary"
        >
          {siteConfig.projectName}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {visibleNavLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      'relative inline-flex min-h-[44px] items-center px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded',
                      isActive
                        ? 'text-primary'
                        : 'text-foreground-muted hover:text-foreground'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          {/* CTA Button */}
          <a
            href={`mailto:${contactEmail}`}
            className="ml-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={toggleButtonRef}
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background-secondary hover:text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <div className="flex h-5 w-6 flex-col items-center justify-center">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-6 rounded-full bg-current"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 h-0.5 w-6 rounded-full bg-current"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 h-0.5 w-6 rounded-full bg-current"
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <FocusScope
            trapped
            loop
            onUnmountAutoFocus={(e) => {
              e.preventDefault();
              toggleButtonRef.current?.focus();
            }}
          >
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-foreground-muted/10 bg-background/95 backdrop-blur-lg md:hidden"
              onKeyDown={(e) => {
                if (e.key === 'Escape') closeMenu();
              }}
            >
              <ul className="space-y-1 px-4 py-4">
                {visibleNavLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <a
                        href={link.href}
                        className={cn(
                          'flex min-h-[44px] items-center rounded-lg px-4 py-3 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-primary-light text-primary'
                            : 'text-foreground-muted hover:bg-background-secondary hover:text-foreground'
                        )}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </FocusScope>
        )}
      </AnimatePresence>
    </header>
  );
}
