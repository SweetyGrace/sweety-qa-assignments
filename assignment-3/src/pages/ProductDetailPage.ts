import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get productTitle(): Locator {
    return this.page.locator('shop-detail .title, [class*="product-title"], h1').first();
  }

  get productPrice(): Locator {
    return this.page.locator('shop-detail .price, [class*="price"]').first();
  }

  get productDescription(): Locator {
    return this.page.locator('shop-detail .description, [class*="description"]').first();
  }

  get sizeSelector(): Locator {
    return this.page.locator('shop-select select, select[name="size"], select').first();
  }

  get quantityInput(): Locator {
    return this.page.locator('shop-detail input[type="number"], input[name="quantity"], input[aria-label*="quantity" i]').first();
  }

  get addToCartButton(): Locator {
    return this.page.locator('shop-detail button:has-text("Add to Cart"), button:has-text("ADD TO CART")').first();
  }

  get productImage(): Locator {
    return this.page.locator('shop-detail iron-image, shop-detail img, [class*="product-image"] img').first();
  }

  get backButton(): Locator {
    return this.page.locator('a:has-text("Back"), shop-detail [class*="back"]').first();
  }

  get addToCartConfirmation(): Locator {
    return this.page.locator('shop-cart-modal, [class*="toast"], [class*="notification"], paper-toast').first();
  }

  get outOfStockMessage(): Locator {
    return this.page.locator('[class*="out-of-stock"], :has-text("Out of stock")').first();
  }

  // Actions
  async waitForProductLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async getProductTitle(): Promise<string> {
    // Polymer Web Components render h1 in shadow DOM — use 'attached' not 'visible'
    const title = this.page.locator('h1, [class*="title"], [class*="name"]').first();
    await title.waitFor({ state: 'attached', timeout: 15000 });
    const text = await title.textContent().catch(() => '');
    if (text?.trim()) return text.trim();
    // Fallback: extract from URL  /detail/<category>/<id>
    const url = this.page.url();
    const match = url.match(/\/detail\/[^/]+\/(.+)/);
    return match ? decodeURIComponent(match[1]).replace(/_/g, ' ') : '';
  }

  async getProductPrice(): Promise<string> {
    await this.page.waitForTimeout(500);
    const price = this.page.locator('[class*="price"]').first();
    const isVisible = await price.isVisible().catch(() => false);
    if (!isVisible) return '';
    return (await price.textContent())?.trim() || '';
  }

  async selectSize(size: string): Promise<void> {
    const select = this.page.locator('select').first();
    await select.waitFor({ state: 'visible', timeout: 10000 });
    await select.selectOption({ label: size });
  }

  async setQuantity(quantity: number): Promise<void> {
    const qtyInput = this.page.locator('input[type="number"]').first();
    const isVisible = await qtyInput.isVisible().catch(() => false);
    if (isVisible) {
      await qtyInput.fill(String(quantity));
    }
  }

  async addToCart(): Promise<void> {
    const btn = this.page.locator('button:has-text("Add to Cart"), button:has-text("ADD TO CART")').first();
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    // Wait for cart to update
    await this.page.waitForTimeout(1500);
  }

  async addToCartAndVerify(): Promise<boolean> {
    const beforeCount = await this.getCartCount();
    await this.addToCart();
    const afterCount = await this.getCartCount();
    return afterCount > beforeCount;
  }

  async isProductLoaded(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('/detail/');
  }

  async navigateToProduct(path: string): Promise<void> {
    await this.navigate(path);
    await this.waitForProductLoad();
  }
}
