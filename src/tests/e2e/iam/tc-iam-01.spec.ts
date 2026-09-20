import { test, expect } from '../../fixtures';
import { createRegistrationData } from '../../../data/user-data';
import registrationTestData from '../../../data/tc-iam-01.json';
import type { DateOfBirth } from '../../../pages/account-information.page';

const calendarBoundaryDates: Array<{
  suffix: string;
  dateOfBirth: DateOfBirth;
}> = registrationTestData.calendarBoundaryDates;
const pairwiseRegistrationRows = registrationTestData.pairwiseRegistrationRows;

test.describe('TC-IAM-01 - Register New User With Valid Data', () => {
  test(
    'TC-IAM-01-01 registers a new user with valid data',
    { tag: '@smoke' },
    async (
      {
        request,
        homePage,
        loginPage,
        accountInformationPage,
        accountCreatedPage,
        accountPage,
      },
      testInfo,
    ) => {
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
    },
  );

  test('TC-IAM-01-02 registers a new user with the alternate Mrs title', async ({
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
      await accountInformationPage.completeRegistration(data, 'Mrs');

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

  test('TC-IAM-01-03 registers a new user with a valid alternate country', async ({
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
      await accountInformationPage.selectCountry('United States');
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

  test('TC-IAM-01-04 registers a new user without optional subscriptions', async ({
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
      await accountInformationPage.completeRegistration(data, 'Mr', false);

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

  test('TC-IAM-01-05 registers a new user with newsletter only', async ({
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
      await accountInformationPage.completeRegistration(data, 'Mr', {
        newsletter: true,
        specialOffers: false,
      });

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

  test('TC-IAM-01-06 registers a new user with special offers only', async ({
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
      await accountInformationPage.completeRegistration(data, 'Mr', {
        newsletter: false,
        specialOffers: true,
      });

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

  test('TC-IAM-01-07 registers a new user with the earliest valid date of birth', async ({
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
      const dateOfBirth =
        await accountInformationPage.selectEarliestDateOfBirth();
      console.log(
        `TC-IAM-01-07 discovered earliest date of birth: ${dateOfBirth.day} ${dateOfBirth.month} ${dateOfBirth.year}`,
      );
      await accountInformationPage.completeRegistration(
        data,
        'Mr',
        true,
        dateOfBirth,
      );

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

  test('TC-IAM-01-08 registers a new user with the latest valid date of birth', async ({
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
      const dateOfBirth =
        await accountInformationPage.selectLatestDateOfBirth();
      console.log(
        `TC-IAM-01-08 discovered latest date of birth: ${dateOfBirth.day} ${dateOfBirth.month} ${dateOfBirth.year}`,
      );
      await accountInformationPage.completeRegistration(
        data,
        'Mr',
        true,
        dateOfBirth,
      );

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

  for (const { suffix, dateOfBirth } of calendarBoundaryDates) {
    test(`TC-IAM-01-09-${suffix} registers a new user with a calendar boundary date`, async ({
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
        await accountInformationPage.selectDateOfBirth(dateOfBirth);
        await accountInformationPage.completeRegistration(
          data,
          'Mr',
          true,
          dateOfBirth,
        );

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
  }

  test('TC-IAM-01-10 documents that mobile-number length is unrestricted', async ({
    homePage,
    loginPage,
    accountInformationPage,
  }, testInfo) => {
    const data = createRegistrationData(testInfo.workerIndex);

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await loginPage.signUp(data.name, data.email);

    await accountInformationPage.expectLoaded();
    const boundaries =
      await accountInformationPage.getMobileNumberLengthBoundaries();
    console.log(
      `TC-IAM-01-10 mobile-number length boundaries: ${JSON.stringify(boundaries)}`,
    );
    expect(boundaries).toEqual({});
  });

  test('TC-IAM-01-11 completes the registration state transition', async ({
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

      await accountPage.deleteAccount();
      await accountPage.expectDeleted();
      accountDeleted = true;
      await accountPage.expectNoAuthenticatedActions();
    } finally {
      if (authenticated && !accountDeleted) {
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

  for (const row of pairwiseRegistrationRows) {
    test(`TC-IAM-01-12 registers with ${row.name}`, async ({
      request,
      homePage,
      loginPage,
      accountInformationPage,
      accountCreatedPage,
      accountPage,
    }, testInfo) => {
      const data = createRegistrationData(testInfo.workerIndex);
      const registrationData =
        row.country === 'India'
          ? {
              ...data,
              country: 'India',
              state: 'Maharashtra',
              city: 'Mumbai',
              zipcode: '400001',
            }
          : data;
          const title = row.title === 'Mr' ? 'Mr' : 'Mrs';
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
        await accountInformationPage.completeRegistration(
          registrationData,
          title,
          {
            newsletter: row.newsletter,
            specialOffers: row.specialOffers,
          },
          row.dateOfBirth,
        );

        await accountCreatedPage.expectLoaded();
        accountCreated = true;
        await accountCreatedPage.continue();

        await accountPage.expectLoggedInAs(data.name);
        authenticated = true;
        await accountPage.deleteAccount();
        await accountPage.expectDeleted();
        accountDeleted = true;
      } finally {
        if (authenticated && !accountDeleted) {
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
  }
});
