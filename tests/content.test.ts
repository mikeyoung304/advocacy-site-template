import { describe, it, expect } from 'vitest';
import {
  siteConfig,
  heroContent,
  projectOverviewContent,
  economicContent,
  environmentalContent,
  siteDesignContent,
  faqContent,
  footerContent,
  navLinks,
  enabledSections,
  getVisibleNavLinks,
} from '@/lib/content';

describe('Site Content Validation', () => {
  describe('siteConfig', () => {
    it('should have all required fields', () => {
      expect(siteConfig.projectName).toBeTruthy();
      expect(siteConfig.location).toBeTruthy();
      expect(siteConfig.stateName).toBeTruthy();
      expect(siteConfig.totalInvestment).toBeTruthy();
      expect(siteConfig.facilitySize).toBeTruthy();
      expect(siteConfig.powerCapacity).toBeTruthy();
      expect(siteConfig.buildingCount).toBeTruthy();
    });
  });

  describe('heroContent', () => {
    it('should have all required fields', () => {
      expect(heroContent.headline).toBeTruthy();
      expect(heroContent.subheadline).toBeTruthy();
      expect(heroContent.ctaText).toBeTruthy();
      expect(heroContent.trustStrip).toBeTruthy();
      expect(heroContent.heroImageAlt).toBeTruthy();
    });
  });

  describe('projectOverviewContent', () => {
    it('should have 5 key facts', () => {
      expect(projectOverviewContent.facts).toHaveLength(5);
    });

    it('should include Capital Investment fact', () => {
      const investmentFact = projectOverviewContent.facts.find(
        (f) => f.label === 'Capital Investment'
      );
      expect(investmentFact).toBeDefined();
    });

    it('should have info sections with items', () => {
      expect(projectOverviewContent.whyDataCentersMatter.items.length).toBeGreaterThan(0);
      expect(projectOverviewContent.characteristics.items.length).toBeGreaterThan(0);
    });
  });

  describe('economicContent', () => {
    it('should have construction and operational phases', () => {
      expect(economicContent.constructionPhase.perBuilding.items.length).toBeGreaterThan(0);
      expect(economicContent.constructionPhase.entireCampus.items.length).toBeGreaterThan(0);
      expect(economicContent.operationalPhase.items.length).toBeGreaterThan(0);
    });
  });

  describe('faqContent', () => {
    it('should have at least 5 FAQs', () => {
      expect(faqContent.items.length).toBeGreaterThanOrEqual(5);
    });

    it('should include noise level FAQ with noise table', () => {
      const noiseFaq = faqContent.items.find((faq) =>
        faq.question.toLowerCase().includes('noise')
      );
      expect(noiseFaq).toBeDefined();
      expect(noiseFaq?.hasNoiseTable).toBe(true);
    });
  });

  describe('environmentalContent', () => {
    it('should mention efficient cooling', () => {
      expect(environmentalContent.cooling.description).toBeTruthy();
    });

    it('should include recycled water options', () => {
      expect(environmentalContent.recycledWater.items.length).toBeGreaterThan(0);
    });
  });

  describe('siteDesignContent', () => {
    it('should have 4 design features', () => {
      expect(siteDesignContent.features).toHaveLength(4);
    });

    it('should include setbacks', () => {
      expect(
        siteDesignContent.features.some((f) =>
          f.toLowerCase().includes('setback')
        )
      ).toBe(true);
    });

    it('should include landscaping', () => {
      expect(
        siteDesignContent.features.some((f) =>
          f.toLowerCase().includes('landscaping')
        )
      ).toBe(true);
    });
  });

  describe('navLinks', () => {
    it('should have links for all main sections', () => {
      const hrefs = navLinks.map((link) => link.href);
      expect(hrefs).toContain('#project');
      expect(hrefs).toContain('#benefits');
      expect(hrefs).toContain('#environmental');
      expect(hrefs).toContain('#site-design');
      expect(hrefs).toContain('#faq');
    });
  });

  describe('footerContent', () => {
    it('should have all required fields', () => {
      expect(footerContent.projectName).toBeTruthy();
      expect(footerContent.disclaimer).toBeTruthy();
      expect(footerContent.contactNote).toBeTruthy();
      expect(footerContent.ctaParagraph).toBeTruthy();
    });
  });

  describe('enabledSections', () => {
    it('should have all default sections enabled', () => {
      expect(enabledSections).toContain('project');
      expect(enabledSections).toContain('why-this-matters');
      expect(enabledSections).toContain('benefits');
      expect(enabledSections).toContain('environmental');
      expect(enabledSections).toContain('site-design');
      expect(enabledSections).toContain('faq');
    });
  });

  describe('getVisibleNavLinks', () => {
    it('should return nav links for enabled sections', () => {
      const visibleLinks = getVisibleNavLinks();
      const hrefs = visibleLinks.map((link) => link.href);
      expect(hrefs).toContain('#project');
      expect(hrefs).toContain('#faq');
    });
  });
});
