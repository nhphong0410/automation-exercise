import { test, expect } from '../../fixtures';
import type { BrowserContext, Page } from '@playwright/test';
import { createRegistrationData } from '../../../data/user-data';
import { AccountPage } from '../../../pages/account.page';
import { HomePage } from '../../../pages/home.page';
import { cleanupAccount, seedAccount } from '../../../helpers/account-api';
import { blockAdNetworks, loginAs } from '../../../helpers/session';

test.describe('TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen', () => {
  test('TC-IAM-08-01 preserves the session after a page reload', async ({
    request,
    page,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await page.reload();

      await expect(page).toHaveURL(/\/$/);
      await accountPage.expectLoggedInAs(data.name);
      await expect(accountPage.logoutLink).toBeVisible();
      await expect(accountPage.deleteAccountLink).toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-08-02 shares the session with another tab in the same context', async ({
    request,
    context,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);
    let secondPage: Page | undefined;

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      secondPage = await context.newPage();
      const secondHomePage = new HomePage(secondPage);
      const secondAccountPage = new AccountPage(secondPage);
      await secondHomePage.open();
      await secondHomePage.expectLoaded();

      await secondAccountPage.expectLoggedInAs(data.name);
      await expect(secondAccountPage.logoutLink).toBeVisible();
      await expect(secondAccountPage.deleteAccountLink).toBeVisible();
    } finally {
      if (secondPage && !secondPage.isClosed()) {
        await secondPage.close();
      }
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-08-03 restores the session in a new tab after closing the current tab', async ({
    request,
    page,
    context,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);
    let restoredPage: Page | undefined;

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await page.close();
      restoredPage = await context.newPage();
      const restoredHomePage = new HomePage(restoredPage);
      const restoredAccountPage = new AccountPage(restoredPage);
      await restoredHomePage.open();
      await restoredHomePage.expectLoaded();

      await restoredAccountPage.expectLoggedInAs(data.name);
      await expect(restoredAccountPage.logoutLink).toBeVisible();
      await expect(restoredAccountPage.deleteAccountLink).toBeVisible();
    } finally {
      if (restoredPage && !restoredPage.isClosed()) {
        await restoredPage.close();
      }
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-08-04 keeps authentication isolated to its browser context', async ({
    request,
    browser,
    homePage,
    loginPage,
    accountPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);
    let isolatedContext: BrowserContext | undefined;

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      isolatedContext = await browser.newContext();
      await blockAdNetworks(isolatedContext);
      const isolatedPage = await isolatedContext.newPage();
      const isolatedHomePage = new HomePage(isolatedPage);
      const isolatedAccountPage = new AccountPage(isolatedPage);
      await isolatedPage.goto(new URL('/', page.url()).toString());
      await isolatedHomePage.expectLoaded();
      await isolatedAccountPage.expectGuestState();

      await accountPage.expectLoggedInAs(data.name);
    } finally {
      if (isolatedContext) {
        await isolatedContext.close();
      }
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-08-05 preserves the session during direct deep-link navigation', async ({
    request,
    homePage,
    loginPage,
    accountPage,
    productsPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await productsPage.open();
      await productsPage.expectLoaded();
      await productsPage.expectLoggedInAs(data.name);
      await expect(accountPage.logoutLink).toBeVisible();
      await expect(accountPage.deleteAccountLink).toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-08-06 returns to guest state after clearing cookies', async ({
    request,
    context,
    homePage,
    loginPage,
    accountPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await context.clearCookies();
      await page.reload();

      await accountPage.expectGuestState();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-08-07 preserves the authenticated session and cart item after reload', async ({
    request,
    homePage,
    loginPage,
    accountPage,
    productsPage,
    cartPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await productsPage.open();
      await productsPage.expectLoaded();
      const productName = await productsPage.addFirstProductToCart();
      await cartPage.expectProductInCart(productName);
      await cartPage.expectProductQuantity(productName, 1);

      await page.reload();
      await accountPage.expectLoggedInAs(data.name);
      await cartPage.expectProductInCart(productName);
      await cartPage.expectProductQuantity(productName, 1);
    } finally {
      await cleanupAccount(request, data);
    }
  });
});
