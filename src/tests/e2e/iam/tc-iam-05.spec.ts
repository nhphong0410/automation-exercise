import { test, expect } from '../../fixtures';
import type { APIRequestContext, Page } from '@playwright/test';
import { createRegistrationData, type RegistrationData } from '../../../data/user-data';

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
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect([200, 404]).toContain(body.responseCode);
}

async function openLogin(homePage: { open: () => Promise<void>; expectLoaded: () => Promise<void>; openLogin: () => Promise<void> }, loginPage: { expectLoginLoaded: () => Promise<void> }): Promise<void> {
  await homePage.open();
  await homePage.expectLoaded();
  await homePage.openLogin();
  await loginPage.expectLoginLoaded();
}

function trackLoginSubmissions(page: Page): string[] {
  const submissions: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (request.method() === 'POST' && /\/(login|verifyLogin)$/i.test(url.pathname)) {
      submissions.push(request.url());
    }
  });
  return submissions;
}

test.describe('TC-IAM-05 - Login With Incorrect Email Or Password', () => {
  test('TC-IAM-05-01 rejects a registered email with an incorrect password', async ({
    request,
    page,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);

    try {
      await openLogin(homePage, loginPage);
      await loginPage.login(data.email, 'WrongPassword@999');

      await expect(page).toHaveURL(/\/login$/);
      await loginPage.expectLoginError();
      await expect(homePage.signupLoginLink).toBeVisible();
      await expect(accountPage.loggedInIndicator).not.toBeVisible();
      await expect(accountPage.deleteAccountLink).not.toBeVisible();
      await expect(page.getByRole('link', { name: /logout/i })).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-05-02 rejects an unregistered email address', async ({
    page,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const email = `nonexistent_${Date.now()}_${testInfo.workerIndex}@qa.test`;

    await openLogin(homePage, loginPage);
    await loginPage.login(email, 'ArbitraryPassword@123');

    await expect(page).toHaveURL(/\/login$/);
    await loginPage.expectLoginError();
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(accountPage.loggedInIndicator).not.toBeVisible();
    await expect(accountPage.deleteAccountLink).not.toBeVisible();
    await expect(page.getByRole('link', { name: /logout/i })).not.toBeVisible();
  });

  test('TC-IAM-05-03 blocks login when the email field is blank', async ({
    page,
    homePage,
    loginPage,
    accountPage,
  }) => {
    const submissions = trackLoginSubmissions(page);

    await openLogin(homePage, loginPage);
    await loginPage.loginPasswordInput.fill('Password@123');
    await loginPage.loginButton.click();

    const emailState = await loginPage.loginEmailInput.evaluate((element: HTMLInputElement) => ({
      invalid: !element.checkValidity() && element.validity.valueMissing,
      hasMessage: element.validationMessage.trim().length > 0,
      focused: document.activeElement === element,
    }));

    expect(emailState.invalid).toBe(true);
    expect(emailState.hasMessage).toBe(true);
    expect(emailState.focused).toBe(true);
    expect(submissions).toEqual([]);
    await expect(page).toHaveURL(/\/login$/);
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(accountPage.loggedInIndicator).not.toBeVisible();
  });

  test('TC-IAM-05-04 blocks login when the password field is blank', async ({
    request,
    page,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);
    const submissions = trackLoginSubmissions(page);

    try {
      await openLogin(homePage, loginPage);
      await loginPage.loginEmailInput.fill(data.email);
      await loginPage.loginButton.click();

      const passwordState = await loginPage.loginPasswordInput.evaluate((element: HTMLInputElement) => ({
        invalid: !element.checkValidity() && element.validity.valueMissing,
        hasMessage: element.validationMessage.trim().length > 0,
        focused: document.activeElement === element,
      }));

      expect(passwordState.invalid).toBe(true);
      expect(passwordState.hasMessage).toBe(true);
      expect(passwordState.focused).toBe(true);
      expect(submissions).toEqual([]);
      await expect(page).toHaveURL(/\/login$/);
      await expect(homePage.signupLoginLink).toBeVisible();
      await expect(accountPage.loggedInIndicator).not.toBeVisible();
    } finally {
      await cleanupAccount(request, data);
    }
  });

  test('TC-IAM-05-05 blocks login when both credential fields are blank', async ({
    page,
    homePage,
    loginPage,
    accountPage,
  }) => {
    const submissions = trackLoginSubmissions(page);

    await openLogin(homePage, loginPage);
    await loginPage.loginButton.click();

    const fieldStates = await Promise.all([
      loginPage.loginEmailInput.evaluate((element: HTMLInputElement) => ({
        invalid: !element.checkValidity() && element.validity.valueMissing,
        focused: document.activeElement === element,
      })),
      loginPage.loginPasswordInput.evaluate((element: HTMLInputElement) =>
        !element.checkValidity() && element.validity.valueMissing,
      ),
    ]);

    expect(fieldStates[0].invalid).toBe(true);
    expect(fieldStates[1]).toBe(true);
    expect(fieldStates[0].focused).toBe(true);
    expect(submissions).toEqual([]);
    await expect(page).toHaveURL(/\/login$/);
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(accountPage.loggedInIndicator).not.toBeVisible();
  });

  test('TC-IAM-05-06 blocks malformed email formats with native validation', async ({
    page,
    homePage,
    loginPage,
    accountPage,
  }) => {
    const submissions = trackLoginSubmissions(page);
    const malformedEmails = ['plainaddress_qa.test', 'user_qa@'];

    await openLogin(homePage, loginPage);

    for (const email of malformedEmails) {
      await loginPage.loginEmailInput.fill(email);
      await loginPage.loginPasswordInput.fill('Password@123');
      await loginPage.loginButton.click();

      const emailState = await loginPage.loginEmailInput.evaluate((element: HTMLInputElement) => ({
        invalid: !element.checkValidity() && element.validity.typeMismatch,
        hasMessage: element.validationMessage.trim().length > 0,
        focused: document.activeElement === element,
      }));

      expect(emailState.invalid).toBe(true);
      expect(emailState.hasMessage).toBe(true);
      expect(emailState.focused).toBe(true);
      await expect(page).toHaveURL(/\/login$/);
    }

    expect(submissions).toEqual([]);
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(accountPage.loggedInIndicator).not.toBeVisible();
  });

  test('TC-IAM-05-07 recovers from a rejected login after correcting the password', async ({
    request,
    page,
    homePage,
    loginPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    await seedAccount(request, data);
    let authenticated = false;

    try {
      await openLogin(homePage, loginPage);
      await loginPage.login(data.email, 'WrongPassword@999');

      await expect(page).toHaveURL(/\/login$/);
      await loginPage.expectLoginError();
      await expect(accountPage.loggedInIndicator).not.toBeVisible();

      await loginPage.loginPasswordInput.fill(data.password);
      await loginPage.loginButton.click();

      await expect(page).toHaveURL(/\/$/);
      await accountPage.expectLoggedInAs(data.name);
      await expect(loginPage.loginError).not.toBeVisible();
      authenticated = true;
    } finally {
      await cleanupAccount(request, data);
      if (authenticated) {
        await expect(accountPage.loggedInIndicator).not.toBeVisible();
      }
    }
  });
});
