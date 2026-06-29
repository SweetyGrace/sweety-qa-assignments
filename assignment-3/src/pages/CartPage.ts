import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get cartItems(): Locator {
    return this.page.locator('shop-cart-item, [class*="cart-item"], shop-cart li');
  }

  get emptyCartMessage(): Locator {
    return this.page.locator('[class*="empty"], :has-text("Your cart is empty"), shop-cart [class*="empty-cart"]').first();
  }

  get checkoutButton(): Locator {
    return this.page.locator('a[href="/checkout"], button:has-text("Checkout"), button:has-text("CHECKOUT")').first();
  }

  get cartTotal(): Locator {
    return this.page.locator('[class*="total"], shop-cart .total').first();
  }

  get removeItemButtons(): Locator {
    return this.page.locator('[class*="remove"], button[title*="remove" i], shop-cart-item button');
  }

  get continueShopping(): Locator {
    return this.page.locator('a:has-text("Shop"), a[href="/"]').first();
  }

  get cartHeading(): Locator {
    return this.page.locator('shop-cart h2, shop-cart .title, [class*="cart-title"]').first();
  }

  // Actions
  async navigateToCart(): Promise<void> {
    await this.navigate('/cart');
    await this.waitForAppReady();
    await this.page.waitForTimeout(1000);
  }

  async getCartItemCount(): Promise<number> {
    await this.page.waitForTimeout(500);
    const isEmpty = await this.emptyCartMessage.isVisible().catch(() => false);
    if (isEmpty) return 0;
    return await this.cartItems.count();
  }

  async isCartEmpty(): Promise<boolean> {
    await this.page.waitForTimeout(500);
    return await this.emptyCartMessage.isVisible().catch(() => false);
  }

  async getCartItemNames(): Promise<string[]> {
    const count = await this.cartItems.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.cartItems.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async getCartTotal(): Promise<string> {
    const total = await this.cartTotal.isVisible().catch(() => false);
    if (!total) return '0';
    return (await this.cartTotal.textContent())?.trim() || '0';
  }

  async removeItem(index: number = 0): Promise<void> {
    const buttons = this.removeItemButtons;
    const count = await buttons.count();
    if (count > index) {
      await buttons.nth(index).click();
      await this.page.waitForTimeout(500);
    }
  }

  async proceedToCheckout(): Promise<void> {
    const btn = this.checkoutButton;
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.waitForNavigation();
  }

  async isOnCartPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('/cart');
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShopping.click();
    await this.waitForNavigation();
  }
}
