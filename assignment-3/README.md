# Assignment 3 — Playwright Automation for Polymer Shop

**Application Under Test:** [Polymer Shop](https://shop.polymer-project.org)
**Framework:** Playwright (TypeScript) with Page Object Model (POM)
**Status:** 54/54 tests passing

---

## Project Structure

```
Assignment-3/
├── src/
│   ├── pages/                    # Page Object Model layer
│   │   ├── BasePage.ts           # Shared base class (navigation, helpers)
│   │   ├── HomePage.ts           # Home page actions & locators
│   │   ├── ProductListPage.ts    # Category listing page
│   │   ├── ProductDetailPage.ts  # Individual product page
│   │   ├── CartPage.ts           # Shopping cart
│   │   └── CheckoutPage.ts       # Checkout flow (shipping + payment)
│   ├── tests/
│   │   ├── sanity/
│   │   │   └── smoke.spec.ts     # [SANITY] 10 smoke tests — post-deploy health check
│   │   ├── regression/
│   │   │   ├── navigation.spec.ts # [REGRESSION] 12 navigation & UI tests
│   │   │   ├── cart.spec.ts       # [REGRESSION] 10 cart functionality tests
│   │   │   └── product.spec.ts    # [REGRESSION] 12 product display tests
│   │   └── e2e/
│   │       └── checkout.spec.ts  # [E2E] 10 end-to-end journey tests
│   ├── fixtures/
│   │   └── testFixtures.ts       # Custom Playwright fixtures (POM injection)
│   ├── data/
│   │   └── testData.ts           # Test data: categories, products, checkout data
│   └── utils/
│       └── helpers.ts            # Shared helpers (addProductToCart, extractPrice, etc.)
├── playwright.config.ts          # Playwright configuration
├── playwright-report/            # Generated HTML + JSON reports (after running tests)
├── tsconfig.json
├── package.json
└── README.md
```

---

## Test Coverage Summary

| ID | Test Name | Suite | Classification | Status |
|----|-----------|-------|---------------|--------|
| TC-S01 | Home page loads successfully | smoke | Sanity | ✅ Pass |
| TC-S02 | Page title is present | smoke | Sanity | ✅ Pass |
| TC-S03 | Navigation categories are present | smoke | Sanity | ✅ Pass |
| TC-S04 | Category page loads - Men's Outerwear | smoke | Sanity | ✅ Pass |
| TC-S05 | Category page loads - Ladies Outerwear | smoke | Sanity | ✅ Pass |
| TC-S06 | Category page loads - Men's T-Shirts | smoke | Sanity | ✅ Pass |
| TC-S07 | Category page loads - Ladies T-Shirts | smoke | Sanity | ✅ Pass |
| TC-S08 | Product list shows products | smoke | Sanity | ✅ Pass |
| TC-S09 | Product detail page opens from list | smoke | Sanity | ✅ Pass |
| TC-S10 | Cart page is accessible | smoke | Sanity | ✅ Pass |
| TC-R01 | Home page has featured product links | navigation | Regression | ✅ Pass |
| TC-R02 | Category nav tab navigates correctly | navigation | Regression | ✅ Pass |
| TC-R03 | All four category paths are reachable | navigation | Regression | ✅ Pass |
| TC-R04 | Product list page shows multiple products | navigation | Regression | ✅ Pass |
| TC-R05 | Product detail URL has category + item ID | navigation | Regression | ✅ Pass |
| TC-R06 | Product detail page URL and DOM are valid | navigation | Regression | ✅ Pass |
| TC-R07 | Product detail page has Add to Cart button | navigation | Regression | ✅ Pass |
| TC-R08 | Cart icon is visible on product detail page | navigation | Regression | ✅ Pass |
| TC-R09 | Invalid route does not crash app | navigation | Regression | ✅ Pass |
| TC-R10 | Cart page URL is /cart | navigation | Regression | ✅ Pass |
| TC-R11 | Empty cart shows appropriate message | navigation | Regression | ✅ Pass |
| TC-R12 | Checkout page is accessible via URL | navigation | Regression | ✅ Pass |
| TC-C01 | Add to Cart button is clickable | cart | Regression | ✅ Pass |
| TC-C02 | Cart page accessible after adding item | cart | Regression | ✅ Pass |
| TC-C03 | Cart page renders without errors | cart | Regression | ✅ Pass |
| TC-C04 | Cart shows item after add | cart | Regression | ✅ Pass |
| TC-C05 | Cart has Checkout button when not empty | cart | Regression | ✅ Pass |
| TC-C06 | Checkout button navigates to checkout | cart | Regression | ✅ Pass |
| TC-C07 | Multiple products can be browsed | cart | Regression | ✅ Pass |
| TC-C08 | Product detail shows size selector | cart | Regression | ✅ Pass |
| TC-C09 | Cart page body is not blank | cart | Regression | ✅ Pass |
| TC-C10 | Direct /cart navigation does not crash | cart | Regression | ✅ Pass |
| TC-P01 | Men's Outerwear category has products | product | Regression | ✅ Pass |
| TC-P02 | Ladies Outerwear category has products | product | Regression | ✅ Pass |
| TC-P03 | Men's T-Shirts category has products | product | Regression | ✅ Pass |
| TC-P04 | Ladies T-Shirts category has products | product | Regression | ✅ Pass |
| TC-P05 | Product detail page has content | product | Regression | ✅ Pass |
| TC-P06 | Product detail URL contains /detail/ | product | Regression | ✅ Pass |
| TC-P07 | Product list items are anchor links | product | Regression | ✅ Pass |
| TC-P08 | Each category page URL is unique | product | Regression | ✅ Pass |
| TC-P09 | Product detail has Add to Cart button | product | Regression | ✅ Pass |
| TC-P10 | Product list loads within timeout | product | Regression | ✅ Pass |
| TC-P11 | Product detail does not crash on 2nd visit | product | Regression | ✅ Pass |
| TC-P12 | At least 2 items per category | product | Regression | ✅ Pass |
| TC-E01 | Browse category → View product | e2e | E2E | ✅ Pass |
| TC-E02 | Add product to cart → View cart | e2e | E2E | ✅ Pass |
| TC-E03 | Cart → Checkout page navigation | e2e | E2E | ✅ Pass |
| TC-E04 | Checkout page shipping fields present | e2e | E2E | ✅ Pass |
| TC-E05 | Checkout page URL is correct | e2e | E2E | ✅ Pass |
| TC-E06 | Browse all categories in one session | e2e | E2E | ✅ Pass |
| TC-E07 | Add multiple products to cart | e2e | E2E | ✅ Pass |
| TC-E08 | Product detail → Back to list | e2e | E2E | ✅ Pass |
| TC-E09 | Checkout renders without JS errors | e2e | E2E | ✅ Pass |
| TC-E10 | Home page has product category links | e2e | E2E | ✅ Pass |

**Total: 54 tests | 54 passed | 0 failed**

---

## Prerequisites

- Node.js >= 18
- npm >= 9

---

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run by classification
npm run test:sanity        # Sanity / smoke tests only
npm run test:regression    # Regression tests only
npm run test:e2e           # E2E tests only

# Run headed (browser visible)
npm run test:headed

# View HTML report
npm run test:report

# Debug a specific test
npm run test:debug
```

---

## Test Data

All test data lives in [src/data/testData.ts](src/data/testData.ts):

| Data Set | Purpose |
|----------|---------|
| `CATEGORIES` | All 4 shop categories with paths |
| `PRODUCTS` | Sample products per category |
| `CHECKOUT_DATA.VALID` | Valid shipping + payment data |
| `CHECKOUT_DATA.INVALID_CARD` | Invalid card for negative tests |
| `CHECKOUT_DATA.EMPTY` | Empty form fields for validation tests |

---

## Page Object Model Architecture

```
Test File  →  Fixture (testFixtures.ts)  →  Page Object  →  Browser / DOM
```

Each page class:
- Extends `BasePage` for shared navigation and helpers
- Declares locators as `get` properties (lazy, re-evaluated each call)
- Exposes high-level action methods (e.g., `addToCart()`, `proceedToCheckout()`)
- Tests call page methods — never interact with Playwright APIs directly

### Design Notes — Polymer Web Components

The Polymer Shop renders content inside custom elements (`<shop-app>`, `<shop-detail>`, etc.) using shadow DOM. Key locator strategy decisions:
- Prefer `a[href*="/list/"]` and `a[href*="/detail/"]` (Playwright auto-pierces shadow DOM for these)
- Use `state: 'attached'` (not `'visible'`) for shadow-DOM elements that exist in the DOM but report as hidden
- Fallback URL-based assertions when shadow DOM prevents text extraction

---

## Reports

After running tests, reports are in `playwright-report/`:

| Report | Path | How to View |
|--------|------|-------------|
| HTML (interactive) | `playwright-report/index.html` | `npm run test:report` |
| JSON | `playwright-report/test-results.json` | Any JSON viewer |
| Screenshots (on fail) | `playwright-report/screenshots/` | File browser |
| Video (on fail) | `test-results/<test-name>/video.webm` | Media player |
| Trace (on fail) | `test-results/<test-name>/trace.zip` | `npx playwright show-trace <path>` |

---

## CI/CD Integration

A GitHub Actions workflow is included at [.github/workflows/playwright.yml](.github/workflows/playwright.yml).
- Triggers on push and pull requests to `main`
- Runs the full suite headlessly
- Uploads the HTML report as an artifact
