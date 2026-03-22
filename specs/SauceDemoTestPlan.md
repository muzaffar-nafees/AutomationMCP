# Sauce Demo - Comprehensive Test Plan

## Application Overview

The Sauce Demo application is an e-commerce platform that allows users to browse and purchase products. It features user authentication with different test accounts, product catalog with filtering/sorting, shopping cart management, and a checkout process with multiple steps. The application is designed for testing purposes with various user types that demonstrate different testing scenarios (standard users, locked-out users, users with performance issues, visual glitches, and error users).

## Test Scenarios

### 1. Login Scenarios

**Seed:** `test/seed.spec.ts`

#### 1.1. Valid login with standard_user

**File:** `tests/login/valid-login-standard-user.spec.ts`

**Steps:**
  1. -
    - expect: User should be redirected to inventory.html page
    - expect: Products page should load successfully
    - expect: Cart counter should be visible in header
  2. -
    - expect: Page title should remain 'Swag Labs'
    - expect: Product list should display all available products

#### 1.2. Valid login with problem_user

**File:** `tests/login/valid-login-problem-user.spec.ts`

**Steps:**
  1. -
    - expect: User should be redirected to inventory.html
    - expect: Products should load despite potential visual issues

#### 1.3. Valid login with performance_glitch_user

**File:** `tests/login/valid-login-performance-user.spec.ts`

**Steps:**
  1. -
    - expect: User should eventually reach inventory page
    - expect: Page should load with possible delays

#### 1.4. Valid login with error_user

**File:** `tests/login/valid-login-error-user.spec.ts`

**Steps:**
  1. -
    - expect: User should be redirected to inventory page
    - expect: Errors may be logged but page should remain functional

#### 1.5. Valid login with visual_user

**File:** `tests/login/valid-login-visual-user.spec.ts`

**Steps:**
  1. -
    - expect: User should be logged in successfully
    - expect: Visual elements may have rendering differences

#### 1.6. Invalid login - locked_out_user

**File:** `tests/login/locked-out-user-attempt.spec.ts`

**Steps:**
  1. -
    - expect: Error message should be displayed
    - expect: User should not be redirected to products page
    - expect: Error message should contain 'do not have access'

#### 1.7. Invalid login - wrong password

**File:** `tests/login/wrong-password-error.spec.ts`

**Steps:**
  1. -
    - expect: User should remain on login page
    - expect: Error message should be displayed saying 'Username and password do not match any user in this service'

#### 1.8. Invalid login - empty username

**File:** `tests/login/empty-username-error.spec.ts`

**Steps:**
  1. -
    - expect: Error should be shown: 'Username is required'
    - expect: User should remain on login page

#### 1.9. Invalid login - empty password

**File:** `tests/login/empty-password-error.spec.ts`

**Steps:**
  1. -
    - expect: Error should be shown: 'Password is required'
    - expect: User should remain on login page

#### 1.10. Invalid login - both fields empty

**File:** `tests/login/empty-credentials-error.spec.ts`

**Steps:**
  1. -
    - expect: Error message should appear
    - expect: User should remain on login page

### 2. Product Interactions

**Seed:** `test/seed.spec.ts`

#### 2.1. View product details from inventory

**File:** `tests/products/view-product-details.spec.ts`

**Steps:**
  1. -
    - expect: Clicking on product name should navigate to product detail page
    - expect: Product image should be displayed
    - expect: Product name, description, and price should be visible
    - expect: Add to cart button should be present

#### 2.2. Sort products by Name A to Z

**File:** `tests/products/sort-by-name-az.spec.ts`

**Steps:**
  1. -
    - expect: Products should be sorted alphabetically (A-Z)
    - expect: Sauce Labs Backpack should appear first
    - expect: Test.allTheThings() T-Shirt should appear last

#### 2.3. Sort products by Name Z to A

**File:** `tests/products/sort-by-name-za.spec.ts`

**Steps:**
  1. -
    - expect: Products should be sorted in reverse alphabetical order (Z-A)
    - expect: Test.allTheThings() T-Shirt should appear first
    - expect: Sauce Labs Backpack should appear last

#### 2.4. Sort products by Price low to high

**File:** `tests/products/sort-by-price-low-to-high.spec.ts`

**Steps:**
  1. -
    - expect: Products should be sorted by price ascending
    - expect: Sauce Labs Onesie ($7.99) should appear first
    - expect: Sauce Labs Fleece Jacket ($49.99) should appear last

#### 2.5. Sort products by Price high to low

**File:** `tests/products/sort-by-price-high-to-low.spec.ts`

**Steps:**
  1. -
    - expect: Products should be sorted by price descending
    - expect: Sauce Labs Fleece Jacket ($49.99) should appear first
    - expect: Sauce Labs Onesie ($7.99) should appear last

#### 2.6. Navigate back from product detail page

**File:** `tests/products/navigate-back-from-detail.spec.ts`

**Steps:**
  1. -
    - expect: 'Back to products' button should be present on product detail page
    - expect: Clicking it should return to inventory page

### 3. Cart Operations

**Seed:** `test/seed.spec.ts`

#### 3.1. Add single product to cart

**File:** `tests/cart/add-single-product.spec.ts`

**Steps:**
  1. -
    - expect: 'Add to cart' button should change to 'Remove'
    - expect: Cart counter badge should display '1'
    - expect: Clicking cart icon should open cart with the added product

#### 3.2. Add multiple products to cart

**File:** `tests/cart/add-multiple-products.spec.ts`

**Steps:**
  1. -
    - expect: Each product should have an 'Add to cart' button
    - expect: Cart counter should increment with each addition
    - expect: Cart counter should display the total number of items

#### 3.3. View cart contents

**File:** `tests/cart/view-cart-contents.spec.ts`

**Steps:**
  1. -
    - expect: Cart page should display 'Your Cart' heading
    - expect: All added products should be listed with QTY and Description columns
    - expect: Each product should show quantity, name, description, and price

#### 3.4. Remove product from cart

**File:** `tests/cart/remove-product-from-cart.spec.ts`

**Steps:**
  1. -
    - expect: 'Remove' button should be present in cart for each product
    - expect: Clicking remove should delete product from cart
    - expect: Cart counter should decrease by 1

#### 3.5. Continue shopping from cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. -
    - expect: 'Continue Shopping' button should be present on cart page
    - expect: Clicking it should return to inventory page
    - expect: Cart items should remain in cart

### 4. Checkout Flow

**Seed:** `test/seed.spec.ts`

#### 4.1. Complete checkout with valid information

**File:** `tests/checkout/complete-checkout-valid.spec.ts`

**Steps:**
  1. -
    - expect: Checkout button should navigate to checkout-step-one.html
    - expect: Form should have First Name, Last Name, and Zip/Postal Code fields
    - expect: Enter valid data and click Continue
    - expect: Should navigate to checkout-step-two.html (overview page)
    - expect: Overview should show order summary with items, prices, tax, and total
    - expect: Click Finish to complete order
    - expect: Should see 'Thank you for your order!' message and success page

#### 4.2. Checkout - missing first name

**File:** `tests/checkout/missing-first-name.spec.ts`

**Steps:**
  1. -
    - expect: Error message should appear: 'First Name is required'
    - expect: User should remain on checkout-step-one.html

#### 4.3. Checkout - missing last name

**File:** `tests/checkout/missing-last-name.spec.ts`

**Steps:**
  1. -
    - expect: Error message should appear: 'Last Name is required'
    - expect: User should remain on checkout-step-one.html

#### 4.4. Checkout - missing zip code

**File:** `tests/checkout/missing-zip-code.spec.ts`

**Steps:**
  1. -
    - expect: Error message should appear: 'Zip/Postal Code is required'
    - expect: User should remain on checkout-step-one.html

#### 4.5. Cancel checkout from step one

**File:** `tests/checkout/cancel-step-one.spec.ts`

**Steps:**
  1. -
    - expect: Cancel button should return to cart page
    - expect: Cart items should still be present

#### 4.6. Cancel checkout from overview step

**File:** `tests/checkout/cancel-step-two.spec.ts`

**Steps:**
  1. -
    - expect: Cancel button on overview page should return to cart
    - expect: Cart items should remain unchanged

### 5. Edge Cases and Validations

**Seed:** `test/seed.spec.ts`

#### 5.1. Verify cart persists after logout and login

**File:** `tests/edge-cases/cart-persistence-after-relogin.spec.ts`

**Steps:**
  1. -
    - expect: Add items to cart
    - expect: Logout via menu or direct navigation
    - expect: Login again
    - expect: Verify cart is empty (or check if cart is persistence - this depends on app behavior)

#### 5.2. Check price calculations with multiple items

**File:** `tests/edge-cases/price-calculation.spec.ts`

**Steps:**
  1. -
    - expect: Add multiple items with different prices
    - expect: Verify item total is correct sum
    - expect: Verify tax is calculated correctly (usually ~8%)
    - expect: Verify grand total = item total + tax

#### 5.3. Special characters in checkout form

**File:** `tests/edge-cases/special-characters-checkout.spec.ts`

**Steps:**
  1. -
    - expect: Enter special characters in First Name field
    - expect: Verify form accepts or rejects them appropriately
    - expect: Repeat for Last Name and Zip Code fields

#### 5.4. Reset app state functionality

**File:** `tests/edge-cases/reset-app-state.spec.ts`

**Steps:**
  1. -
    - expect: Add items to cart
    - expect: Open menu and click 'Reset App State'
    - expect: Verify cart is cleared
    - expect: Verify application returns to initial state
