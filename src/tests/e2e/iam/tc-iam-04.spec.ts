import { test, expect } from '../../fixtures';
import { createRegistrationData } from '../../../data/user-data';
import { cleanupAccount, seedAccount } from '../../../helpers/account-api';

test.describe('TC-IAM-04 - Login With Valid Credentials', () => {
  test('TC-IAM-04-01 logs in successfully with valid credentials', async ({
    request,
    homePage,
    loginPage,
    accountPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    let authenticated = false;

    try {
      await seedAccount(request, data);

      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoginLoaded();
      await loginPage.login(data.email, data.password);

      await expect(page).toHaveURL(/\/$/);
      await accountPage.expectLoggedInAs(data.name);
      await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /delete account/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /signup \/ login/i })).not.toBeVisible();

      authenticated = true;
    } finally {
      if (authenticated) {
        try {
          await accountPage.deleteAccount();
          await expect(page.getByText(/ACCOUNT DELETED!/i)).toBeVisible();
        } catch {
          await cleanupAccount(request, data);
        }
      } else {
        await cleanupAccount(request, data);
      }
    }
  });

  test('TC-IAM-04-02 logs in successfully when submitting via Enter key', async ({
    request,
    homePage,
    loginPage,
    accountPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    let authenticated = false;

    try {
      await seedAccount(request, data);

      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoginLoaded();
      await loginPage.loginEmailInput.fill(data.email);
      await loginPage.loginPasswordInput.fill(data.password);
      await loginPage.loginPasswordInput.press('Enter');

      await expect(page).toHaveURL(/\/$/);
      await accountPage.expectLoggedInAs(data.name);
      authenticated = true;
    } finally {
      if (authenticated) {
        try {
          await accountPage.deleteAccount();
          await expect(page.getByText(/ACCOUNT DELETED!/i)).toBeVisible();
        } catch {
          await cleanupAccount(request, data);
        }
      } else {
        await cleanupAccount(request, data);
      }
    }
  });

  test('TC-IAM-04-03 rejects uppercase email casing and keeps the user on /login', async ({
    request,
    homePage,
    loginPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    const uppercaseEmail = data.email.toUpperCase();

    try {
      await seedAccount(request, data);

      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoginLoaded();
      await loginPage.loginEmailInput.fill(uppercaseEmail);
      await loginPage.loginPasswordInput.fill(data.password);
      await loginPage.loginButton.click();

      await expect(page).toHaveURL(/\/login$/);
      await expect(page.getByText(/Your email or password is incorrect!/i)).toBeVisible();
      await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
      await expect(page.getByRole('link', { name: /delete account/i })).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-04-04 logs in successfully with a complex password', async ({
    request,
    homePage,
    loginPage,
    accountPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    const complexPassword = 'C0mpl3x!_#P@ss$2026%^&*';
    const complexData = { ...data, password: complexPassword };
    let authenticated = false;

    try {
      await seedAccount(request, complexData);

      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoginLoaded();
      await loginPage.login(complexData.email, complexData.password);

      await expect(page).toHaveURL(/\/$/);
      await accountPage.expectLoggedInAs(complexData.name);
      authenticated = true;
    } finally {
      if (authenticated) {
        try {
          await accountPage.deleteAccount();
          await expect(page.getByText(/ACCOUNT DELETED!/i)).toBeVisible();
        } catch {
          await cleanupAccount(request, complexData);
        }
      } else {
        await cleanupAccount(request, complexData);
      }
    }
  });

  test('TC-IAM-04-05 logs in successfully when email includes surrounding whitespace', async ({
    request,
    homePage,
    loginPage,
    accountPage,
    page,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    const paddedEmail = `  ${data.email}  `;
    let authenticated = false;

    try {
      await seedAccount(request, data);

      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoginLoaded();
      await loginPage.loginEmailInput.fill(paddedEmail);
      await loginPage.loginPasswordInput.fill(data.password);
      await loginPage.loginButton.click();

      await expect(page).toHaveURL(/\/$/);
      await accountPage.expectLoggedInAs(data.name);
      authenticated = true;
    } finally {
      if (authenticated) {
        try {
          await accountPage.deleteAccount();
          await expect(page.getByText(/ACCOUNT DELETED!/i)).toBeVisible();
        } catch {
          await cleanupAccount(request, data);
        }
      } else {
        await cleanupAccount(request, data);
      }
    }
  });
});
