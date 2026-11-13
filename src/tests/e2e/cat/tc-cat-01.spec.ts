import { test, expect } from '../../fixtures';

const products = {
  blueTop: 'Blue Top',
  menTshirt: 'Men Tshirt',
};

test.describe('TC-CAT-01 - Add Products To Cart', () => {
  test(
    'TC-CAT-01-01 adds a product from the listing and confirms it in the cart',
    { tag: '@smoke' },
    async ({ page, productsPage, cartPage }) => {
      await productsPage.open();
      await productsPage.expectLoaded();

      const productName = await productsPage.productName();
      await productsPage.addProductToCart();
      await productsPage.viewCartFromModal();

      await expect(page).toHaveURL(/\/view_cart$/);
      await cartPage.expectProductInCart(productName);
      await cartPage.expectProductQuantity(productName, 1);
      await cartPage.expectProductPriceDisplayed(productName);
    },
  );

  test('TC-CAT-01-02 adds two distinct products to the cart', async ({
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

    await cartPage.expectProductInCart(products.blueTop);
    await cartPage.expectProductQuantity(products.blueTop, 1);
    await cartPage.expectProductPriceDisplayed(products.blueTop);
    await cartPage.expectProductInCart(products.menTshirt);
    await cartPage.expectProductQuantity(products.menTshirt, 1);
    await cartPage.expectProductPriceDisplayed(products.menTshirt);
  });

  test('TC-CAT-01-03 increments quantity when the same product is added twice', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    const productName = await productsPage.productName();
    await productsPage.addProductToCart();
    await productsPage.continueShopping();
    await productsPage.addProductToCart();
    await productsPage.viewCartFromModal();

    await cartPage.expectProductInCart(productName);
    await cartPage.expectProductQuantity(productName, 2);
  });

  test('TC-CAT-01-04 adds a product from its details page', async ({
    page,
    productsPage,
    productDetailsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();
    await productsPage.openFirstProductDetails();
    await productDetailsPage.expectLoaded();

    const productName = await productDetailsPage.getProductName();
    await productDetailsPage.addToCart();
    await productDetailsPage.viewCart();

    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductInCart(productName);
    await cartPage.expectProductQuantity(productName, 1);
  });

  test('TC-CAT-01-05 adds a quantity of ten from the product details page', async ({
    productsPage,
    productDetailsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();
    await productsPage.openFirstProductDetails();
    await productDetailsPage.expectLoaded();

    const productName = await productDetailsPage.getProductName();
    await productDetailsPage.addToCart(10);
    await productDetailsPage.viewCart();

    await cartPage.expectProductInCart(productName);
    await cartPage.expectProductQuantity(productName, 10);
  });

  test('TC-CAT-01-06 keeps the cart item after a page reload', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    const productName = await productsPage.productName();
    await productsPage.addProductToCart();
    await productsPage.viewCartFromModal();
    await cartPage.expectProductInCart(productName);

    await page.reload();

    await cartPage.expectProductInCart(productName);
    await cartPage.expectProductQuantity(productName, 1);
    await cartPage.expectProductPriceDisplayed(productName);
  });

  test('TC-CAT-01-07 allows a guest to add and view a product', async ({
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
    const productName = await productsPage.productName();
    await productsPage.addProductToCart();
    await productsPage.viewCartFromModal();

    await cartPage.expectProductInCart(productName);
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(page.getByText(/^Logged in as /)).not.toBeVisible();
  });
});
