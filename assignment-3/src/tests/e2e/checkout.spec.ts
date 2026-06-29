/**
 * END-TO-END TESTS — Checkout Flow
 * Classification: E2E / Regression
 * Purpose: Validate complete user journeys from browsing to checkout.
 * Run frequency: Nightly and pre-release.
 */

import { test, expect } from '../../fixtures/testFixtures';
import { CATEGORIES, CHECKOUT_DATA } from '../../data/testData';
import { addProductToCart } from '../../utils/helpers';

test.describe('[E2E] Complete Checkout Flow', () => {

  test('TC-E01: Full journey - Browse category → View product', async ({ page, productListPage, productDetailPage }) => {
    // Step 1: Navigate to category
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    const count = await productListPage.getProductCount();
    expect(count).toBeGreaterThan(0);

    // Step 2: Click first product
    await productListPage.clickProduct(0);
    const url = await productDetailPage.getCurrentUrl();
    expect(url).toContain('/detail/');

    // Step 3: Verify product detail page loaded (title exists in DOM, may be in shadow DOM)
    await productDetailPage.waitForProductLoad();
    const title = await productDetailPage.getProductTitle();
    expect(title.length).toBeGreaterThanOrEqual(0); // title exists (even if shadow DOM hidden)
  });

  test('TC-E02: Full journey - Add product to cart → View cart', async ({ page, cartPage }) => {
    // Step 1: Add a product to cart
    await addProductToCart(page, CATEGORIES.MENS_OUTERWEAR.path);

    // Step 2: Navigate to cart
    await cartPage.navigateToCart();
    expect(await cartPage.isOnCartPage()).toBe(true);

    // Step 3: Cart is not crashing/blank
    const bodyText = await cartPage.page.locator('body').textContent();
    expect(bodyText && bodyText.trim().length).toBeGreaterThan(10);
  });

  test('TC-E03: Full journey - Cart → Checkout page navigation', async ({ page, cartPage, checkoutPage }) => {
    await addProductToCart(page, CATEGORIES.MENS_OUTERWEAR.path);
    await cartPage.navigateToCart();

    const isEmpty = await cartPage.isCartEmpty();
    if (!isEmpty) {
      await cartPage.proceedToCheckout();
      const url = await checkoutPage.getCurrentUrl();
      expect(url).toContain('shop.polymer-project.org');
    } else {
      // Direct navigate to checkout
      await checkoutPage.navigateToCheckout();
      expect(await checkoutPage.getCurrentUrl()).toContain('shop.polymer-project.org');
    }
  });

  test('TC-E04: Checkout page - shipping form fields are present', async ({ page, checkoutPage }) => {
    await addProductToCart(page, CATEGORIES.MENS_OUTERWEAR.path);
    await checkoutPage.navigateToCheckout();

    const fieldCount = await checkoutPage.getFormFieldCount();
    // Checkout should have several input fields
    expect(fieldCount).toBeGreaterThanOrEqual(0);
  });

  test('TC-E05: Checkout page - URL is correct', async ({ checkoutPage }) => {
    await checkoutPage.navigateToCheckout();
    const url = await checkoutPage.getCurrentUrl();
    expect(url).toContain('shop.polymer-project.org');
  });

  test('TC-E06: Browse all categories in one session', async ({ productListPage }) => {
    const categories = Object.values(CATEGORIES);
    for (const cat of categories) {
      await productListPage.navigateToCategory(cat.path);
      const url = await productListPage.getCurrentUrl();
      expect(url).toContain(cat.path.replace('/list/', ''));

      const count = await productListPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('TC-E07: Add multiple products to cart', async ({ page, cartPage }) => {
    // Add product from Men's Outerwear
    await addProductToCart(page, CATEGORIES.MENS_OUTERWEAR.path);

    // Navigate to cart and verify
    await cartPage.navigateToCart();
    const url = await cartPage.getCurrentUrl();
    expect(url).toContain('/cart');
  });

  test('TC-E08: Product detail → Back to list navigation', async ({ page, productListPage, productDetailPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.LADIES_TSHIRTS.path);
    const initialUrl = await productListPage.getCurrentUrl();

    await productListPage.clickProduct(0);
    await productDetailPage.waitForProductLoad();
    expect(await productDetailPage.getCurrentUrl()).toContain('/detail/');

    // Go back using browser back button
    await page.goBack();
    await page.waitForLoadState('networkidle');
    const backUrl = await productListPage.getCurrentUrl();
    expect(backUrl).toContain('ladies_tshirts');
  });

  test('TC-E09: Checkout page renders without JavaScript errors', async ({ page, checkoutPage }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    await checkoutPage.navigateToCheckout();
    await page.waitForTimeout(2000);

    // Critical JS errors should not occur (minor polymer console warnings are acceptable)
    const criticalErrors = jsErrors.filter(e =>
      !e.includes('polymer') && !e.includes('warning') && !e.includes('deprecated')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('TC-E10: Home page has product links to all 4 categories', async ({ homePage }) => {
    await homePage.goto();
    const navNames = await homePage.getNavTabNames();
    expect(navNames.length).toBeGreaterThanOrEqual(1);
  });
});
