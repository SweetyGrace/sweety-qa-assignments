import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get productItems(): Locator {
    return this.page.locator('a[href*="/detail/"]');
  }

  get productNames(): Locator {
    return this.page.locator('shop-list-section .name, [class*="product-name"], shop-product-item .name');
  }

  get pageHeading(): Locator {
    return this.page.locator('shop-list h2, shop-list .title, [class*="category-title"]').first();
  }

  get loadingSpinner(): Locator {
    return this.page.locator('paper-spinner, [class*="loading"], [class*="spinner"]').first();
  }

  get breadcrumb(): Locator {
    return this.page.locator('[class*="breadcrumb"], shop-breadcrumb').first();
  }

  // Actions
  async navigateToCategory(categoryPath: string): Promise<void> {
    await this.navigate(categoryPath);
    await this.waitForAppReady();
    await this.waitForProductsToLoad();
  }

  async waitForProductsToLoad(): Promise<void> {
    await this.page.waitForSelector('a[href*="/detail/"]', { timeout: 20000 });
  }

  async getProductCount(): Promise<number> {
    await this.waitForProductsToLoad();
    return await this.productItems.count();
  }

  async getProductNames(): Promise<string[]> {
    await this.waitForProductsToLoad();
    const count = await this.productItems.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.productItems.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async clickProduct(index: number = 0): Promise<void> {
    await this.waitForProductsToLoad();
    await this.productItems.nth(index).click();
    await this.waitForNavigation();
  }

  async clickProductByName(name: string): Promise<void> {
    await this.waitForProductsToLoad();
    const product = this.page.locator(`a[href*="/detail/"]:has-text("${name}")`).first();
    await product.waitFor({ state: 'visible', timeout: 10000 });
    await product.click();
    await this.waitForNavigation();
  }

  async isOnListPage(category: string): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes(category);
  }

  async getPageHeadingText(): Promise<string> {
    const heading = this.page.locator('h2, [class*="title"]').first();
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    return (await heading.textContent())?.trim() || '';
  }
}
