/**
 * CartPage — Page Object Model for /cart.html
 */
class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.cartItems      = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue-shopping"]');
  }

  /** Returns the names of all items currently in the cart */
  async getCartItemNames() {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  /** Returns the number of items in the cart */
  async getCartItemCount() {
    return this.cartItems.count();
  }

  /** Proceed to checkout */
  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
