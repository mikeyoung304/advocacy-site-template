'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeIn } from '@/components/fade-in';
import { projectOverviewContent } from '@/lib/content';
import { containerVariants, itemVariants, VIEWPORT_CONFIG } from '@/lib/animations';

export function ProjectOverview() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span id="project" className="scroll-anchor" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {projectOverviewContent.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
              {projectOverviewContent.description}
            </p>
          </div>
        </FadeIn>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-5"
        >
          {projectOverviewContent.facts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-default rounded-xl bg-background p-6 text-center shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <p className="text-2xl font-bold tabular-nums tracking-tight text-primary sm:text-3xl">
                {fact.value}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground-muted">
                {fact.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Site Plan Image */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-5xl md:mt-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-foreground-muted/20 bg-white shadow-lg">
              <Image
                src="/images/site-plan-full.png"
                alt={projectOverviewContent.sitePlanImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-contain p-2"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-center text-sm text-foreground-muted">
              {projectOverviewContent.sitePlanCaption}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
