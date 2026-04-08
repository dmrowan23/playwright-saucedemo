# Playwright Automation Framework

End-to-end and API test automation framework for [saucedemo.com](https://www.saucedemo.com), built with Playwright and JavaScript.

## Stack

- [Playwright](https://playwright.dev/) — test runner, browser automation, API testing
- [Faker](https://fakerjs.dev/) — dynamic test data generation
- [GitHub Actions](https://docs.github.com/en/actions) — CI/CD with parallel sharding

## Project structure

```
├── .github/workflows/       # GitHub Actions CI pipeline
├── fixtures/
│   └── basePage.js          # Extended test fixtures (page objects + auth)
├── pages/                   # Page Object Model classes
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── test-data/
│   └── TestDataFactory.js   # Faker-powered test data factory
├── tests/
│   ├── ui/                  # Browser-based end-to-end tests
│   │   ├── login.spec.js
│   │   ├── inventory.spec.js
│   │   └── checkout.spec.js
│   └── api/                 # API tests using Playwright request context
│       └── posts.spec.js
├── utils/
│   └── config.js            # Environment config and credentials
└── playwright.config.js     # Playwright configuration
```

## Getting started

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run in headed mode (watch the browser)
npm run test:headed

# Debug a test interactively
npm run test:debug

# Open the HTML report
npm run report
```

## CI/CD

Tests run automatically on every push and pull request via GitHub Actions. The pipeline:
- Runs across 3 parallel shards to reduce total run time
- Tests on Chromium, Firefox and WebKit
- Uploads an HTML report as a downloadable artifact after every run
- Reads credentials from GitHub Actions secrets (never hardcoded)

To set up secrets in your repository: **Settings → Secrets and variables → Actions** and add `STANDARD_USER` and `PASSWORD`.
