/**
 * Completion Page Object Model
 * 
 * Encapsulates interactions with the order completion page
 */
import { BasePage } from './BasePage.js';

export class CompletionPage extends BasePage {
  constructor(page) {
    super(page);
    this.constants = {
      completionUrl: /checkout-complete\.html/,
    };
  }

  // ========== LOCATORS ==========
  get completionHeading() {
    return this.page.locator('h2');
  }

  get completionSubheading() {
    return this.page.locator('[data-test="complete-header"]');
  }

  get completionMessage() {
    return this.page.locator('[data-test="complete-text"]');
  }

  get backHomeButton() {
    return this.page.locator('[data-test="back-home"]');
  }

  get ponyExpressImage() {
    return this.page.locator('.pony_express');
  }

  // ========== ACTIONS ==========
  /**
   * Get completion heading text
   */
  async getCompletionHeadingText() {
    return await this.completionHeading.textContent();
  }

  /**
   * Get completion message text
   */
  async getCompletionMessageText() {
    return await this.completionMessage.textContent();
  }

  /**
   * Verify order is completed successfully
   */
  async isOrderCompleted() {
    const headingText = await this.getCompletionHeadingText();
    return headingText ? headingText.includes('Thank you') : false;
  }

  /**
   * Click back home button
   */
  async goBackHome() {
    await this.backHomeButton.click();
  }

  /**
   * Verify all completion page elements are visible
   */
  async isCompletionPageFullyLoaded() {
    try {
      const headingVisible = await this.completionHeading.isVisible({ timeout: 2000 });
      const messageVisible = await this.completionMessage.isVisible({ timeout: 2000 });
      const buttonVisible = await this.backHomeButton.isVisible({ timeout: 2000 });
      return headingVisible && messageVisible && buttonVisible;
    } catch {
      return false;
    }
  }

  /**
   * Wait for completion page to load
   */
  async waitForCompletionPage() {
    await this.waitForURL(this.constants.completionUrl);
    await this.waitForElement('h2');
  }
}
