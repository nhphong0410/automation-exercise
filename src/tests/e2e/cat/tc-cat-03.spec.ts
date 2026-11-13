import { test, expect } from '../../fixtures';
import { createRegistrationData } from '../../../data/user-data';
import { cleanupAccount, seedAccount } from '../../../helpers/account-api';
import { loginAs } from '../../../helpers/session';

test.describe('TC-CAT-03 - Cart Persistence Across Authentication Sessions', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-CAT-03-01 retains a guest cart after login', async ({
    request,
    page,
    homePage,
    loginPage,
    accountPage,
    productsPage,
    cartPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await productsPage.open();
      await productsPage.expectLoaded();
      const productName = await productsPage.addFirstProductToCart();
      await expect(page).toHaveURL(/\/view_cart$/);
      await cartPage.expectProductInCart(productName);

      await homePage.signupLoginLink.click();
      await loginPage.expectLoginLoaded();
      await loginPage.login(data.email, data.password);
      await accountPage.expectLoggedInAs(data.name);

      await cartPage.open();
      await cartPage.expectProductInCart(productName);
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-CAT-03-02 observes cart contents after logout', async ({
    request,
    page,
    homePage,
    loginPage,
    accountPage,
    productsPage,
    cartPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await productsPage.open();
      await productsPage.expectLoaded();
      const productName = await productsPage.addFirstProductToCart();
      await expect(page).toHaveURL(/\/view_cart$/);
      await cartPage.expectProductInCart(productName);

      await accountPage.logout();
      await accountPage.expectLoggedOut();
      await cartPage.open();

      const cartItemCount = await cartPage.cartItems.count();
      if (cartItemCount === 1) {
        await cartPage.expectProductInCart(productName);
        await cartPage.expectProductQuantity(productName, 1);
      } else {
        await cartPage.expectEmptyCart();
      }
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-CAT-03-03 preserves a guest cart through registration', async ({
    request,
    page,
    homePage,
    loginPage,
    accountInformationPage,
    accountCreatedPage,
    accountPage,
    productsPage,
    cartPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);

    try {
      await productsPage.open();
      await productsPage.expectLoaded();
      const productName = await productsPage.addFirstProductToCart();
      await expect(page).toHaveURL(/\/view_cart$/);
      await cartPage.expectProductInCart(productName);

      await homePage.signupLoginLink.click();
      await loginPage.expectLoaded();
      await loginPage.signUp(data.name, data.email);

      await accountInformationPage.expectLoaded();
      await accountInformationPage.completeRegistration(data);
      await accountCreatedPage.expectLoaded();
      await accountCreatedPage.continue();
      await accountPage.expectLoggedInAs(data.name);

      await cartPage.open();
      await cartPage.expectProductInCart(productName);
    } finally {
      await cleanupAccount(request, data);
    }
  });
});
