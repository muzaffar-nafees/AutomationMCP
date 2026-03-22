/**
 * Test Utilities & Helper Functions
 * 
 * Reusable utility functions for common test operations
 */

import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { TEST_USERS } from './testData.js';

/**
 * Login with a specific user
 * @param {Page} page - Playwright page object
 * @param {Object} userCredentials - User object with username and password
 */
export async function loginAs(page, userCredentials) {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login(userCredentials.username, userCredentials.password);
  
  if (userCredentials.type === 'valid') {
    await loginPage.waitForLoginSuccess();
  }
}

/**
 * Login with standard user (most common scenario)
 * @param {Page} page - Playwright page object
 */
export async function loginWithStandardUser(page) {
  await loginAs(page, TEST_USERS.STANDARD_USER);
}

/**
 * Add multiple products to cart
 * @param {Page} page - Playwright page object
 * @param {Array<string>} productIds - Array of product IDs to add
 */
export async function addMultipleProductsToCart(page, productIds) {
  const productsPage = new ProductsPage(page);
  
  for (const productId of productIds) {
    await productsPage.addProductToCart(productId);
  }
}

/**
 * Complete full purchase workflow
 * @param {Page} page - Playwright page object
 * @param {Array<string>} productIds - Products to add to cart
 * @param {Object} checkoutInfo - Checkout form data
 */
export async function completePurchase(page, productIds, checkoutInfo) {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Add products
  for (const productId of productIds) {
    await productsPage.addProductToCart(productId);
  }

  // Go to cart
  await productsPage.openCart();
  await cartPage.waitForCartLoad();

  // Checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.proceedToOverview(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.postalCode
  );
  await checkoutPage.waitForCheckoutStepTwo();
  await checkoutPage.clickFinish();
}

/**
 * Verify prices are sorted correctly
 * @param {Array<number>} prices - Array of prices
 * @param {string} direction - 'asc' or 'desc'
 */
export function verifyPricesSorted(prices, direction = 'asc') {
  const sorted = [...prices].sort((a, b) => 
    direction === 'asc' ? a - b : b - a
  );
  
  prices.forEach((price, index) => {
    expect(price).toBe(sorted[index]);
  });
}

/**
 * Verify product names are sorted correctly
 * @param {Array<string>} names - Array of product names
 * @param {string} direction - 'asc' or 'desc'
 */
export function verifyNamesSorted(names, direction = 'asc') {
  const sorted = [...names].sort((a, b) => 
    direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  );
  
  names.forEach((name, index) => {
    expect(name).toBe(sorted[index]);
  });
}

/**
 * Get random product from list
 * @param {Array<Object>} products - List of products
 */
export function getRandomProduct(products) {
  return products[Math.floor(Math.random() * products.length)];
}

/**
 * Format price as currency string
 * @param {number} price - Price value
 */
export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

/**
 * Parse price from text
 * @param {string} text - Text containing price
 */
export function parsePrice(text) {
  const match = text.match(/\$[\d.]+/);
  return match ? parseFloat(match[0].replace('$', '')) : 0;
}

/**
 * Calculate total with tax
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate (default 0.08 for 8%)
 */
export function calculateTotal(subtotal, taxRate = 0.08) {
  const tax = Math.round((subtotal * taxRate + Number.EPSILON) * 100) / 100;
  const total = Math.round((subtotal + tax + Number.EPSILON) * 100) / 100;
  return { tax, total };
}

/**
 * Wait for element animation to complete
 * @param {number} ms - Milliseconds to wait
 */
export async function waitForAnimation(ms = 500) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random string
 * @param {number} length - Length of string
 */
export function generateRandomString(length = 10) {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Take screenshot for debugging
 * @param {Page} page - Playwright page object
 * @param {string} name - Screenshot name
 */
export async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ path: `./screenshots/${name}-${timestamp}.png` });
}

/**
 * Get page metadata
 * @param {Page} page - Playwright page object
 */
export async function getPageMetadata(page) {
  return {
    url: page.url(),
    title: await page.title(),
    content: await page.content(),
  };
}
