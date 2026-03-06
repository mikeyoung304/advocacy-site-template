import Image from 'next/image';
import { Droplets, Leaf, CheckCircle, Wrench } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { environmentalContent } from '@/lib/content';

export function Environmental() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span id="environmental" className="scroll-anchor" />
        {/* Mobile: Stacked layout - image then text */}
        <div className="mb-12 md:hidden">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {environmentalContent.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
                {environmentalContent.subtitle}
              </p>
            </div>
          </FadeIn>
          <div className="mt-8 overflow-hidden rounded-2xl">
            <div className="aspect-[16/9] relative w-full">
              <Image
                src="/images/prairie-landscape.webp"
                alt={environmentalContent.landscapeImageAlt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Desktop: Overlaid text on image */}
        <div className="relative mb-16 hidden overflow-hidden rounded-2xl md:block">
          <div className="aspect-[16/9] w-full lg:aspect-[21/9]">
            <Image
              src="/images/prairie-landscape.webp"
              alt={environmentalContent.landscapeImageAlt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-bottom"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {environmentalContent.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                {environmentalContent.subtitle}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Cooling Approach */}
        <FadeIn delay={0.1}>
          <div className="mb-12">
            <Card className="border-0" interactive>
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <Leaf className="h-6 w-6 text-primary-dark" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">{environmentalContent.cooling.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-muted">{environmentalContent.cooling.description}</p>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Recycled Water */}
          <FadeIn delay={0.2}>
            <Card className="h-full border-0" interactive>
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <Droplets className="h-6 w-6 text-primary-dark" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">{environmentalContent.recycledWater.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-muted">{environmentalContent.recycledWater.description}</p>
                <ul className="mt-4 space-y-3">
                  {environmentalContent.recycledWater.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-foreground-muted">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm italic text-foreground-muted/80">
                  {environmentalContent.recycledWater.note}
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Community Infrastructure Benefits */}
          <FadeIn delay={0.3}>
            <Card className="h-full border-0" interactive>
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <Wrench className="h-6 w-6 text-primary-dark" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">
                  {environmentalContent.communityBenefits.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-muted">
                  {environmentalContent.communityBenefits.description}
                </p>
                <ul className="mt-4 space-y-3">
                  {environmentalContent.communityBenefits.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-foreground-muted">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm italic text-foreground-muted/80">
                  {environmentalContent.communityBenefits.note}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
