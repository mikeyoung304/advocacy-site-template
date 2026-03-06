import Image from 'next/image';
import { TreePine, CheckCircle, Layers, Briefcase } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { siteDesignContent } from '@/lib/content';
import { LandUseComparison } from './land-use-comparison';

export function SiteDesign() {
  const { landscapeBuffer, localRepresentation } = siteDesignContent;

  return (
    <section className="bg-background-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span id="site-design" className="scroll-anchor" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {siteDesignContent.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">{siteDesignContent.subtitle}</p>
          </div>
        </FadeIn>

        {/* Design Features */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl md:mt-16">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                <TreePine className="h-6 w-6 text-primary-dark" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{siteDesignContent.designFeaturesHeading}</h3>
            </div>

            <div className="rounded-xl bg-background shadow-card p-6 md:p-8">
              <ul className="grid gap-4 sm:grid-cols-2">
                {siteDesignContent.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-foreground-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center text-sm italic text-foreground-muted">
                {siteDesignContent.note}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Landscape Buffer */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-4xl md:mt-16">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                <Layers className="h-6 w-6 text-primary-dark" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {landscapeBuffer.heading}
              </h3>
            </div>

            <div className="group overflow-hidden rounded-2xl bg-background shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 transition-all duration-300 group-hover:from-primary/60 group-hover:via-primary group-hover:to-primary/60" />

              <div className="p-2 md:p-4">
                <div className="relative aspect-[16/5] w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src="/images/buffer-planting-study.webp"
                    alt={landscapeBuffer.elevationImageAlt}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="px-2 pb-2 md:px-4 md:pb-4">
                <div className="relative aspect-[16/4] w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src="/images/landscape-buffer-overhead.png"
                    alt={landscapeBuffer.overheadImageAlt}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="border-t border-foreground-muted/10 bg-background-secondary/30 px-6 py-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/70">
                    {landscapeBuffer.elevationLabel}
                  </span>
                  <p className="text-sm text-foreground-muted">
                    {landscapeBuffer.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Local Representation - only renders when configured */}
        {localRepresentation && (
          <FadeIn delay={0.3}>
            <div className="mx-auto mt-12 max-w-4xl md:mt-16">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <Briefcase className="h-6 w-6 text-primary-dark" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {localRepresentation.heading}
                </h3>
              </div>

              <div className="overflow-hidden rounded-2xl bg-background shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <div className="p-6 md:p-8">
                  <p className="text-center text-foreground-muted leading-relaxed">
                    {localRepresentation.description}
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
                    {localRepresentation.firms.map((firm) => (
                      <div key={firm.name} className="relative h-16 w-64">
                        <Image
                          src={firm.logoPath}
                          alt={firm.logoAlt}
                          fill
                          sizes="256px"
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Land Use Comparison - embedded within Community Integration */}
        <LandUseComparison embedded />
      </div>
    </section>
  );
}
