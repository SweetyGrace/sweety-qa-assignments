/**
 * SANITY / SMOKE TESTS
 * Classification: Sanity
 * Purpose: Verify the application is up and critical paths are functional after deployment.
 * Run frequency: After every deployment or build.
 */

import { test, expect } from '../../fixtures/testFixtures';
import { CATEGORIES } from '../../data/testData';

test.describe('[SANITY] Polymer Shop - Application Health Checks', () => {

  test('TC-S01: Home page loads successfully', async ({ homePage }) => {
    await homePage.goto();
    const url = await homePage.getCurrentUrl();
    expect(url).toContain('shop.polymer-project.org');
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
  });

  test('TC-S02: Page title is present', async ({ homePage }) => {
    await homePage.goto();
    const title = await homePage.getTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('TC-S03: Navigation categories are present (at least 1)', async ({ homePage }) => {
    await homePage.goto();
    const names = await homePage.getNavTabNames();
    // The demo app has 4 known categories; verify at least 1 is known
    expect(names.length).toBeGreaterThan(0);
  });

  test('TC-S04: Category page loads - Mens Outerwear', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    const url = await productListPage.getCurrentUrl();
    expect(url).toContain('mens_outerwear');
  });

  test('TC-S05: Category page loads - Ladies Outerwear', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.LADIES_OUTERWEAR.path);
    const url = await productListPage.getCurrentUrl();
    expect(url).toContain('ladies_outerwear');
  });

  test('TC-S06: Category page loads - Mens T-Shirts', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_TSHIRTS.path);
    const url = await productListPage.getCurrentUrl();
    expect(url).toContain('mens_tshirts');
  });

  test('TC-S07: Category page loads - Ladies T-Shirts', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.LADIES_TSHIRTS.path);
    const url = await productListPage.getCurrentUrl();
    expect(url).toContain('ladies_tshirts');
  });

  test('TC-S08: Product list shows products', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    const count = await productListPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-S09: Product detail page opens from list', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    await productListPage.clickProduct(0);
    const url = await productListPage.getCurrentUrl();
    expect(url).toContain('/detail/');
  });

  test('TC-S10: Cart page is accessible', async ({ cartPage }) => {
    await cartPage.navigateToCart();
    const isOnCart = await cartPage.isOnCartPage();
    expect(isOnCart).toBe(true);
  });
});
