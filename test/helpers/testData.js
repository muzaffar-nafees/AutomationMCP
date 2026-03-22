/**
 * Test Data Constants
 * 
 * Contains all test data used across test files
 */

export const TEST_USERS = {
  STANDARD_USER: {
    username: 'standard_user',
    password: 'secret_sauce',
    type: 'valid',
    description: 'Standard user with no issues',
  },
  PROBLEM_USER: {
    username: 'problem_user',
    password: 'secret_sauce',
    type: 'valid',
    description: 'User with visual/rendering issues',
  },
  PERFORMANCE_USER: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    type: 'valid',
    description: 'User experiencing performance glitches',
  },
  ERROR_USER: {
    username: 'error_user',
    password: 'secret_sauce',
    type: 'valid',
    description: 'User that triggers errors',
  },
  VISUAL_USER: {
    username: 'visual_user',
    password: 'secret_sauce',
    type: 'valid',
    description: 'User with visual differences',
  },
  LOCKED_OUT_USER: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    type: 'invalid',
    description: 'User that is locked out',
  },
};

export const TEST_PRODUCTS = {
  BACKPACK: {
    id: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
    price: 29.99,
    detailId: 4,
  },
  BIKE_LIGHT: {
    id: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
    price: 9.99,
    detailId: 0,
  },
  BOLT_SHIRT: {
    id: 'sauce-labs-bolt-t-shirt',
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    detailId: 1,
  },
  FLEECE_JACKET: {
    id: 'sauce-labs-fleece-jacket',
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
    detailId: 5,
  },
  ONESIE: {
    id: 'sauce-labs-onesie',
    name: 'Sauce Labs Onesie',
    price: 7.99,
    detailId: 2,
  },
  TEST_SHIRT: {
    id: 'test-allthethings-t-shirt-red',
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.99,
    detailId: 3,
  },
};

export const CHECKOUT_DATA = {
  VALID: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  WITH_SPECIAL_CHARS: {
    firstName: 'Jean-Pierre',
    lastName: "O'Brien-Smith",
    postalCode: '12345-6789',
  },
  NUMERIC: {
    firstName: '123',
    lastName: '456',
    postalCode: '78901',
  },
};

export const URLs = {
  BASE_URL: 'https://www.saucedemo.com/',
  LOGIN: 'https://www.saucedemo.com/',
  INVENTORY: 'https://www.saucedemo.com/inventory.html',
  CART: 'https://www.saucedemo.com/cart.html',
  CHECKOUT_STEP_1: 'https://www.saucedemo.com/checkout-step-one.html',
  CHECKOUT_STEP_2: 'https://www.saucedemo.com/checkout-step-two.html',
  CHECKOUT_COMPLETE: 'https://www.saucedemo.com/checkout-complete.html',
};

export const EXPECTED_MESSAGES = {
  LOCKED_OUT_ERROR: 'locked out',
  INVALID_CREDENTIALS: 'Username and password do not match',
  USERNAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required',
  FIRST_NAME_REQUIRED: 'First Name is required',
  LAST_NAME_REQUIRED: 'Last Name is required',
  POSTAL_CODE_REQUIRED: 'Postal Code is required',
  ORDER_COMPLETE: 'Thank you for your order!',
};

export const SORT_OPTIONS = {
  NAME_AZ: 'az',
  NAME_ZA: 'za',
  PRICE_LOW_TO_HIGH: 'lohi',
  PRICE_HIGH_TO_LOW: 'hilo',
};
