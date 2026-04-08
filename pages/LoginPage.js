/**
 * LoginPage — Page Object Model for https://www.saucedemo.com
 *
 * Encapsulates all selectors and actions for the login page.
 * Tests should never reference raw locators — always go through this class.
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton   = page.locator('[data-test="login-button"]');
    this.errorMessage  = page.locator('[data-test="error"]');
  }

  /** Navigate to the login page */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Log in with the given credentials
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Returns the text of the visible error message */
  async getErrorMessage() {
    return this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
