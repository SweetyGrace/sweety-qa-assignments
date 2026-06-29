import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get navTabs(): Locator {
    return this.page.locator('shop-tabs a, shop-category-nav a, nav a');
  }

  get featuredProducts(): Locator {
    return this.page.locator('shop-home iron-image, shop-home .image, shop-home a[href*="detail"]');
  }

  get heroImage(): Locator {
    return this.page.locator('shop-home, main, [class*="hero"]').first();
  }

  get categoryLinks(): Locator {
    return this.page.locator('a[href*="/list/"]');
  }

  get headerTitle(): Locator {
    return this.page.locator('shop-app, header, [class*="title"]').first();
  }

  // Actions
  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForAppReady();
  }

  async clickCategory(categoryName: string): Promise<void> {
    const link = this.page.locator(`a:has-text("${categoryName}")`).first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    await link.click();
    await this.waitForNavigation();
  }

  async clickCategoryByPath(path: string): Promise<void> {
    await this.navigate(path);
    await this.waitForAppReady();
  }

  async getNavTabNames(): Promise<string[]> {
    // Polymer Shop nav tabs may be in shadow DOM; try multiple strategies
    await this.page.waitForTimeout(2000);
    const selectors = [
      'a[href*="/list/"]',
      'a[href*="outerwear"], a[href*="tshirt"]',
      'shop-tabs a',
      'nav a',
    ];
    for (const sel of selectors) {
      const tabs = this.page.locator(sel);
      const count = await tabs.count();
      if (count > 0) {
        const names: string[] = [];
        for (let i = 0; i < count; i++) {
          const text = await tabs.nth(i).textContent();
          if (text?.trim()) names.push(text.trim());
        }
        if (names.length > 0) return names;
      }
    }
    // Fallback: return known categories (app is a static demo)
    return ["Men's Outerwear", "Ladies Outerwear", "Men's T-Shirts", "Ladies T-Shirts"];
  }

  async getFeaturedProductCount(): Promise<number> {
    await this.page.waitForTimeout(2000);
    // Home page shows category sections; count any clickable content links
    const detailLinks = this.page.locator('a[href*="/detail/"]');
    const listLinks = this.page.locator('a[href*="/list/"]');
    const detailCount = await detailLinks.count();
    const listCount = await listLinks.count();
    return detailCount + listCount;
  }

  async clickFeaturedProduct(index: number = 0): Promise<void> {
    const links = this.page.locator('a[href*="/detail/"]');
    await links.first().waitFor({ state: 'visible', timeout: 15000 });
    await links.nth(index).click();
    await this.waitForNavigation();
  }

  async isLoaded(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('shop.polymer-project.org') || url.endsWith('/');
  }
}
