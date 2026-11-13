import { test, expect } from '../../fixtures';
import type { ProductsPage } from '../../../pages/products.page';

const products = {
  blueTop: 'Blue Top',
  menTshirt: 'Men Tshirt',
};

async function addProductCopies(
  productsPage: ProductsPage,
  productName: string,
  quantity: number,
): Promise<void> {
  const productCard = productsPage.productCard(productName);
  await expect(productCard).toHaveCount(1);

  for (let count = 0; count < quantity; count += 1) {
    await productsPage.addProductToCart(productCard);
    if (count < quantity - 1) {
      await productsPage.continueShopping();
    }
  }
}

test.describe('TC-CAT-04 - Cart Quantity Updates And Price Calculations', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-CAT-04-01 increases a product quantity to three and recalculates its line total', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    const productName = await productsPage.productName();
    await addProductCopies(productsPage, productName, 1);
    await productsPage.viewCartFromModal();
    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductQuantity(productName, 1);
    const unitPrice = await cartPage.getProductUnitPrice(productName);
    expect(await cartPage.getProductLineTotal(productName)).toBe(unitPrice);

    await productsPage.open();
    await productsPage.expectLoaded();
    await addProductCopies(productsPage, productName, 2);
    await productsPage.viewCartFromModal();

    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductQuantity(productName, 3);
    expect(await cartPage.getProductLineTotal(productName)).toBe(unitPrice * 3);
  });

  test('TC-CAT-04-02 replaces quantity three with two and recalculates the line total', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    const productName = await productsPage.productName();
    await addProductCopies(productsPage, productName, 3);
    await productsPage.viewCartFromModal();
    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductQuantity(productName, 3);
    const unitPrice = await cartPage.getProductUnitPrice(productName);
    expect(await cartPage.getProductLineTotal(productName)).toBe(unitPrice * 3);

    await cartPage.removeProduct(productName);
    await page.reload();
    await cartPage.expectEmptyCart();
    await productsPage.open();
    await productsPage.expectLoaded();
    await addProductCopies(productsPage, productName, 2);
    await productsPage.viewCartFromModal();

    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductQuantity(productName, 2);
    expect(await cartPage.getProductLineTotal(productName)).toBe(unitPrice * 2);
  });

  test('TC-CAT-04-03 calculates line totals for multiple products with different quantities', async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();
    await productsPage.expectLoaded();

    await addProductCopies(productsPage, products.blueTop, 2);
    await productsPage.continueShopping();
    await addProductCopies(productsPage, products.menTshirt, 1);
    await productsPage.viewCartFromModal();

    await expect(page).toHaveURL(/\/view_cart$/);
    await cartPage.expectProductQuantity(products.blueTop, 2);
    await cartPage.expectProductQuantity(products.menTshirt, 1);

    const blueTopUnitPrice = await cartPage.getProductUnitPrice(products.blueTop);
    const menTshirtUnitPrice = await cartPage.getProductUnitPrice(products.menTshirt);
    const blueTopLineTotal = await cartPage.getProductLineTotal(products.blueTop);
    const menTshirtLineTotal = await cartPage.getProductLineTotal(products.menTshirt);

    expect(blueTopLineTotal).toBe(blueTopUnitPrice * 2);
    expect(menTshirtLineTotal).toBe(menTshirtUnitPrice);
  });
});
