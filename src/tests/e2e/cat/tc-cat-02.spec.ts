import { test, expect } from '../../fixtures';

const products = {
  blueTop: 'Blue Top',
  menTshirt: 'Men Tshirt',
};

test.describe('TC-CAT-02 - Remove Products From Cart', () => {
  test.describe.configure({ mode: 'serial' });

  test(
    'TC-CAT-02-01 removes a single product from the cart',
    { tag: '@smoke' },
    async ({ page, productsPage, cartPage }) => {
      await productsPage.open();
      await productsPage.expectLoaded();

      const productName = await productsPage.addFirstProductToCart();
      await expect(page).toHaveURL(/\/view_cart$/);
      await cartPage.expectProductInCart(productName);
      await cartPage.removeProduct(productName);
      await cartPage.expectProductNotInCart(productName);
    },
  );

  test('TC-CAT-02-02 removes one product while preserving another', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    const firstProduct = productsPage.productCard(products.blueTop);
    const secondProduct = productsPage.productCard(products.menTshirt);
    await expect(firstProduct).toHaveCount(1);
    await expect(secondProduct).toHaveCount(1);

    await productsPage.addProductToCart(firstProduct);
    await productsPage.continueShopping();
    await productsPage.addProductToCart(secondProduct);
    await productsPage.viewCartFromModal();

    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductInCart(products.blueTop);
    await cartPage.expectProductInCart(products.menTshirt);
    await cartPage.removeProduct(products.blueTop);

    await cartPage.expectProductNotInCart(products.blueTop);
    await cartPage.expectProductInCart(products.menTshirt);
    await cartPage.expectProductQuantity(products.menTshirt, 1);
    await cartPage.expectProductPriceDisplayed(products.menTshirt);
  });

  test('TC-CAT-02-03 displays the empty cart state after removing the last item', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    const productName = await productsPage.addFirstProductToCart();
    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductInCart(productName);
    await cartPage.removeProduct(productName);
    await cartPage.expectEmptyCart();
  });

  test('TC-CAT-02-04 keeps the cart empty after reloading', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    const productName = await productsPage.addFirstProductToCart();
    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductInCart(productName);
    await cartPage.removeProduct(productName);

    await page.reload();

    await cartPage.expectProductNotInCart(productName);
    await cartPage.expectEmptyCart();
  });

  test('TC-CAT-02-05 allows a guest to remove a product from the cart', async ({
    page,
    homePage,
    productsPage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(page.getByText(/^Logged in as /)).not.toBeVisible();

    await productsPage.open();
    await productsPage.expectLoaded();
    const productName = await productsPage.addFirstProductToCart();
    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductInCart(productName);
    await cartPage.removeProduct(productName);

    await cartPage.expectProductNotInCart(productName);
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(page.getByText(/^Logged in as /)).not.toBeVisible();
  });
});
