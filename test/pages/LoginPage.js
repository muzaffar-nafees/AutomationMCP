/**
 * Login Page Object Model
 * 
 * Encapsulates all interactions with the login page
 */
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.constants = {
      loginUrl: 'https://www.saucedemo.com/',
      inventoryUrl: /inventory\.html/,
    };
  }

  // ========== LOCATORS ==========
  get usernameInput() {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInput() {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  get errorCloseButton() {
    return this.page.locator('[data-test="error"] button');
  }

  // ========== ACTIONS ==========
  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.goto(this.constants.loginUrl);
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Complete login process
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Get error message text
   */
  async getErrorMessageText() {
    const text = await this.errorMessage.textContent();
    return text ? text.trim() : '';
  }

  /**
   * Check if error message is visible
   */
  async isErrorDisplayed() {
    try {
      return await this.errorMessage.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  /**
   * Close error message
   */
  async closeErrorMessage() {
    if (await this.isErrorDisplayed()) {
      await this.errorCloseButton.click();
    }
  }

  /**
   * Wait for successful login (redirect to inventory)
   */
  async waitForLoginSuccess() {
    await this.waitForURL(this.constants.inventoryUrl);
  }
}
