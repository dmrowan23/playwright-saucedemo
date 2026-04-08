/**
 * InventoryPage — Page Object Model for /inventory.html
 *
 * Covers product listing, sorting, and adding/removing items from the cart.
 */
class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle       = page.locator('.title');
    this.inventoryItems  = page.locator('.inventory_item');
    this.sortDropdown    = page.locator('[data-test="product-sort-container"]');
    this.cartBadge       = page.locator('.shopping_cart_badge');
    this.cartLink        = page.locator('.shopping_cart_link');
    this.burgerMenu      = page.locator('#react-burger-menu-btn');
    this.logoutLink      = page.locator('#logout_sidebar_link');
  }

  /** Returns the name of every product currently visible on the page */
  async getProductNames() {
    return this.inventoryItems.locator('.inventory_item_name').allTextContents();
  }

  /** Returns the price of every product as an array of floats */
  async getProductPrices() {
    const priceTexts = await this.inventoryItems
      .locator('.inventory_item_price')
      .allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  /**
   * Add a product to the cart by its exact name
   * @param {string} productName
   */
  async addProductToCart(productName) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button').click();
  }

  /**
   * Remove a product from the cart by its exact name
   * @param {string} productName
   */
  async removeProductFromCart(productName) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button').click();
  }

  /**
   * Sort products using the dropdown
   * @param {'az'|'za'|'lohi'|'hilo'} sortValue
   */
  async sortBy(sortValue) {
    await this.sortDropdown.selectOption(sortValue);
  }

  /** Returns the number shown on the cart badge, or 0 if the badge is absent */
  async getCartCount() {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text, 10);
  }

  /** Navigate to the cart */
  async goToCart() {
    await this.cartLink.click();
  }

  /** Log out via the burger menu */
  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
