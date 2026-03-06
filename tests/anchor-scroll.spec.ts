import { test, expect } from '@playwright/test';

const URL = process.env.TEST_URL || 'http://localhost:3000';

test('anchor links scroll correctly without header overlap', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  // Click on FAQ nav link
  await page.click('a[href="#faq"]');
  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({ path: 'test-results/anchor-faq.png' });

  // Check that FAQ title is visible (not hidden by header)
  const faqTitle = page.locator('#faq h2');
  const box = await faqTitle.boundingBox();
  const header = page.locator('header');
  const headerBox = await header.boundingBox();

  console.log(`Header bottom: ${headerBox?.y! + headerBox?.height!}px`);
  console.log(`FAQ title top: ${box?.y}px`);

  // FAQ title should be below the header
  expect(box?.y).toBeGreaterThan(headerBox?.y! + headerBox?.height!);
});

test('FAQ accordion toggles on click', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  // Navigate to FAQ
  await page.click('a[href="#faq"]');
  await page.waitForTimeout(500);

  // Find a closed accordion (the 3rd one should be closed)
  const closedTrigger = page.locator('#faq button').nth(2);
  const triggerText = await closedTrigger.textContent();
  console.log(`Clicking on: ${triggerText}`);

  // Get initial state
  const contentBefore = page.locator('#faq [data-state="open"]');
  const openCountBefore = await contentBefore.count();
  console.log(`Open accordions before: ${openCountBefore}`);

  // Click to expand
  await closedTrigger.click();
  await page.waitForTimeout(500);

  // Screenshot after click
  await page.screenshot({ path: 'test-results/accordion-expanded.png' });

  // Check state changed
  const contentAfter = page.locator('#faq [data-state="open"]');
  const openCountAfter = await contentAfter.count();
  console.log(`Open accordions after: ${openCountAfter}`);

  // Should have one more open
  expect(openCountAfter).toBeGreaterThan(openCountBefore);
});
