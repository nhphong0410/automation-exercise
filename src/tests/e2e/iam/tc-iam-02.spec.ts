import { test, expect } from '../../fixtures';
import { createRegistrationData } from '../../../data/user-data';
import { cleanupAccount, seedAccount } from '../../../helpers/account-api';

test.describe('TC-IAM-02 - Register User With Already-Registered Email Address', () => {
  test('TC-IAM-02-01 blocks signup when the email already exists', async ({
    request,
    page,
    homePage,
    loginPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);

    await seedAccount(request, data);

    try {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoaded();
      await loginPage.signUp(data.name, data.email);

      await loginPage.expectDuplicateEmailError();
      await expect(loginPage.signupNameInput).toHaveValue(data.name);
      await expect(loginPage.signupEmailInput).toHaveValue(data.email);
      await expect(loginPage.newUserSignupHeading).toBeVisible();
      await expect(page).toHaveURL(/\/signup$/);
      await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-02-02 blocks signup when the email already exists with an alternate name', async ({
    request,
    page,
    homePage,
    loginPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    const alternateName = `Different Alternate User ${Date.now()}`;

    await seedAccount(request, data);

    try {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoaded();
      await loginPage.signUp(alternateName, data.email);

      await loginPage.expectDuplicateEmailError();
      await expect(loginPage.signupNameInput).toHaveValue(alternateName);
      await expect(loginPage.signupEmailInput).toHaveValue(data.email);
      await expect(loginPage.newUserSignupHeading).toBeVisible();
      await expect(page).toHaveURL(/\/signup$/);
      await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-02-03 recovers from duplicate email rejection by using a fresh unique email', async ({
    request,
    page,
    homePage,
    loginPage,
    accountInformationPage,
  }, testInfo) => {
    const seededData = createRegistrationData(testInfo.workerIndex);
    const recoveryEmail = `recovery_${Date.now()}_${testInfo.workerIndex}@qa.test`;
    const recoveryName = `Recovery User ${Date.now()}`;

    await seedAccount(request, seededData);

    try {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoaded();
      await loginPage.signUp(seededData.name, seededData.email);
      await loginPage.expectDuplicateEmailError();

      await loginPage.signupEmailInput.fill(recoveryEmail);
      await loginPage.signUp(recoveryName, recoveryEmail);

      await accountInformationPage.expectLoaded();
      await expect(page).toHaveURL(/\/signup$/);
      await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
      await expect(accountInformationPage.passwordInput).toBeVisible();
    } finally {
      await cleanupAccount(request, seededData);

      if (recoveryEmail) {
        await cleanupAccount(request, { email: recoveryEmail, password: 'Password@123' });
      }
    }
  });

  test('TC-IAM-02-04 reuses the same email after the original account is deleted', async ({
    request,
    page,
    homePage,
    loginPage,
    accountInformationPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);

    await seedAccount(request, data);

    try {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoaded();
      await loginPage.signUp(data.name, data.email);
      await loginPage.expectDuplicateEmailError();

      const deleteResponse = await request.delete('/api/deleteAccount', {
        form: {
          email: data.email,
          password: data.password,
        },
      });
      const deleteBody = await deleteResponse.json();

      expect(deleteResponse.status()).toBe(200);
      expect(deleteBody.responseCode).toBe(200);

      await loginPage.signupNameInput.fill(data.name);
      await loginPage.signupEmailInput.fill(data.email);
      await loginPage.signUp(data.name, data.email);

      await accountInformationPage.expectLoaded();
      await expect(page).toHaveURL(/\/signup$/);
      await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
      await expect(accountInformationPage.passwordInput).toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });
});
