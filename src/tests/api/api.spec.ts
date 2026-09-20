import { test, expect } from '../fixtures';

test.describe('products API smoke', () => {
  test('returns the products list contract', { tag: '@smoke' }, async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeInstanceOf(Array);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(String),
      }),
    );
  });
});
