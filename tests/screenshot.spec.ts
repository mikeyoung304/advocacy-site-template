import { test } from '@playwright/test';

const URL = process.env.TEST_URL || 'http://localhost:3000';

test('capture page screenshot', async ({ page }) => {
  await page.goto(URL);

  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');

  // Wait a bit for animations
  await page.waitForTimeout(1000);

  // Take full page screenshot
  await page.screenshot({ path: 'test-results/page-screenshot.png', fullPage: false });

  console.log('Screenshot saved to test-results/page-screenshot.png');
});
