'use client';

import { motion, type Variants } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import US from 'country-flag-icons/react/3x2/US';
import Image from 'next/image';
import { FadeIn } from '@/components/fade-in';
import { whyThisMattersContent } from '@/lib/content';
import { itemVariants, VIEWPORT_CONFIG } from '@/lib/animations';

// This section uses slightly slower stagger timing for dramatic effect
const whyMattersContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

export function WhyThisMatters() {
  return (
    <section id="why-this-matters" className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {whyThisMattersContent.title}
            </h2>
          </div>
        </FadeIn>

        {/* Cards with flag background */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="aspect-[3/4] w-full sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src="/images/american-flag-sky.webp"
              alt="American flag against blue sky"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-[37%_30%] sm:object-[center_30%]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>

          {/* Cards positioned over the image */}
          <motion.div
            variants={whyMattersContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10"
          >
            <div className="grid w-full max-w-5xl gap-4 sm:gap-6 md:grid-cols-2">
            {/* The Opportunity */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-white/45 p-3 shadow-lg backdrop-blur-[8px] border border-white/40 sm:p-4 md:p-6 lg:p-8"
            >
              <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                <Lightbulb className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                {whyThisMattersContent.opportunity.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:mt-3 sm:text-base">
                {whyThisMattersContent.opportunity.text}
              </p>
            </motion.div>

            {/* National Priority */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-white/45 p-3 shadow-lg backdrop-blur-[8px] border border-white/40 sm:p-4 md:p-6 lg:p-8"
            >
              <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-light overflow-hidden">
                <US
                  title="United States"
                  className="h-8 w-8"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                {whyThisMattersContent.nationalPriority.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:mt-3 sm:text-base">
                {whyThisMattersContent.nationalPriority.text}
              </p>
            </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
