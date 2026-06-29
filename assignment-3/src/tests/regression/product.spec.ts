/**
 * REGRESSION TESTS — Product Display
 * Classification: Regression
 * Purpose: Verify product listing and detail page render correctly across all categories.
 * Run frequency: On every PR merge and nightly.
 */

import { test, expect } from '../../fixtures/testFixtures';
import { CATEGORIES } from '../../data/testData';

test.describe('[REGRESSION] Product Display & Detail', () => {

  test('TC-P01: Men\'s Outerwear category has products', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    const count = await productListPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-P02: Ladies Outerwear category has products', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.LADIES_OUTERWEAR.path);
    const count = await productListPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-P03: Men\'s T-Shirts category has products', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_TSHIRTS.path);
    const count = await productListPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-P04: Ladies T-Shirts category has products', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.LADIES_TSHIRTS.path);
    const count = await productListPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-P05: Product detail page has content (DOM-level verification)', async ({ productListPage, productDetailPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    await productListPage.clickProduct(0);
    await productDetailPage.waitForProductLoad();

    // Polymer renders title in shadow DOM; verify URL + DOM body
    const url = await productDetailPage.getCurrentUrl();
    expect(url).toContain('/detail/');
    const body = await productDetailPage.page.locator('body').textContent();
    expect(body && body.trim().length).toBeGreaterThan(0);
  });

  test('TC-P06: Product detail URL contains /detail/', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    await productListPage.clickProduct(0);
    expect(await productListPage.getCurrentUrl()).toContain('/detail/');
  });

  test('TC-P07: Product list items are anchor links to detail pages', async ({ productListPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_OUTERWEAR.path);
    const firstHref = await productListPage.page.locator('a[href*="/detail/"]').first().getAttribute('href');
    expect(firstHref).toContain('/detail/');
  });

  test('TC-P08: Each category page URL is unique', async ({ productListPage }) => {
    const urls: string[] = [];
    for (const cat of Object.values(CATEGORIES)) {
      await productListPage.navigateToCategory(cat.path);
      urls.push(await productListPage.getCurrentUrl());
    }
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(Object.keys(CATEGORIES).length);
  });

  test('TC-P09: Product detail page has Add to Cart button', async ({ productListPage, productDetailPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.LADIES_OUTERWEAR.path);
    await productListPage.clickProduct(0);
    await productDetailPage.waitForProductLoad();

    const btn = productDetailPage.addToCartButton;
    const isVisible = await btn.isVisible().catch(() => false);
    expect(isVisible).toBe(true);
  });

  test('TC-P10: Product list renders for each category within timeout', async ({ productListPage }) => {
    for (const cat of Object.values(CATEGORIES)) {
      const start = Date.now();
      await productListPage.navigateToCategory(cat.path);
      await productListPage.getProductCount();
      const elapsed = Date.now() - start;
      // Should load within 20s
      expect(elapsed).toBeLessThan(20000);
    }
  });

  test('TC-P11: Product detail page does not crash on second visit', async ({ productListPage, productDetailPage }) => {
    await productListPage.navigateToCategory(CATEGORIES.MENS_TSHIRTS.path);
    await productListPage.clickProduct(0);
    await productDetailPage.waitForProductLoad();
    const url1 = await productDetailPage.getCurrentUrl();

    await productListPage.navigateToCategory(CATEGORIES.MENS_TSHIRTS.path);
    await productListPage.clickProduct(1);
    await productDetailPage.waitForProductLoad();
    const url2 = await productDetailPage.getCurrentUrl();

    expect(url2).toContain('/detail/');
    expect(url1).not.toEqual(url2);
  });

  test('TC-P12: Product list displays at least 2 items per category', async ({ productListPage }) => {
    for (const cat of Object.values(CATEGORIES)) {
      await productListPage.navigateToCategory(cat.path);
      const count = await productListPage.getProductCount();
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });
});
