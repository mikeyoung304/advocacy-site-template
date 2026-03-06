'use client';

import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { faqContent, noiseComparisonData } from '@/lib/content';

function NoiseComparisonTable() {
  return (
    <div className="mt-6">
      {/* Card wrapper matching site design */}
      <div className="overflow-hidden rounded-xl bg-background shadow-card">
        {/* Semantic table for accessibility */}
        <table className="w-full">
          <caption className="border-b border-foreground-muted/10 bg-gradient-to-r from-primary/5 to-transparent px-4 py-3 text-left">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              {faqContent.noiseTableCaption}
            </span>
          </caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Sound Source</th>
              <th scope="col">Decibel Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground-muted/5">
            {noiseComparisonData.map((row, index) => {
              const IconComponent = row.icon === 'low' ? VolumeX : row.icon === 'medium' ? Volume1 : Volume2;
              return (
                <tr
                  key={row.source}
                  className={`
                    group transition-all duration-200
                    ${row.isHighlighted
                      ? 'bg-primary/[0.04] hover:bg-primary/[0.06]'
                      : index % 2 === 1 ? 'bg-background-secondary/30 hover:bg-background-secondary/50' : 'bg-background hover:bg-background-secondary/20'
                    }
                  `}
                >
                  <th scope="row" className="px-4 py-3 text-left font-normal">
                    <div className="flex items-center gap-3">
                      <div className={`
                        flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105
                        ${row.isHighlighted
                          ? 'bg-primary/10'
                          : row.icon === 'high' ? 'bg-amber-50' : 'bg-background-secondary'
                        }
                      `}>
                        <IconComponent
                          className={`h-4 w-4 transition-colors ${
                            row.isHighlighted
                              ? 'text-primary'
                              : row.icon === 'high' ? 'text-amber-600' : 'text-foreground-muted/60'
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <span className={`text-sm transition-colors ${row.isHighlighted ? 'font-medium text-primary' : 'text-foreground-muted group-hover:text-foreground'}`}>
                        {row.source}
                      </span>
                    </div>
                  </th>
                  <td className="px-4 py-3 text-right">
                    <span className={`
                      rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 group-hover:shadow-sm
                      ${row.isHighlighted
                        ? 'bg-primary/10 text-primary'
                        : row.icon === 'high'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-background-secondary text-foreground-muted'
                      }
                    `}>
                      {row.level}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="border-t border-foreground-muted/10 bg-background-secondary/30 px-4 py-2.5">
                <p className="text-center text-[11px] text-foreground-muted/60">
                  {faqContent.noiseTableFooter}
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="bg-background-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span id="faq" className="scroll-anchor" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {faqContent.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              {faqContent.subtitle}
            </p>
            <p className="mt-3 text-sm text-foreground-muted/70">
              Click any question to expand or collapse the answer.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-3xl md:mt-16">
            <Accordion
              type="multiple"
              className="w-full"
            >
              {faqContent.items.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                    {item.hasNoiseTable && <NoiseComparisonTable />}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
