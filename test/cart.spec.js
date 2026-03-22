/**
 * CART OPERATIONS TEST SUITE
 * 
 * Tests TC-17 to TC-21
 * Covers cart operations: add, remove, view, and continue shopping
 */

import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/ProductsPage.js';
import { CartPage } from './pages/CartPage.js';
import { TEST_PRODUCTS } from './helpers/testData.js';
import { loginWithStandardUser } from './helpers/testUtils.js';

test.describe('🛒 CART OPERATIONS', () => {
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await loginWithStandardUser(page);
    await productsPage.waitForProductsLoad();
  });

  test('TC-17: Add single product to cart', async ({ page }) => {
    // Arrange
    const productId = TEST_PRODUCTS.BACKPACK.id;

    // Act
    await productsPage.addProductToCart(productId);

    // Assert
    expect(await productsPage.isProductInCart(productId)).toBe(true);
    expect(await productsPage.getCartItemCount()).toBe(1);
  });

  test('TC-18: Add multiple products to cart', async ({ page }) => {
    // Arrange
    const products = [
      TEST_PRODUCTS.BACKPACK.id,
      TEST_PRODUCTS.BIKE_LIGHT.id,
      TEST_PRODUCTS.BOLT_SHIRT.id,
    ];

    // Act
    for (const productId of products) {
      await productsPage.addProductToCart(productId);
      await page.waitForTimeout(200);
    }

    // Assert
    expect(await productsPage.getCartItemCount()).toBe(3);
    for (const productId of products) {
      expect(await productsPage.isProductInCart(productId)).toBe(true);
    }
  });

  test('TC-19: View cart contents', async ({ page }) => {
    // Arrange
    const products = [
      TEST_PRODUCTS.BACKPACK.id,
      TEST_PRODUCTS.BIKE_LIGHT.id,
    ];

    // Add products
    for (const productId of products) {
      await productsPage.addProductToCart(productId);
    }

    // Act
    await productsPage.openCart();
    await cartPage.waitForCartLoad();

    // Assert
    await expect(page).toHaveURL(/cart\.html/);
    expect(await cartPage.getCartHeadingText()).toContain('Your Cart');
    expect(await cartPage.getCartItemCount()).toBe(2);
    expect(await cartPage.verifyCartHeaders()).toBe(true);
  });

  test('TC-20: Remove product from cart', async ({ page }) => {
    // Arrange
    const products = [
      TEST_PRODUCTS.BACKPACK.id,
      TEST_PRODUCTS.BIKE_LIGHT.id,
    ];

    // Add two products
    for (const productId of products) {
      await productsPage.addProductToCart(productId);
    }
    expect(await productsPage.getCartItemCount()).toBe(2);

    // Act - Remove first product
    await productsPage.removeProductFromCart(TEST_PRODUCTS.BACKPACK.id);
    await page.waitForTimeout(300);

    // Assert
    expect(await productsPage.getCartItemCount()).toBe(1);
    expect(await productsPage.isProductInCart(TEST_PRODUCTS.BACKPACK.id)).toBe(false);
    expect(await productsPage.isProductInCart(TEST_PRODUCTS.BIKE_LIGHT.id)).toBe(true);

    // Verify in cart page as well
    await productsPage.openCart();
    await cartPage.waitForCartLoad();
    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('TC-21: Continue shopping from cart', async ({ page }) => {
    // Arrange
    await productsPage.addProductToCart(TEST_PRODUCTS.BACKPACK.id);
    await productsPage.openCart();
    await cartPage.waitForCartLoad();

    // Assert - In cart page
    await expect(page).toHaveURL(/cart\.html/);
    expect(await cartPage.getCartItemCount()).toBe(1);

    // Act - Continue shopping
    await cartPage.continueShopping();

    // Assert - Back on products page
    await expect(page).toHaveURL(/inventory\.html/);
    expect(await productsPage.getCartItemCount()).toBe(1); // Cart still has item
  });
});
