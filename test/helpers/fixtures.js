/**
 * Fixtures - Playwright Test Fixtures
 * 
 * Provides reusable fixtures for tests with automatic setup and teardown
 */

import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';
import { CompletionPage } from '../pages/CompletionPage.js';
import { TEST_USERS } from './testData.js';
import { loginWithStandardUser } from './testUtils.js';

/**
 * Extended test with page object fixtures
 */
export const test = baseTest.extend({
  // Page Objects
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },

  completionPage: async ({ page }, use) => {
    const completionPage = new CompletionPage(page);
    await use(completionPage);
  },

  // Logged-in user fixture
  authenticatedPage: async ({ page }, use) => {
    await loginWithStandardUser(page);
    await new ProductsPage(page).waitForProductsLoad();
    await use(page);
  },

  // Test data fixtures
  testUsers: async ({}, use) => {
    await use(TEST_USERS);
  },
});

export { expect } from '@playwright/test';
