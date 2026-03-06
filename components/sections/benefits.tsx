'use client';

import { motion, type Variants } from 'framer-motion';
import { DollarSign, Users, Wrench, Building2, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/components/fade-in';
import { benefitsContent } from '@/lib/content';
import { itemVariants } from '@/lib/animations';

// Benefits section uses slightly longer delay before starting animations
const benefitsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  Wrench,
  Building2,
};

// Alternate icon background colors for visual variety
const iconColors = [
  { bg: 'bg-primary-light', text: 'text-primary-dark' },
  { bg: 'bg-secondary/20', text: 'text-secondary' },
  { bg: 'bg-primary-light', text: 'text-primary-dark' },
  { bg: 'bg-secondary/20', text: 'text-secondary' },
];

export function Benefits() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span id="benefits" className="scroll-anchor" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {benefitsContent.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              {benefitsContent.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Benefits cards with playground background */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Responsive aspect ratio - taller on mobile to fit cards */}
          <div className="aspect-[9/28] w-full sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[2/1]">
            <Image
              src="/images/playground.webp"
              alt="Children playing on a colorful playground under blue sky"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>

          {/* Cards positioned over the image - responsive grid for any count */}
          <motion.div
            variants={benefitsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px' }}
            className="absolute inset-0 z-10 flex items-start justify-center p-4 pt-6 sm:p-6 sm:pt-8 md:p-8 md:pt-12 lg:p-10 lg:pt-14"
          >
            <div className="grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {benefitsContent.items.map((benefit, index) => {
                const Icon = iconMap[benefit.icon] ?? DollarSign;
                const colors = iconColors[index % iconColors.length];

                return (
                  <motion.div
                    key={benefit.title}
                    variants={itemVariants}
                    className="rounded-xl bg-white/45 p-3 shadow-lg backdrop-blur-[8px] border border-white/40 sm:p-4 md:p-6"
                  >
                    <div className={`mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}>
                      <Icon className={`h-6 w-6 ${colors.text}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:mt-3 sm:text-base">
                      {benefit.previewText || benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
