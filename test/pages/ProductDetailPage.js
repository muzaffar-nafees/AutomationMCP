/**
 * Product Detail Page Object Model
 * 
 * Encapsulates all interactions with the product detail page
 */
import { BasePage } from './BasePage.js';

export class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.constants = {
      detailUrl: /inventory-item\.html/,
    };
  }

  // ========== LOCATORS ==========
  get productImage() {
    return this.page.locator('.inventory_details_img img');
  }

  get productName() {
    return this.page.locator('.inventory_details_name_large');
  }

  get productDescription() {
    return this.page.locator('.inventory_details_desc');
  }

  get productPrice() {
    return this.page.locator('.inventory_details_price');
  }

  get addToCartButton() {
    return this.page.locator('[data-test="add-to-cart"]');
  }

  get removeButton() {
    return this.page.locator('[data-test="remove"]');
  }

  get backButton() {
    return this.page.locator('[data-test="back-to-products"]');
  }

  // ========== ACTIONS ==========
  /**
   * Add product to cart
   */
  async addToCart() {
    await this.addToCartButton.click();
  }

  /**
   * Remove product from cart
   */
  async removeFromCart() {
    await this.removeButton.click();
  }

  /**
   * Go back to products page
   */
  async goBack() {
    await this.backButton.click();
  }

  /**
   * Get product information
   */
  async getProductInfo() {
    const name = await this.productName.textContent();
    const description = await this.productDescription.textContent();
    const priceText = await this.productPrice.textContent();
    const price = parseFloat(priceText.replace('$', ''));

    return {
      name: name ? name.trim() : '',
      description: description ? description.trim() : '',
      price: price,
    };
  }

  /**
   * Check if product info is visible
   */
  async isProductInfoVisible() {
    try {
      // Check if add to cart button is visible (most reliable indicator)
      const buttonVisible = await this.addToCartButton.isVisible({ timeout: 3000 });
      // Check if back button is visible
      const backButtonVisible = await this.page.locator('[data-test="back-to-products"]').isVisible({ timeout: 3000 });
      return buttonVisible && backButtonVisible;
    } catch {
      return false;
    }
  }

  /**
   * Check if product is in cart (shows Remove button)
   */
  async isProductInCart() {
    try {
      return await this.removeButton.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Get product price as number
   */
  async getProductPrice() {
    const priceText = await this.productPrice.textContent();
    return parseFloat(priceText.replace('$', ''));
  }

  /**
   * Get product name
   */
  async getProductName() {
    return await this.productName.textContent();
  }

  /**
   * Get product description
   */
  async getProductDescription() {
    return await this.productDescription.textContent();
  }

  /**
   * Wait for product detail page to load
   */
  async waitForProductDetailLoad() {
    await this.waitForURL(this.constants.detailUrl);
    // Wait for DOM to load, then add small delay
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(500);
  }
}
