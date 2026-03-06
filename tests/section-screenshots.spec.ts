import { test, expect } from '@playwright/test';

const URL = process.env.TEST_URL || 'http://localhost:3000';

const sections = [
  { id: 'hero', name: 'hero' },
  { id: 'project', name: 'project-overview' },
  { id: 'benefits', name: 'benefits' },
  { id: 'environmental', name: 'environmental' },
  { id: 'site-design', name: 'site-design' },
  { id: 'faq', name: 'faq' },
];

test('capture all section screenshots', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  for (const section of sections) {
    // Scroll to section
    await page.locator(`#${section.id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({
      path: `test-results/section-${section.name}.png`,
      fullPage: false
    });
    console.log(`Captured: ${section.name}`);
  }
});

test('FAQ accordion functionality', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  // Navigate to FAQ section
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Find accordion triggers
  const accordionTriggers = page.locator('[data-state]').or(
    page.locator('button[aria-expanded]')
  ).or(
    page.locator('[role="button"]')
  );

  const count = await accordionTriggers.count();
  console.log(`Found ${count} potential accordion triggers`);

  // Try to click first FAQ item
  const faqButtons = page.locator('#faq button');
  const faqCount = await faqButtons.count();
  console.log(`Found ${faqCount} buttons in FAQ section`);

  if (faqCount > 0) {
    // Screenshot before click
    await page.screenshot({ path: 'test-results/faq-before-click.png' });

    // Click first FAQ
    await faqButtons.first().click();
    await page.waitForTimeout(300);

    // Screenshot after click
    await page.screenshot({ path: 'test-results/faq-after-click.png' });
  }
});

test('header scroll behavior', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  // Scroll to benefits section
  await page.locator('#benefits').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Check if header overlaps content
  const header = page.locator('header');
  const headerBox = await header.boundingBox();
  console.log(`Header height: ${headerBox?.height}px`);

  // Screenshot showing potential overlap
  await page.screenshot({ path: 'test-results/header-overlap.png' });
});
