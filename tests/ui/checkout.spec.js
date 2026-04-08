const { test, expect } = require('../../fixtures/basePage');
const { TestDataFactory } = require('../../test-data/TestDataFactory');

/**
 * Checkout tests
 *
 * Covers the full happy-path purchase flow and a validation error case.
 * Uses Faker via TestDataFactory for customer info — no hardcoded test data.
 */
test.describe('Checkout', () => {
  // Each test starts on the inventory page, already logged in
  test.beforeEach(async ({ authenticatedPage }) => {
    // Add a product so we have something to check out with
    await authenticatedPage.addProductToCart('Sauce Labs Backpack');
    await authenticatedPage.goToCart();
  });

  test('user can complete a full purchase', async ({ cartPage, checkoutPage }) => {
    const customer = TestDataFactory.generateCustomer();

    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );
    await checkoutPage.finishCheckout();

    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toContain('Thank you for your order');
  });

  test('cart shows the correct item before checkout', async ({ cartPage }) => {
    const items = await cartPage.getCartItemNames();

    expect(items).toContain('Sauce Labs Backpack');
    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('checkout requires first name', async ({ cartPage, checkoutPage }) => {
    await cartPage.checkout();
    // Deliberately leave first name blank
    await checkoutPage.fillCustomerInfo('', 'Smith', '2000');

    const error = await checkoutPage.errorMessage.textContent();
    expect(error).toContain('First Name is required');
  });

  test('order summary shows a total price', async ({ cartPage, checkoutPage }) => {
    const customer = TestDataFactory.generateCustomer();

    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );

    const total = await checkoutPage.getOrderTotal();
    expect(total).toMatch(/\$[\d.]+/);
  });
});
