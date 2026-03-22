/**
 * Checkout Page Object Model
 * 
 * Encapsulates all interactions with the checkout pages (step one and two)
 */
import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.constants = {
      checkoutStepOneUrl: /checkout-step-one\.html/,
      checkoutStepTwoUrl: /checkout-step-two\.html/,
      checkoutCompleteUrl: /checkout-complete\.html/,
    };
  }

  // ========== STEP 1 LOCATORS ==========
  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  get cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  // ========== STEP 2 LOCATORS ==========
  get checkoutTitle() {
    return this.page.locator('[data-test="title"]');
  }

  get cartItems() {
    return this.page.locator('.cart_item');
  }

  get subtotalLabel() {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  get taxLabel() {
    return this.page.locator('[data-test="tax-label"]');
  }

  get totalLabel() {
    return this.page.locator('[data-test="total-label"]');
  }

  get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  get paymentInfoLabel() {
    return this.page.locator('text=SauceCard');
  }

  get shippingInfoLabel() {
    return this.page.locator('text=Free Pony Express');
  }

  get cancelButtonStep2() {
    return this.page.locator('[data-test="cancel"]');
  }

  // ========== STEP 1 ACTIONS ==========
  /**
   * Fill checkout form for step 1
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal/Zip code
   */
  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Enter first name
   */
  async enterFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Enter last name
   */
  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Enter postal code
   */
  async enterPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click continue to proceed to overview
   */
  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Complete checkout step 1 and go to step 2
   */
  async proceedToOverview(firstName, lastName, postalCode) {
    await this.fillCheckoutForm(firstName, lastName, postalCode);
    await this.clickContinue();
  }

  /**
   * Cancel checkout from either step
   */
  async cancelCheckout() {
    // Click cancel button (works from both step 1 and step 2)
    await this.cancelButton.click();
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed() {
    try {
      return await this.errorMessage.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  /**
   * Get error message details
   */
  async getErrorDetails() {
    if (await this.isErrorDisplayed()) {
      return await this.getErrorMessage();
    }
    return null;
  }

  /**
   * Wait for step 1 page
   */
  async waitForCheckoutStepOne() {
    await this.waitForURL(this.constants.checkoutStepOneUrl);
  }

  // ========== STEP 2 ACTIONS ==========
  /**
   * Click finish to complete order
   */
  async clickFinish() {
    await this.finishButton.click();
  }

  /**
   * Get order summary information
   */
  async getOrderSummary() {
    const subtotalText = await this.subtotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    // Extract numbers from text
    const subtotal = this.extractPrice(subtotalText);
    const tax = this.extractPrice(taxText);
    const total = this.extractPrice(totalText);

    return { subtotal, tax, total };
  }

  /**
   * Get number of items in order
   */
  async getOrderItemCount() {
    return await this.cartItems.count();
  }

  /**
   * Verify order overview is displayed
   */
  async isOrderOverviewDisplayed() {
    try {
      const titleVisible = await this.checkoutTitle.isVisible({ timeout: 2000 });
      const itemsPresent = (await this.getOrderItemCount()) > 0;
      return titleVisible && itemsPresent;
    } catch {
      return false;
    }
  }

  /**
   * Get checkout title
   */
  async getCheckoutTitle() {
    return await this.checkoutTitle.textContent();
  }

  /**
   * Wait for step 2 page
   */
  async waitForCheckoutStepTwo() {
    await this.waitForURL(this.constants.checkoutStepTwoUrl);
  }

  /**
   * Extract price from text (e.g., "Item total: $39.98" -> 39.98)
   * @private
   */
  extractPrice(text) {
    const match = text.match(/\$[\d.]+/);
    return match ? parseFloat(match[0].replace('$', '')) : 0;
  }

  /**
   * Verify payment and shipping info
   */
  async verifyPaymentAndShippingInfo() {
    const paymentVisible = await this.paymentInfoLabel.isVisible({ timeout: 2000 });
    const shippingVisible = await this.shippingInfoLabel.isVisible({ timeout: 2000 });
    return paymentVisible && shippingVisible;
  }

  /**
   * Complete full checkout process
   */
  async completeFullCheckout(firstName, lastName, postalCode) {
    await this.proceedToOverview(firstName, lastName, postalCode);
    await this.waitForCheckoutStepTwo();
    await this.clickFinish();
    await this.waitForURL(this.constants.checkoutCompleteUrl);
  }
}
