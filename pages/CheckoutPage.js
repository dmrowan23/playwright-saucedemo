/**
 * CheckoutPage — Page Object Model for /checkout-step-one.html and /checkout-step-two.html
 */
class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Step one — customer info
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput  = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage   = page.locator('[data-test="error"]');

    // Step two — order summary
    this.finishButton   = page.locator('[data-test="finish"]');
    this.summaryTotal   = page.locator('.summary_total_label');

    // Confirmation
    this.confirmationHeader = page.locator('.complete-header');
  }

  /**
   * Fill in the customer information form
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   */
  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /** Complete the order on the summary page */
  async finishCheckout() {
    await this.finishButton.click();
  }

  /** Returns the total price string from the order summary */
  async getOrderTotal() {
    return this.summaryTotal.textContent();
  }

  /** Returns the confirmation message after a successful order */
  async getConfirmationMessage() {
    return this.confirmationHeader.textContent();
  }
}

module.exports = { CheckoutPage };
