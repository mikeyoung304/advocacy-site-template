'use client';

import { motion, type Variants } from 'framer-motion';
import { BarChart3, CheckCircle2, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { useState, useEffect, useRef } from 'react';
import { SPRING_TRANSITION } from '@/lib/animations';
import { landUseComparisonContent } from '@/lib/content';

// Table uses faster stagger for row-by-row reveal
const tableContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

// Rows animate from the left instead of below
const rowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_TRANSITION,
  },
};

interface LandUseComparisonProps {
  embedded?: boolean;
}

export function LandUseComparison({ embedded = false }: LandUseComparisonProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollLeft > 20) {
        setShowScrollHint(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const content = landUseComparisonContent;

  const tableContent = (
    <>
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <BarChart3 className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className={embedded ? "text-xl font-semibold tracking-tight text-foreground" : "text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"}>
              {content.heading}
            </h3>
          </div>
          {!embedded && (
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              {content.subtitle}
            </p>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className={embedded ? "mt-6" : "mt-12 md:mt-16"}>
          <div className="overflow-hidden rounded-2xl bg-background shadow-card transition-shadow duration-300 hover:shadow-card-hover">
            {/* Table header bar */}
            <div className="border-b border-foreground-muted/10 bg-gradient-to-r from-primary via-primary to-primary-hover px-4 py-3 shadow-sm sm:px-6 sm:py-4">
              <p className="text-center text-xs font-medium tracking-wide text-white sm:text-sm">
                {content.tableHeaderText}
              </p>
            </div>

            {/* Scrollable table container with fade indicator */}
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scroll-smooth md:overflow-x-visible"
                style={{
                  scrollSnapType: 'x proximity',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <table className="w-full min-w-[580px]">
                  <thead>
                    <tr className="border-b border-foreground-muted/10">
                      <th
                        scope="col"
                        className="sticky left-0 z-10 min-w-[90px] bg-background-secondary px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] sm:min-w-[120px] sm:px-6 sm:py-4 md:static md:shadow-none"
                      >
                        {content.columnHeaders.category}
                      </th>
                      <th
                        scope="col"
                        className="min-w-[110px] bg-primary/5 px-2 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary sm:min-w-[160px] sm:px-6 sm:py-4"
                      >
                        {content.columnHeaders.dataCenter}
                      </th>
                      <th
                        scope="col"
                        className="min-w-[100px] bg-background-secondary px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted sm:min-w-[160px] sm:px-6 sm:py-4"
                      >
                        {content.columnHeaders.warehouse}
                      </th>
                      <th
                        scope="col"
                        className="min-w-[100px] bg-background-secondary px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted sm:min-w-[160px] sm:px-6 sm:py-4"
                      >
                        {content.columnHeaders.retail}
                      </th>
                      <th
                        scope="col"
                        className="min-w-[100px] bg-background-secondary px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted sm:min-w-[160px] sm:px-6 sm:py-4"
                      >
                        {content.columnHeaders.residential}
                      </th>
                    </tr>
                  </thead>
                  <motion.tbody
                    variants={tableContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    {content.rows.map((row, index) => {
                      const isEvenRow = index % 2 === 0;
                      return (
                        <motion.tr
                          key={row.category}
                          variants={rowVariants}
                          className={`
                            group border-b border-foreground-muted/5 transition-colors duration-200
                            ${isEvenRow ? 'bg-background' : 'bg-background-secondary'}
                            active:bg-primary/5
                          `}
                        >
                          <th
                            scope="row"
                            className={`sticky left-0 z-10 px-2 py-3 text-[13px] font-medium text-foreground shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] transition-colors sm:px-6 sm:py-4 sm:text-sm md:static md:shadow-none ${isEvenRow ? 'bg-background' : 'bg-background-secondary'}`}
                          >
                            {row.category}
                          </th>
                          <td
                            className="bg-primary/[0.03] px-2 py-3 transition-colors active:bg-primary/10 sm:px-6 sm:py-4"
                          >
                            <span className="inline-flex items-start gap-1 text-[13px] font-medium text-primary sm:gap-2 sm:text-sm">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70 sm:h-4 sm:w-4" aria-hidden="true" />
                              {row.dataCenter}
                            </span>
                          </td>
                          <td
                            className="px-2 py-3 text-[13px] text-foreground-muted transition-colors active:bg-primary/5 sm:px-6 sm:py-4 sm:text-sm"
                          >
                            {row.warehouse}
                          </td>
                          <td
                            className="px-2 py-3 text-[13px] text-foreground-muted transition-colors active:bg-primary/5 sm:px-6 sm:py-4 sm:text-sm"
                          >
                            {row.retail}
                          </td>
                          <td
                            className="px-2 py-3 text-[13px] text-foreground-muted transition-colors active:bg-primary/5 sm:px-6 sm:py-4 sm:text-sm"
                          >
                            {row.residential}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </motion.tbody>
                </table>
              </div>

              {/* Right edge fade gradient - mobile only */}
              <div
                className={`pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 md:hidden ${
                  showScrollHint ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />

              {/* Scroll indicator with animated chevron - mobile only */}
              {showScrollHint && (
                <div className="pointer-events-none absolute right-2 top-1/2 z-20 -translate-y-1/2 md:hidden">
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.5,
                    }}
                    className="flex items-center gap-0.5 rounded-full bg-primary/90 px-2 py-1 shadow-lg"
                  >
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-white" />
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Footer note */}
            <div className="border-t border-foreground-muted/10 bg-background-secondary/30 px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-center text-xs text-foreground-muted sm:text-sm">
                {content.footerNote}
              </p>
              {/* Mobile scroll hint text */}
              <p className="mt-1.5 text-center text-xs text-foreground-muted/70 md:hidden">
                {content.mobileHint}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );

  if (embedded) {
    return <div className="mx-auto mt-12 max-w-5xl md:mt-16">{tableContent}</div>;
  }

  return (
    <section id="land-use-comparison" className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {tableContent}
      </div>
    </section>
  );
}
