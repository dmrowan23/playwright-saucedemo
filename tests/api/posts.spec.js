const { test, expect } = require('@playwright/test');

/**
 * API tests — targeting the public JSONPlaceholder API (https://jsonplaceholder.typicode.com)
 *
 * Saucedemo doesn't expose a public REST API, so these tests demonstrate
 * Playwright's APIRequestContext against JSONPlaceholder — a standard practice
 * used in portfolios and technical interviews to show API testing capability.
 *
 * In a real project you'd point these at your own app's API endpoints.
 */
test.describe('API — Posts endpoint', () => {
  let request;

  test.beforeAll(async ({ playwright }) => {
    // Create a dedicated API request context — separate from the browser
    request = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  test('GET /posts returns a list of posts', async () => {
    const response = await request.get('/posts');

    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
  });

  test('GET /posts/:id returns a single post', async () => {
    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post).toHaveProperty('id', 1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  test('POST /posts creates a new post', async () => {
    const newPost = {
      title: 'Playwright API test',
      body: 'Testing POST requests with Playwright',
      userId: 1,
    };

    const response = await request.post('/posts', { data: newPost });

    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created).toHaveProperty('id');
    expect(created.title).toBe(newPost.title);
    expect(created.body).toBe(newPost.body);
  });

  test('PUT /posts/:id updates an existing post', async () => {
    const updated = {
      id: 1,
      title: 'Updated title',
      body: 'Updated body',
      userId: 1,
    };

    const response = await request.put('/posts/1', { data: updated });

    expect(response.status()).toBe(200);

    const result = await response.json();
    expect(result.title).toBe(updated.title);
  });

  test('DELETE /posts/:id returns 200', async () => {
    const response = await request.delete('/posts/1');

    expect(response.status()).toBe(200);
  });

  test('GET /posts/:id with invalid id returns 404', async () => {
    const response = await request.get('/posts/99999');

    expect(response.status()).toBe(404);
  });
});
