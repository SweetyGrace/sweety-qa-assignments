import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ShippingData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export interface PaymentData {
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // --- Shipping Form Locators ---
  get firstNameInput(): Locator {
    return this.page.locator('[name="firstName"], [placeholder*="First" i], #firstName').first();
  }

  get lastNameInput(): Locator {
    return this.page.locator('[name="lastName"], [placeholder*="Last" i], #lastName').first();
  }

  get addressInput(): Locator {
    return this.page.locator('[name="address"], [placeholder*="Address" i], #address').first();
  }

  get cityInput(): Locator {
    return this.page.locator('[name="city"], [placeholder*="City" i], #city').first();
  }

  get stateInput(): Locator {
    return this.page.locator('[name="state"], [placeholder*="State" i], #state').first();
  }

  get zipInput(): Locator {
    return this.page.locator('[name="zip"], [placeholder*="Zip" i], #zip').first();
  }

  get countryInput(): Locator {
    return this.page.locator('[name="country"], [placeholder*="Country" i], #country').first();
  }

  get phoneInput(): Locator {
    return this.page.locator('[name="phone"], [type="tel"], [placeholder*="Phone" i]').first();
  }

  get emailInput(): Locator {
    return this.page.locator('[name="email"], [type="email"], [placeholder*="Email" i]').first();
  }

  // --- Payment Form Locators ---
  get cardNumberInput(): Locator {
    return this.page.locator('[name="cardNumber"], [placeholder*="Card number" i], [placeholder*="card" i]').first();
  }

  get cardExpiryInput(): Locator {
    return this.page.locator('[name="expiry"], [placeholder*="MM/YY" i], [placeholder*="expiry" i]').first();
  }

  get cardCVCInput(): Locator {
    return this.page.locator('[name="cvv"], [name="cvc"], [placeholder*="CVC" i], [placeholder*="CVV" i]').first();
  }

  // --- Navigation Buttons ---
  get continueToPaymentButton(): Locator {
    return this.page.locator(
      'button:has-text("Continue to Payment"), button:has-text("CONTINUE TO PAYMENT"), button[type="submit"]'
    ).first();
  }

  get placeOrderButton(): Locator {
    return this.page.locator(
      'button:has-text("Place Order"), button:has-text("PLACE ORDER")'
    ).first();
  }

  get backButton(): Locator {
    return this.page.locator('a:has-text("Back"), button:has-text("Back")').first();
  }

  // --- Confirmation & Errors ---
  get orderConfirmation(): Locator {
    return this.page.locator('[class*="confirmation"], :has-text("Order placed"), :has-text("Thank you")').first();
  }

  get validationErrors(): Locator {
    return this.page.locator('[class*="error"], [aria-invalid="true"], :has-text("required" )');
  }

  get checkoutStepIndicator(): Locator {
    return this.page.locator('[class*="step"], [class*="stepper"]').first();
  }

  // --- Actions ---
  async navigateToCheckout(): Promise<void> {
    await this.navigate('/checkout');
    await this.waitForAppReady();
    await this.page.waitForTimeout(1000);
  }

  async fillShippingForm(data: ShippingData): Promise<void> {
    await this.fillInputIfVisible(this.firstNameInput, data.firstName);
    await this.fillInputIfVisible(this.lastNameInput, data.lastName);
    await this.fillInputIfVisible(this.addressInput, data.address);
    await this.fillInputIfVisible(this.cityInput, data.city);
    await this.fillInputIfVisible(this.stateInput, data.state);
    await this.fillInputIfVisible(this.zipInput, data.zip);
    await this.fillInputIfVisible(this.countryInput, data.country);
    await this.fillInputIfVisible(this.phoneInput, data.phone);
    await this.fillInputIfVisible(this.emailInput, data.email);
  }

  async fillPaymentForm(data: PaymentData): Promise<void> {
    await this.fillInputIfVisible(this.cardNumberInput, data.cardNumber);
    await this.fillInputIfVisible(this.cardExpiryInput, data.cardExpiry);
    await this.fillInputIfVisible(this.cardCVCInput, data.cardCVC);
  }

  private async fillInputIfVisible(locator: Locator, value: string): Promise<void> {
    const isVisible = await locator.isVisible().catch(() => false);
    if (isVisible && value) {
      await locator.fill(value);
    }
  }

  async clickContinueToPayment(): Promise<void> {
    const btn = this.continueToPaymentButton;
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(1000);
  }

  async clickPlaceOrder(): Promise<void> {
    const btn = this.placeOrderButton;
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(2000);
  }

  async isOnCheckoutPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('/checkout');
  }

  async isOrderConfirmed(): Promise<boolean> {
    await this.page.waitForTimeout(2000);
    const url = await this.getCurrentUrl();
    const urlConfirmed = url.includes('/confirmation') || url.includes('/order');
    const textConfirmed = await this.page.locator(':has-text("Thank you"), :has-text("Order placed"), :has-text("placed")').first().isVisible().catch(() => false);
    return urlConfirmed || textConfirmed;
  }

  async hasValidationErrors(): Promise<boolean> {
    const count = await this.validationErrors.count();
    return count > 0;
  }

  async getFormFieldCount(): Promise<number> {
    return await this.page.locator('input, select').count();
  }
}
