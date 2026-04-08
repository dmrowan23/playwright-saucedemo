const { test: base } = require('@playwright/test');
const { LoginPage }    = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage }     = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const config           = require('../utils/config');

/**
 * Extended fixtures that provide:
 *  - All page objects pre-instantiated
 *  - An `authenticatedPage` fixture that logs in as standard_user before the test
 *
 * Usage in tests:
 *   const { test } = require('../../fixtures/basePage');
 *   test('my test', async ({ loginPage, inventoryPage }) => { ... });
 */
const test = base.extend({
  // Page object fixtures — available in every test
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Authenticated fixture — navigates to inventory page already logged in
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      config.standardUser.username,
      config.standardUser.password
    );
    // Hand control to the test with an InventoryPage ready to go
    await use(new InventoryPage(page));
  },
});

const { expect } = base;

module.exports = { test, expect };
