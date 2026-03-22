/**
 * Base Page Class
 * 
 * This is the parent class for all page objects.
 * Contains common functionality used across all pages.
 */
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current page URL
   */
  getPageUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   */
  getPageTitle() {
    return this.page.title();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Wait for URL to match regex
   */
  async waitForURL(urlPattern) {
    await this.page.waitForURL(urlPattern);
  }
}
