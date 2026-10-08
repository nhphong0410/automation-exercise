import { test, expect } from '../../fixtures';
import type { APIRequestContext, Page } from '@playwright/test';
import { createRegistrationData, type RegistrationData } from '../../../data/user-data';
import { AccountPage } from '../../../pages/account.page';
import { HomePage } from '../../../pages/home.page';
import { LoginPage } from '../../../pages/login.page';

async function seedAccount(request: APIRequestContext, data: RegistrationData): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: data.name,
      email: data.email,
      password: data.password,
      title: 'Mr',
      firstname: data.firstName,
      lastname: data.lastName,
      company: data.company,
      address1: data.address,
      address2: data.address2,
      country: data.country,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
      mobile_number: data.mobileNumber,
    },
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(201);
}

async function cleanupAccount(
  request: APIRequestContext,
  data: Pick<RegistrationData, 'email' | 'password'>,
): Promise<void> {
  const response = await request.delete('/api/deleteAccount', {
    form: {
      email: data.email,
      password: data.password,
    },
    timeout: 10000,
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect([200, 404]).toContain(body.responseCode);
}

async function loginAs(
  homePage: HomePage,
  loginPage: LoginPage,
  accountPage: AccountPage,
  data: Pick<RegistrationData, 'name' | 'email' | 'password'>,
): Promise<void> {
  await homePage.open();
  await homePage.expectLoaded();
  await homePage.openLogin();
  await loginPage.expectLoginLoaded();
  await loginPage.login(data.email, data.password);

  await accountPage.expectLoggedInAs(data.name);
}

async function logoutAndExpectGuest(accountPage: AccountPage): Promise<void> {
  await accountPage.logout();
  await accountPage.expectLoggedOut();
}

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
