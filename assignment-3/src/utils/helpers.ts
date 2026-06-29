import { Page } from '@playwright/test';

export async function waitForPolymerApp(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);
}

export async function navigateAndWait(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await waitForPolymerApp(page);
}

export function extractPrice(priceText: string): number {
  const match = priceText.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export async function addProductToCart(page: Page, categoryPath: string): Promise<void> {
  await navigateAndWait(page, categoryPath);
  const firstProduct = page.locator('a[href*="/detail/"]').first();
  await firstProduct.waitFor({ state: 'visible', timeout: 20000 });
  await firstProduct.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const addBtn = page.locator('button:has-text("Add to Cart"), button:has-text("ADD TO CART")').first();
  const isVisible = await addBtn.isVisible().catch(() => false);
  if (isVisible) {
    await addBtn.click();
    await page.waitForTimeout(1500);
  }
}

export async function getCartBadgeCount(page: Page): Promise<number> {
  const badge = page.locator('shop-badge').first();
  const isVisible = await badge.isVisible().catch(() => false);
  if (!isVisible) return 0;
  const text = await badge.textContent().catch(() => '0');
  return parseInt(text?.trim() || '0', 10);
}

export async function clearCart(page: Page): Promise<void> {
  await page.goto('/cart');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  let removeButtons = await page.locator('[class*="remove-btn"], button[aria-label*="remove" i]').count();
  while (removeButtons > 0) {
    await page.locator('[class*="remove-btn"], button[aria-label*="remove" i]').first().click();
    await page.waitForTimeout(500);
    removeButtons = await page.locator('[class*="remove-btn"], button[aria-label*="remove" i]').count();
  }
}

export function generateRandomString(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export async function takeScreenshotOnFailure(page: Page, testName: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `playwright-report/screenshots/${testName}-${timestamp}.png`,
    fullPage: true,
  });
}
