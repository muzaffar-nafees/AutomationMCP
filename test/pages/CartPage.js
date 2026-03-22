/**
 * Cart Page Object Model
 * 
 * Encapsulates all interactions with the shopping cart page
 */
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.constants = {
      cartUrl: /cart\.html/,
    };
  }

  // ========== LOCATORS ==========
  get cartHeading() {
    return this.page.locator('[data-test="title"]');
  }

  get cartItems() {
    return this.page.locator('.cart_item');
  }

  get cartItemNames() {
    return this.page.locator('.inventory_item_name');
  }

  get cartItemPrices() {
    return this.page.locator('.inventory_item_price');
  }

  get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  get cartQuantityLabel() {
    return this.page.locator('.cart_quantity_label');
  }

  get cartDescLabel() {
    return this.page.locator('.cart_desc_label');
  }

  get removeButtons() {
    return this.page.locator('[data-test^="remove"]');
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  // ========== ACTIONS ==========
  /**
   * Get total items in cart
   */
  async getCartItemCount() {
    return await this.cartItems.count();
  }

  /**
   * Get all item names in cart
   */
  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  /**
   * Get all item prices in cart
   */
  async getCartItemPrices() {
    const priceTexts = await this.cartItemPrices.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Remove item at specific index
   * @param {number} itemIndex - Index of item to remove
   */
  async removeItem(itemIndex) {
    const removeButtons = this.page.locator('.cart_button').filter({ 
      hasText: 'Remove' 
    });
    await removeButtons.nth(itemIndex).click();
  }

  /**
   * Remove specific item by name
   * @param {string} itemName - Name of item to remove
   */
  async removeItemByName(itemName) {
    const itemRow = this.page.locator('.cart_item', { 
      has: this.page.locator(`text="${itemName}"`) 
    });
    const removeBtn = itemRow.locator('[data-test^="remove"]').first();
    await removeBtn.click();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty() {
    return (await this.getCartItemCount()) === 0;
  }

  /**
   * Verify cart column headers exist
   */
  async verifyCartHeaders() {
    const quantityVisible = await this.cartQuantityLabel.isVisible({ timeout: 1000 });
    const descVisible = await this.cartDescLabel.isVisible({ timeout: 1000 });
    return quantityVisible && descVisible;
  }

  /**
   * Get cart heading text
   */
  async getCartHeadingText() {
    return await this.cartHeading.textContent();
  }

  /**
   * Calculate cart subtotal
   */
  async calculateCartSubtotal() {
    const prices = await this.getCartItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }

  /**
   * Calculate tax amount (assuming 8% tax rate)
   */
  async calculateTax() {
    const subtotal = await this.calculateCartSubtotal();
    return Math.round((subtotal * 0.08 + Number.EPSILON) * 100) / 100;
  }

  /**
   * Calculate total
   */
  async calculateTotal() {
    const subtotal = await this.calculateCartSubtotal();
    const tax = await this.calculateTax();
    return Math.round((subtotal + tax + Number.EPSILON) * 100) / 100;
  }

  /**
   * Wait for cart page to load
   */
  async waitForCartLoad() {
    await this.waitForURL(this.constants.cartUrl);
  }
}
