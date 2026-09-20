import { test, expect } from '../../fixtures';
import { createRegistrationData } from '../../../data/user-data';

test.describe('TC-IAM-01 - Register New User With Valid Data', () => {
  test('TC-IAM-01-01 registers a new user with valid data', { tag: '@smoke' }, async ({
    request,
    homePage,
    loginPage,
    accountInformationPage,
    accountCreatedPage,
    accountPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);
    let accountCreated = false;
    let accountDeleted = false;
    let authenticated = false;

    try {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoaded();
      await loginPage.signUp(data.name, data.email);

      await accountInformationPage.expectLoaded();
      await accountInformationPage.completeRegistration(data);

      await accountCreatedPage.expectLoaded();
      accountCreated = true;
      await accountCreatedPage.continue();

      await accountPage.expectLoggedInAs(data.name);
      authenticated = true;
    } finally {
      if (authenticated) {
        try {
          await accountPage.deleteAccount();
          await accountPage.expectDeleted();
          accountDeleted = true;
        } catch {
          // Fall back to API cleanup when UI cleanup is unavailable.
        }
      }

      if (accountCreated && !accountDeleted) {
        const response = await request.delete('/api/deleteAccount', {
          form: {
            email: data.email,
            password: data.password,
          },
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.responseCode).toBe(200);
      }
    }
  });
});