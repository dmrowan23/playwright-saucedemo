const { test, expect } = require('../../fixtures/basePage');
const config = require('../../utils/config');

/**
 * Login tests
 *
 * Covers: successful login, locked user, invalid credentials.
 * Uses the loginPage fixture from basePage — no raw page calls here.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in successfully', async ({ loginPage, page }) => {
    await loginPage.login(
      config.standardUser.username,
      config.standardUser.password
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.login(
      config.lockedUser.username,
      config.lockedUser.password
    );

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('invalid credentials show an error message', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('empty username shows a validation error', async ({ loginPage }) => {
    await loginPage.login('', config.standardUser.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('empty password shows a validation error', async ({ loginPage }) => {
    await loginPage.login(config.standardUser.username, '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });
});
