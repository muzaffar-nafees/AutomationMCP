/**
 * Products Page Object Model
 * 
 * Encapsulates all interactions with the products/inventory page
 */
import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.constants = {
      inventoryUrl: /inventory\.html/,
      detailUrl: /inventory-item\.html/,
    };
  }

  // ========== LOCATORS ==========
  get productList() {
    return this.page.locator('.inventory_item');
  }

  get productNames() {
    return this.page.locator('.inventory_item_name');
  }

  get productPrices() {
    return this.page.locator('.inventory_item_price');
  }

  get productImages() {
    return this.page.locator('.inventory_item_img img');
  }

  get sortDropdown() {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get cartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get menuButton() {
    return this.page.locator('[data-test="menu-button"]');
  }

  get pageTitle() {
    return this.page.locator('.title');
  }

  // ========== ACTIONS ==========
  /**
   * Get total number of products
   */
  async getProductCount() {
    return await this.productList.count();
  }

  /**
   * Get all product names
   */
  async getAllProductNames() {
    return await this.productNames.allTextContents();
  }

  /**
   * Get all product prices (as float numbers)
   */
  async getAllProductPrices() {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Add product to cart by product ID
   * @param {string} productId - Product identifier
   */
  async addProductToCart(productId) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  /**
   * Remove product from cart by product ID
   * @param {string} productId - Product identifier
   */
  async removeProductFromCart(productId) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  /**
   * Sort products
   * @param {string} sortOption - Sort option (az, za, lohi, hilo)
   */
  async sortProducts(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
  }

  /**
   * Get current cart item count from badge
   */
  async getCartItemCount() {
    try {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0');
    } catch {
      return 0;
    }
  }

  /**
   * Open shopping cart
   */
  async openCart() {
    await this.cartLink.click();
  }

  /**
   * View product details by clicking product name
   * @param {number} productIndex - Index of product (4, 5, 1, 2, 3, 6)
   */
  async viewProductDetails(productIndex) {
    await this.page.locator(`[data-test="item-${productIndex}-title-link"]`).click();
  }

  /**
   * Go back to products from detail page
   */
  async goBackToProducts() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }

  /**
   * Check if product is in cart (button shows "Remove")
   * @param {string} productId - Product identifier
   */
  async isProductInCart(productId) {
    try {
      const removeButton = this.page.locator(`[data-test="remove-${productId}"]`);
      return await removeButton.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Get cart badge text
   */
  async getCartBadgeText() {
    try {
      return await this.cartBadge.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Verify products are displayed
   */
  async areProductsDisplayed() {
    return (await this.getProductCount()) > 0;
  }

  /**
   * Get product by name
   * @param {string} productName - Name of the product
   */
  async getProductByName(productName) {
    return this.page.locator(`.inventory_item_name:has-text("${productName}")`);
  }

  /**
   * Wait for products to load
   */
  async waitForProductsLoad() {
    await this.waitForURL(this.constants.inventoryUrl);
    await this.waitForElement('.inventory_item');
  }
}
