import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForElement(locator: Locator, timeout: number = 15000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `playwright-report/screenshots/${name}.png`, fullPage: true });
  }

  // Cart icon is present on all pages via the shared header
  get cartIcon(): Locator {
    return this.page.locator('shop-cart-button, a[href="/cart"], [href*="cart"]').first();
  }

  get cartBadge(): Locator {
    return this.page.locator('shop-badge, .cart-badge, [part="badge"]').first();
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator('shop-badge').first();
    const isVisible = await badge.isVisible().catch(() => false);
    if (!isVisible) return 0;
    const text = await badge.textContent().catch(() => '0');
    return parseInt(text?.trim() || '0', 10);
  }

  async clickCartIcon(): Promise<void> {
    await this.page.locator('a[href="/cart"]').first().click();
    await this.waitForNavigation();
  }

  async waitForAppReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    // Polymer apps need extra time for custom elements to upgrade
    await this.page.waitForTimeout(1000);
  }
}
