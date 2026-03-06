import { test, expect } from '@playwright/test';

const URL = process.env.TEST_URL || 'http://localhost:3000';

// Mobile viewport (iPhone 12 Pro)
const MOBILE_VIEWPORT = { width: 390, height: 844 };

test.describe('Mobile QA - Client Demo Readiness', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test('1. Hero section renders correctly on mobile', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    // Check hero elements are visible
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('text=Learn More')).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-1-hero.png', fullPage: false });
    console.log('Hero section OK');
  });

  test('2. Mobile hamburger menu opens and closes', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    // Find hamburger button
    const menuButton = page.locator('button[aria-controls="mobile-menu"]');
    await expect(menuButton).toBeVisible();

    // Open menu
    await menuButton.click();
    await page.waitForTimeout(500);

    // Check menu is open
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-2-menu-open.png', fullPage: false });

    // Check nav links are visible
    await expect(page.locator('#mobile-menu >> text=Overview')).toBeVisible();
    await expect(page.locator('#mobile-menu >> text=Benefits')).toBeVisible();
    await expect(page.locator('#mobile-menu >> text=FAQ')).toBeVisible();

    // Close menu with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    await expect(mobileMenu).not.toBeVisible();
    console.log('Mobile menu OK');
  });

  test('3. Navigation links work on mobile', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    await page.locator('button[aria-controls="mobile-menu"]').click();
    await page.waitForTimeout(300);

    // Click FAQ link
    await page.locator('#mobile-menu >> text=FAQ').click();
    await page.waitForTimeout(1000);

    // Should scroll to FAQ section
    const faqTitle = page.locator('#faq h2');
    await expect(faqTitle).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-3-faq-nav.png', fullPage: false });
    console.log('Navigation OK');
  });

  test('4. Project Overview section on mobile', async ({ page }) => {
    await page.goto(URL + '#project');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page.locator('text=Capital Investment')).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-4-project.png', fullPage: false });
    console.log('Project Overview OK');
  });

  test('5. Benefits section on mobile', async ({ page }) => {
    await page.goto(URL + '#benefits');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page.locator('#benefits >> text=Community Benefits')).toBeVisible();
    await expect(page.locator('#benefits h3:has-text("Employment")')).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-5-benefits.png', fullPage: false });
    console.log('Benefits section OK');
  });

  test('6. Environmental section on mobile', async ({ page }) => {
    await page.goto(URL + '#environmental');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page.locator('text=Environmental Stewardship')).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-6-environmental.png', fullPage: false });
    console.log('Environmental section OK');
  });

  test('7. Site Design section on mobile', async ({ page }) => {
    await page.goto(URL + '#site-design');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page.locator('#site-design >> text=Community Integration')).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-7-site-design.png', fullPage: false });
    console.log('Site Design section OK');
  });

  test('8. FAQ accordions work on mobile', async ({ page }) => {
    await page.goto(URL + '#faq');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();

    // Find a closed accordion
    const trafficQuestion = page.locator('button:has-text("Will the project increase traffic?")');
    await expect(trafficQuestion).toBeVisible();

    // Click to expand
    await trafficQuestion.click();
    await page.waitForTimeout(500);

    // Check answer is visible
    await expect(page.locator('text=Data centers generate low traffic')).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-8-faq.png', fullPage: false });
    console.log('FAQ accordions OK');
  });

  test('9. Footer and contact info on mobile', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check footer content
    await expect(page.locator('footer')).toBeVisible();

    await page.screenshot({ path: 'test-results/mobile-9-footer.png', fullPage: false });
    console.log('Footer OK');
  });

  test('10. CTA buttons are clickable on mobile', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    // Test Learn More button
    const learnMore = page.locator('text=Learn More');
    await expect(learnMore).toBeVisible();

    // Check it has proper touch target size
    const box = await learnMore.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44); // Min touch target

    // Click and verify navigation
    await learnMore.click();
    await page.waitForTimeout(1000);

    // Should be at project section
    const url = page.url();
    expect(url).toContain('#project');

    console.log('CTA buttons OK');
  });

  test('11. Images load correctly on mobile', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    // Check hero image loaded
    const heroImg = page.locator('#hero img').first();
    await expect(heroImg).toBeVisible();

    // Verify image is from our domain (self-hosted)
    const src = await heroImg.getAttribute('src');
    expect(src).toContain('/images/');

    console.log('Images OK');
  });

  test('12. Full page scroll test', async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    // Scroll through entire page - verify sections are scrollable
    const sections = ['#hero', '#project', '#benefits', '#environmental', '#site-design', '#faq'];

    for (const section of sections) {
      await page.locator(section).scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const sectionEl = page.locator(section);
      await expect(sectionEl).toBeVisible();
    }

    console.log('Full page scroll OK');
  });
});
