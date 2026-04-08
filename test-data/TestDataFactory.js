const { faker } = require('@faker-js/faker');

/**
 * TestDataFactory — generates realistic fake data for tests.
 *
 * Using Faker keeps tests independent of hardcoded strings and makes
 * it easy to vary data across runs, catching edge cases over time.
 */
const TestDataFactory = {
  /**
   * Generates a random customer for the checkout form
   * @returns {{ firstName: string, lastName: string, postalCode: string }}
   */
  generateCustomer() {
    return {
      firstName: faker.person.firstName(),
      lastName:  faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  },

  /**
   * Generates a random user (useful for negative/registration tests)
   * @returns {{ username: string, password: string, email: string }}
   */
  generateUser() {
    return {
      username: faker.internet.username(),
      password: faker.internet.password({ length: 12 }),
      email:    faker.internet.email(),
    };
  },
};

module.exports = { TestDataFactory };
