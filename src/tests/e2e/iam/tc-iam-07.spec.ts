import { test, expect } from '../../fixtures';
import { createRegistrationData, type RegistrationData } from '../../../data/user-data';
import type { AccountPage } from '../../../pages/account.page';
import type { HomePage } from '../../../pages/home.page';
import type { LoginPage } from '../../../pages/login.page';
import { cleanupAccount, seedAccount } from '../../../helpers/account-api';

async function loginAs(
  homePage: HomePage,
  loginPage: LoginPage,
  accountPage: AccountPage,
  data: RegistrationData,
): Promise<void> {
  await homePage.open();
  await homePage.expectLoaded();
  await homePage.openLogin();
  await loginPage.expectLoginLoaded();
  await loginPage.login(data.email, data.password);
  await accountPage.expectLoggedInAs(data.name);
}

async function deleteThroughUi(accountPage: AccountPage): Promise<void> {
  await accountPage.deleteAccount();
  await accountPage.expectDeleted();
}

async function continueToGuestHome(
  accountPage: AccountPage,
  homePage: HomePage,
): Promise<void> {
  await accountPage.continueAfterDeletion();
  await homePage.expectLoaded();
  await accountPage.expectGuestState();
}

test.describe('TC-IAM-07 - Delete Account Via UI', () => {
  test('TC-IAM-07-01 deletes an account from the home page', async ({
    request,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await accountPage.expectLoggedInAs(data.name);
      await deleteThroughUi(accountPage);
      await continueToGuestHome(accountPage, homePage);
      await expect(homePage.signupLoginLink).toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-07-02 deletes an account from a secondary page', async ({
    request,
    homePage,
    loginPage,
    productsPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await productsPage.open();
      await productsPage.expectLoaded();
      await productsPage.expectLoggedInAs(data.name);
      await deleteThroughUi(accountPage);
      await continueToGuestHome(accountPage, homePage);
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-07-03 rejects login with credentials after UI account deletion', async ({
    request,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await deleteThroughUi(accountPage);
      await continueToGuestHome(accountPage, homePage);
      await homePage.openLogin();
      await loginPage.expectLoginLoaded();
      await loginPage.login(data.email, data.password);

      await expect(loginPage.loginError).toHaveText('Your email or password is incorrect!');
      await expect(accountPage.loggedInIndicator).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-07-04 verifies the deleted account is absent through the API', async ({
    request,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await deleteThroughUi(accountPage);

      const response = await request.post('/api/verifyLogin', {
        form: { email: data.email, password: data.password },
      });
      const body = await response.json();

      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(404);
      expect(body.message).toBe('User not found!');
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-07-05 allows the deleted email to be used for a new signup', async ({
    request,
    homePage,
    loginPage,
    accountPage,
    accountInformationPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await deleteThroughUi(accountPage);
      await continueToGuestHome(accountPage, homePage);
      await homePage.openLogin();
      await loginPage.expectLoaded();
      await loginPage.signUp(data.name, data.email);

      await accountInformationPage.expectLoaded();
      await expect(accountInformationPage.passwordInput).toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-07-06 returns to the guest home page after deletion', async ({
    request,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await loginAs(homePage, loginPage, accountPage, data);
      await deleteThroughUi(accountPage);
      await continueToGuestHome(accountPage, homePage);

      await expect(homePage.signupLoginLink).toBeVisible();
      await expect(accountPage.loggedInIndicator).not.toBeVisible();
      await expect(accountPage.logoutLink).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-07-07 does not restore authenticated controls after browser Back', async ({
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
      await deleteThroughUi(accountPage);
      await page.goBack();

      await accountPage.expectGuestState();
      await expect(accountPage.loggedInIndicator).not.toBeVisible();
      await expect(accountPage.logoutLink).not.toBeVisible();
      await expect(accountPage.deleteAccountLink).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });
});
