import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { ProjectOverview } from '@/components/sections/project-overview';
import { WhyThisMatters } from '@/components/sections/why-this-matters';
import { Benefits } from '@/components/sections/benefits';
import { Environmental } from '@/components/sections/environmental';
import { SiteDesign } from '@/components/sections/site-design';
import { FAQ } from '@/components/sections/faq';
import { Footer } from '@/components/footer';
import { enabledSections } from '@/lib/content';

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Hero always renders regardless of enabledSections */}
        <Hero />
        {enabledSections.includes('project') && <ProjectOverview />}
        {enabledSections.includes('why-this-matters') && <WhyThisMatters />}
        {enabledSections.includes('benefits') && <Benefits />}
        {enabledSections.includes('environmental') && <Environmental />}
        {enabledSections.includes('site-design') && <SiteDesign />}
        {enabledSections.includes('faq') && <FAQ />}
      </main>
      <Footer />
    </div>
  );
}
