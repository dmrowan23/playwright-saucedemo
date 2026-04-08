// Central config for environment variables and test credentials.
// In CI, these come from GitHub Actions secrets.
// Locally, copy .env.example to .env and fill in your values.

const config = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

  // Standard user — use for happy path tests
  standardUser: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },

  // Locked out user — use for negative auth tests
  lockedUser: {
    username: process.env.LOCKED_USER || 'locked_out_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },

  // Problem user — use for visual/bug testing
  problemUser: {
    username: process.env.PROBLEM_USER || 'problem_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
};

module.exports = config;
