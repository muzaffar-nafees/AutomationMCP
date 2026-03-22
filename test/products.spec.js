/**
 * PRODUCT INTERACTIONS TEST SUITE
 * 
 * Tests TC-11 to TC-16
 * Covers product browsing, sorting, filtering, and navigation
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { TEST_USERS, SORT_OPTIONS } from './helpers/testData.js';
import { loginWithStandardUser, verifyPricesSorted, verifyNamesSorted } from './helpers/testUtils.js';

test.describe('📦 PRODUCT INTERACTIONS', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await loginWithStandardUser(page);
    await productsPage.waitForProductsLoad();
  });

  test('TC-11: View product details from inventory', async ({ page }) => {
    // Arrange
    const productDetailPage = new ProductDetailPage(page);

    // Act
    await productsPage.viewProductDetails(4); // Sauce Labs Backpack

    // Assert
    await productDetailPage.waitForProductDetailLoad();
    await expect(page).toHaveURL(/inventory-item\.html/);
    expect(await productDetailPage.isProductInfoVisible()).toBe(true);
  });

  test('TC-12: Sort products by Name A to Z', async ({ page }) => {
    // Arrange
    // Products page is already loaded

    // Act
    await productsPage.sortProducts(SORT_OPTIONS.NAME_AZ);
    await page.waitForTimeout(500); // Wait for sorting animation

    // Assert
    const names = await productsPage.getAllProductNames();
    verifyNamesSorted(names, 'asc');
    expect(names[0]).toBe('Sauce Labs Backpack');
  });

  test('TC-13: Sort products by Name Z to A', async ({ page }) => {
    // Arrange
    // Products page is already loaded

    // Act
    await productsPage.sortProducts(SORT_OPTIONS.NAME_ZA);
    await page.waitForTimeout(500); // Wait for sorting animation

    // Assert
    const names = await productsPage.getAllProductNames();
    verifyNamesSorted(names, 'desc');
    expect(names[0]).toContain('Test.allTheThings()');
  });

  test('TC-14: Sort products by Price low to high', async ({ page }) => {
    // Arrange
    // Products page is already loaded

    // Act
    await productsPage.sortProducts(SORT_OPTIONS.PRICE_LOW_TO_HIGH);
    await page.waitForTimeout(500); // Wait for sorting animation

    // Assert
    const prices = await productsPage.getAllProductPrices();
    verifyPricesSorted(prices, 'asc');
    expect(prices[0]).toBe(7.99); // Onesie is cheapest
    expect(prices[prices.length - 1]).toBe(49.99); // Fleece Jacket is most expensive
  });

  test('TC-15: Sort products by Price high to low', async ({ page }) => {
    // Arrange
    // Products page is already loaded

    // Act
    await productsPage.sortProducts(SORT_OPTIONS.PRICE_HIGH_TO_LOW);
    await page.waitForTimeout(500); // Wait for sorting animation

    // Assert
    const prices = await productsPage.getAllProductPrices();
    verifyPricesSorted(prices, 'desc');
    expect(prices[0]).toBe(49.99); // Fleece Jacket is most expensive
    expect(prices[prices.length - 1]).toBe(7.99); // Onesie is cheapest
  });

  test('TC-16: Navigate back from product detail page', async ({ page }) => {
    // Arrange
    const productDetailPage = new ProductDetailPage(page);

    // Act
    await productsPage.viewProductDetails(4); // View product
    await productDetailPage.waitForProductDetailLoad();

    // Assert - Product detail page is loaded
    await expect(page).toHaveURL(/inventory-item\.html/);

    // Act - Go back
    await productDetailPage.goBack();

    // Assert - Back on products page
    await expect(page).toHaveURL(/inventory\.html/);
    expect(await productsPage.areProductsDisplayed()).toBe(true);
  });
});
