const { test, expect } = require('../../fixtures/basePage');

/**
 * Inventory tests
 *
 * Uses the `authenticatedPage` fixture — arrives already logged in.
 * Covers: product listing, sorting, add/remove from cart.
 */
test.describe('Inventory', () => {
  // All inventory tests start already logged in
  test('inventory page displays products', async ({ authenticatedPage }) => {
    const names = await authenticatedPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Sauce Labs Backpack');
  });

  test('products can be sorted by price low to high', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('lohi');

    const prices = await authenticatedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('products can be sorted by price high to low', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('hilo');

    const prices = await authenticatedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

  test('products can be sorted alphabetically A to Z', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('az');

    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });

  test('adding a product increments the cart badge', async ({ authenticatedPage }) => {
    await authenticatedPage.addProductToCart('Sauce Labs Backpack');

    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(1);
  });

  test('adding multiple products shows correct cart count', async ({ authenticatedPage }) => {
    await authenticatedPage.addProductToCart('Sauce Labs Backpack');
    await authenticatedPage.addProductToCart('Sauce Labs Bike Light');

    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(2);
  });

  test('removing a product decrements the cart badge', async ({ authenticatedPage }) => {
    await authenticatedPage.addProductToCart('Sauce Labs Backpack');
    await authenticatedPage.removeProductFromCart('Sauce Labs Backpack');

    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(0);
  });
});
