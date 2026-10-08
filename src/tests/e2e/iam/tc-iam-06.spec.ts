import { test, expect } from '../../fixtures';
import type { Page } from '@playwright/test';
import { createRegistrationData } from '../../../data/user-data';
import { AccountPage } from '../../../pages/account.page';
import { HomePage } from '../../../pages/home.page';
import { LoginPage } from '../../../pages/login.page';
import { cleanupAccount, seedAccount } from '../../../helpers/account-api';
import { loginAs, logoutAndExpectGuest } from '../../../helpers/session';

test.describe('TC-IAM-06 - Logout Flow And Restricted-Page Access Verification', () => {
  test('TC-IAM-06-01 logs out from the home page', async ({
    request,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await logoutAndExpectGuest(accountPage);
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-06-02 logs out from a secondary page', async ({
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
      await logoutAndExpectGuest(accountPage);
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-06-03 does not restore authenticated state after browser Back', async ({
    request,
    page,
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
      await logoutAndExpectGuest(accountPage);

      await page.goBack();

      await expect(page).toHaveURL(/\/products$/);
      await accountPage.expectGuestState();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-06-06 invalidates the session in another tab after logout', async ({
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

      await logoutAndExpectGuest(accountPage);
      await secondPage.reload();

      await secondAccountPage.expectGuestState();
    } finally {
      if (secondPage && !secondPage.isClosed()) {
        await secondPage.close();
      }
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-06-07 supports logging in again after logout', async ({
    request,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await logoutAndExpectGuest(accountPage);
      await loginPage.login(data.email, data.password);

      await accountPage.expectLoggedInAs(data.name);
      await expect(accountPage.logoutLink).toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });
});
