import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { TEST_USERS, EXPECTED_MESSAGES } from './helpers/testData.js';

test.describe('🔐 LOGIN SCENARIOS', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('TC-01: Valid login with standard_user', async ({ page }) => {
    const user = TEST_USERS.STANDARD_USER;
    await loginPage.login(user.username, user.password);
    await loginPage.waitForLoginSuccess();
    await expect(page).toHaveURL(/inventory\.html/);
    expect(await loginPage.getPageTitle()).toBe('Swag Labs');
  });

  test('TC-02: Valid login with problem_user', async ({ page }) => {
    const user = TEST_USERS.PROBLEM_USER;
    await loginPage.login(user.username, user.password);
    await loginPage.waitForLoginSuccess();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-03: Valid login with performance_glitch_user', async ({ page }) => {
    const user = TEST_USERS.PERFORMANCE_USER;
    await loginPage.login(user.username, user.password);
    await loginPage.waitForLoginSuccess();
    await expect(page).toHaveURL(/inventory\.html/, { timeout: 15000 });
  });

  test('TC-04: Valid login with error_user', async ({ page }) => {
    const user = TEST_USERS.ERROR_USER;
    await loginPage.login(user.username, user.password);
    await loginPage.waitForLoginSuccess();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-05: Valid login with visual_user', async ({ page }) => {
    const user = TEST_USERS.VISUAL_USER;
    await loginPage.login(user.username, user.password);
    await loginPage.waitForLoginSuccess();
    await expect(page).toHaveURL(/inventory\.html/);
  });


  test('TC-06: Invalid login - locked_out_user', async ({ page }) => {
    const user = TEST_USERS.LOCKED_OUT_USER;
    await loginPage.login(user.username, user.password);
    expect(await loginPage.isErrorDisplayed()).toBe(true);
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain(EXPECTED_MESSAGES.LOCKED_OUT_ERROR);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('TC-07: Invalid login - wrong password', async ({ page }) => {
    const user = TEST_USERS.STANDARD_USER;

    // Act
    await loginPage.login(user.username, 'wrong_password');

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBe(true);
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain(EXPECTED_MESSAGES.INVALID_CREDENTIALS);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('TC-08: Invalid login - empty username', async ({ page }) => {
    // Arrange
    // Username field left empty

    // Act
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBe(true);
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain(EXPECTED_MESSAGES.USERNAME_REQUIRED);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('TC-09: Invalid login - empty password', async ({ page }) => {
    // Arrange
    // Password field left empty

    // Act
    await loginPage.enterUsername('standard_user');
    await loginPage.clickLogin();

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBe(true);
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain(EXPECTED_MESSAGES.PASSWORD_REQUIRED);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('TC-10: Invalid login - both fields empty', async ({ page }) => {
    await loginPage.clickLogin();

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBe(true);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });
});
