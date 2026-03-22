/**
 * CHECKOUT & EDGE CASES TEST SUITE
 * 
 * Tests TC-22 to TC-30
 * Covers checkout flow, validation, edge cases, and special scenarios
 */

import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/ProductsPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import { CompletionPage } from './pages/CompletionPage.js';
import { 
  TEST_PRODUCTS, 
  CHECKOUT_DATA, 
  EXPECTED_MESSAGES 
} from './helpers/testData.js';
import { 
  loginWithStandardUser, 
  calculateTotal,
  parsePrice,
  addMultipleProductsToCart 
} from './helpers/testUtils.js';

test.describe('💳 CHECKOUT & EDGE CASES', () => {
  let productsPage;
  let cartPage;
  let checkoutPage;
  let completionPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    completionPage = new CompletionPage(page);
    
    await loginWithStandardUser(page);
    await productsPage.waitForProductsLoad();
  });

  // ========== COMPLETE CHECKOUT WORKFLOW ==========

  test('TC-22: Complete checkout with valid information', async ({ page }) => {
    // Arrange
    const product = TEST_PRODUCTS.BACKPACK;
    const checkoutInfo = CHECKOUT_DATA.VALID;

    // Act - Add to cart
    await productsPage.addProductToCart(product.id);

    // Go to cart
    await productsPage.openCart();
    await cartPage.waitForCartLoad();

    // Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    // Fill form and proceed
    await checkoutPage.proceedToOverview(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );

    // Assert - On overview page
    await checkoutPage.waitForCheckoutStepTwo();
    expect(await checkoutPage.isOrderOverviewDisplayed()).toBe(true);
    expect(await checkoutPage.verifyPaymentAndShippingInfo()).toBe(true);

    // Act - Finish
    await checkoutPage.clickFinish();

    // Assert - Order completed
    await completionPage.waitForCompletionPage();
    expect(await completionPage.isOrderCompleted()).toBe(true);
    expect(await completionPage.getCompletionHeadingText()).toContain(
      EXPECTED_MESSAGES.ORDER_COMPLETE
    );
  });

  // ========== CHECKOUT VALIDATION TESTS ==========

  test('TC-23: Checkout validation - missing first name', async ({ page }) => {
    // Arrange
    await productsPage.addProductToCart(TEST_PRODUCTS.BACKPACK.id);
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    // Act - Submit without first name
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinue();

    // Assert
    expect(await checkoutPage.isErrorDisplayed()).toBe(true);
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain(EXPECTED_MESSAGES.FIRST_NAME_REQUIRED);
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('TC-24: Checkout validation - missing last name', async ({ page }) => {
    // Arrange
    await productsPage.addProductToCart(TEST_PRODUCTS.BACKPACK.id);
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    // Act - Submit without last name
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinue();

    // Assert
    expect(await checkoutPage.isErrorDisplayed()).toBe(true);
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain(EXPECTED_MESSAGES.LAST_NAME_REQUIRED);
  });

  test('TC-25: Checkout validation - missing postal code', async ({ page }) => {
    // Arrange
    await productsPage.addProductToCart(TEST_PRODUCTS.BACKPACK.id);
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    // Act - Submit without postal code
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.clickContinue();

    // Assert
    expect(await checkoutPage.isErrorDisplayed()).toBe(true);
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain(EXPECTED_MESSAGES.POSTAL_CODE_REQUIRED);
  });

  // ========== CHECKOUT CANCELLATION TESTS ==========

  test('TC-26: Cancel checkout from step one', async ({ page }) => {
    // Arrange
    await productsPage.addProductToCart(TEST_PRODUCTS.BACKPACK.id);
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    // Act - Cancel
    await checkoutPage.cancelCheckout();

    // Assert - Back to cart
    await expect(page).toHaveURL(/cart\.html/);
    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('TC-27: Cancel checkout from overview step', async ({ page }) => {
    // Arrange
    const checkoutInfo = CHECKOUT_DATA.VALID;
    
    await productsPage.addProductToCart(TEST_PRODUCTS.BACKPACK.id);
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    // Go to step 2
    await checkoutPage.proceedToOverview(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.waitForCheckoutStepTwo();

    // Act - Cancel from step 2 returns to inventory
    await checkoutPage.cancelCheckout();

    // Assert - Back to inventory (not cart - Sauce Labs behavior)
    await expect(page).toHaveURL(/inventory\.html/);
  });

  // ========== EDGE CASES & VALIDATIONS ==========

  test('TC-28: Price calculations with multiple items', async ({ page }) => {
    // Arrange
    const products = [
      TEST_PRODUCTS.BACKPACK.id,  // $29.99
      TEST_PRODUCTS.BIKE_LIGHT.id, // $9.99
    ];

    // Act - Add products and go to checkout overview
    for (const productId of products) {
      await productsPage.addProductToCart(productId);
    }

    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    const checkoutInfo = CHECKOUT_DATA.VALID;
    await checkoutPage.proceedToOverview(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.waitForCheckoutStepTwo();

    // Assert - Verify calculations
    const summary = await checkoutPage.getOrderSummary();
    
    // Expected: $29.99 + $9.99 = $39.98
    expect(summary.subtotal).toBeCloseTo(39.98, 2);
    
    // Expected tax: $39.98 * 0.08 = $3.198 ≈ $3.20
    expect(summary.tax).toBeCloseTo(3.20, 1);
    
    // Expected total: $39.98 + $3.20 = $43.18
    expect(summary.total).toBeCloseTo(43.18, 1);
  });

  test('TC-29: Special characters in checkout form', async ({ page }) => {
    // Arrange
    const checkoutInfo = CHECKOUT_DATA.WITH_SPECIAL_CHARS;

    await productsPage.addProductToCart(TEST_PRODUCTS.BACKPACK.id);
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForCheckoutStepOne();

    // Act - Fill form with special characters
    await checkoutPage.proceedToOverview(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );

    // Assert - Should proceed to overview despite special characters
    await checkoutPage.waitForCheckoutStepTwo();
    expect(await checkoutPage.isOrderOverviewDisplayed()).toBe(true);
  });

  test('TC-30: Reset app state functionality', async ({ page }) => {
    // Arrange - Add multiple products
    const products = [
      TEST_PRODUCTS.BACKPACK.id,
      TEST_PRODUCTS.BIKE_LIGHT.id,
      TEST_PRODUCTS.BOLT_SHIRT.id,
    ];

    for (const productId of products) {
      await productsPage.addProductToCart(productId);
    }

    // Assert - Cart has 3 items
    expect(await productsPage.getCartItemCount()).toBe(3);

    // Act - Open menu and reset app state
    await page.waitForTimeout(500);
    await page.locator('[data-test="menu-button"], button:has-text("Open Menu")').first().click();
    await page.locator('[data-test="reset-sidebar-link"]').click();
    await page.waitForTimeout(500);

    // Assert - Cart cleared
    const cartBadge = productsPage.cartBadge;
    try {
      await cartBadge.waitFor({ state: 'hidden', timeout: 2000 });
      expect(true).toBe(true); // Cart badge is gone
    } catch {
      // Badge might not exist, which is also valid
      expect(await productsPage.getCartItemCount()).toBe(0);
    }

    // Assert - Products show "Add to cart" buttons
    const addButtons = page.locator('[data-test^="add-to-cart"]');
    expect(await addButtons.count()).toBeGreaterThan(0);
  });
});
