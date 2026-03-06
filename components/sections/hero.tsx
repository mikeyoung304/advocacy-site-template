'use client';

import { motion, type Variants } from 'framer-motion';
import { HardHat, Users, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { heroContent, heroStats } from '@/lib/content';
import { DollarBill } from '@/components/icons/dollar-bill';
import { itemVariants, SPRING_TRANSITION } from '@/lib/animations';

// Icons for each stat (matches order in heroStats: Investment, Construction Jobs, Permanent Jobs)
// Fallback icon if heroStats has more items than icons
const statIcons = [DollarBill, HardHat, Users];
const getStatIcon = (index: number) => statIcons[index] ?? DollarBill;

// Hero uses slightly different stagger timing
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-data-campus.webp"
          alt={heroContent.heroImageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-primary-light/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold leading-tight tracking-tight text-foreground-strong sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {heroContent.headline}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted sm:text-xl md:mt-8"
          >
            {heroContent.subheadline}
          </motion.p>

          {/* Trust Strip */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-base font-semibold uppercase tracking-wider text-foreground sm:text-lg"
          >
            {heroContent.trustStrip}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="mt-10">
            <a
              href="#project"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-hover hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {heroContent.ctaText}
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Quick stats - horizontal on all screen sizes */}
          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 md:mt-16"
          >
            {heroStats.map((stat, index) => {
              const Icon = getStatIcon(index);
              const iconClass = "mx-auto mb-2 h-6 w-6 text-primary sm:mb-3 sm:h-8 sm:w-8";
              return (
                <div key={stat.label} className="rounded-xl bg-white/45 p-3 shadow-lg backdrop-blur-[8px] border border-white/40 sm:p-4">
                  <Icon className={iconClass} aria-hidden="true" />
                  <p className="text-lg font-bold text-primary sm:text-2xl">{stat.value}</p>
                  <p className="text-xs font-medium leading-tight text-foreground-muted sm:text-sm">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Estimation Disclosure */}
          {heroContent.estimationDisclosure && (
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-4xl text-lg italic leading-relaxed text-foreground-muted sm:text-xl"
            >
              {heroContent.estimationDisclosure}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
