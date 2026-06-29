import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type PolymerShopFixtures = {
  homePage: HomePage;
  productListPage: ProductListPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  pageWithCart: { page: Page; cartPage: CartPage; productDetailPage: ProductDetailPage };
};

export const test = base.extend<PolymerShopFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productListPage: async ({ page }, use) => {
    const productListPage = new ProductListPage(page);
    await use(productListPage);
  },

  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  // Composite fixture: navigates to a product and adds it to cart, returns CartPage
  pageWithCart: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    // Navigate to a known product in men's outerwear
    await page.goto('/list/mens_outerwear');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Click first product
    const firstProduct = page.locator('a[href*="/detail/"]').first();
    await firstProduct.waitFor({ state: 'visible', timeout: 20000 });
    await firstProduct.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Add to cart
    const addBtn = page.locator('button:has-text("Add to Cart"), button:has-text("ADD TO CART")').first();
    const isVisible = await addBtn.isVisible().catch(() => false);
    if (isVisible) {
      await addBtn.click();
      await page.waitForTimeout(1500);
    }

    await use({ page, cartPage, productDetailPage });
  },
});

export { expect } from '@playwright/test';
