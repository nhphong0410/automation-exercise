import { test, expect } from '../../fixtures';

const buildUtcStamp = () => {
  const now = new Date();
  const dateStamp = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    String(now.getUTCDate()).padStart(2, '0'),
  ].join('');
  const timeStamp = [
    String(now.getUTCHours()).padStart(2, '0'),
    String(now.getUTCMinutes()).padStart(2, '0'),
    String(now.getUTCSeconds()).padStart(2, '0'),
    String(now.getUTCMilliseconds()).padStart(3, '0'),
  ].join('');
  const epoch = Date.now();

  return { dateStamp, timeStamp, epoch };
};

type TcIam03CaseData =
  | { email: string; password: string }
  | { name: string }
  | { name: string; malformedEmail: string }
  | { name: string; missingDomainEmail: string; missingLocalPartEmail: string }
  | { name: string; email: string }
  | { name: string; email: string; password: string };

function buildTcIam03CaseData(workerIndex: number, caseId: 'TC-IAM-03-01'): { email: string; password: string };
function buildTcIam03CaseData(workerIndex: number, caseId: 'TC-IAM-03-02'): { name: string };
function buildTcIam03CaseData(workerIndex: number, caseId: 'TC-IAM-03-04'): { name: string; malformedEmail: string };
function buildTcIam03CaseData(workerIndex: number, caseId: 'TC-IAM-03-05'): { name: string; missingDomainEmail: string; missingLocalPartEmail: string };
function buildTcIam03CaseData(workerIndex: number, caseId: 'TC-IAM-03-06' | 'TC-IAM-03-07' | 'TC-IAM-03-08' | 'TC-IAM-03-09'): { name: string; email: string };
function buildTcIam03CaseData(workerIndex: number, caseId: 'TC-IAM-03-10'): { name: string; email: string; password: string };
function buildTcIam03CaseData(workerIndex: number, caseId: string): TcIam03CaseData {
  const { dateStamp, timeStamp, epoch } = buildUtcStamp();

  switch (caseId) {
    case 'TC-IAM-03-01':
      return {
        email: `valid_${dateStamp}_${timeStamp}_${workerIndex}@qa.test`,
        password: 'Password@123',
      };
    case 'TC-IAM-03-02':
      return {
        name: `QA User ${epoch}`,
      };
    case 'TC-IAM-03-04':
      return {
        name: `QA Syntax User ${workerIndex}_${epoch}`,
        malformedEmail: `plainaddress_${workerIndex}_${epoch}_qa.test`,
      };
    case 'TC-IAM-03-05':
      return {
        name: `QA Incomplete Syntax ${workerIndex}_${epoch}`,
        missingDomainEmail: `user_${workerIndex}_${epoch}@`,
        missingLocalPartEmail: '@qa.test',
      };
    case 'TC-IAM-03-06':
      return {
        name: `QA Blank Pass ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-07':
      return {
        name: `QA Blank Name ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-08':
      return {
        name: `QA Blank Address ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-09':
      return {
        name: `QA Blank Mobile ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-10':
      return {
        name: '   ',
        email: `user_${workerIndex}_${epoch}@qa.test`,
        password: 'Password@123',
      };
    default:
      throw new Error(`Unsupported IAM-03 case: ${caseId}`);
  }
}

test.describe('TC-IAM-03 - Sign Up Form Validation', () => {
  test('TC-IAM-03-01 rejects blank signup name with native validation', async ({
    page,
    homePage,
    loginPage,
    request,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-01');
    let unexpectedProgression = false;

    try {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoaded();
      await expect(loginPage.signupNameInput).toHaveValue('');
      await loginPage.signupEmailInput.fill(data.email);
      await expect(loginPage.signupEmailInput).toHaveValue(data.email);

      await loginPage.signupButton.click();

      await expect(page).toHaveURL(/\/login$/);

      const isInvalid = await loginPage.signupNameInput.evaluate(
        (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
      );
      expect(isInvalid).toBe(true);

      const validationMessage = await loginPage.signupNameInput.evaluate(
        (el: HTMLInputElement) => el.validationMessage,
      );
      expect(validationMessage.trim().length).toBeGreaterThan(0);

      await expect(page.getByRole('heading', { name: 'Enter Account Information' })).not.toBeVisible();
      await expect(page.getByRole('link', { name: /signup \/ login/i })).toBeVisible();
      await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
    } catch (error) {
      unexpectedProgression = true;
      throw error;
    } finally {
      if (unexpectedProgression) {
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
    }
  });

  test('TC-IAM-03-02 rejects blank signup email with native validation', async ({
    page,
    homePage,
    loginPage,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-02');

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await expect(loginPage.signupNameInput).toHaveValue('');
    await expect(loginPage.signupEmailInput).toHaveValue('');

    await loginPage.signupNameInput.fill(data.name);
    await expect(loginPage.signupNameInput).toHaveValue(data.name);

    await loginPage.signupButton.click();

    await expect(page).toHaveURL(/\/login$/);

    const isInvalid = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(isInvalid).toBe(true);

    const validationMessage = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage.trim().length).toBeGreaterThan(0);

    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: /signup \/ login/i })).toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-03 rejects empty signup name and email with native validation', async ({
    page,
    homePage,
    loginPage,
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await expect(loginPage.signupNameInput).toHaveValue('');
    await expect(loginPage.signupEmailInput).toHaveValue('');

    await loginPage.signupButton.click();

    await expect(page).toHaveURL(/\/login$/);

    const isNameMissing = await loginPage.signupNameInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    const isEmailMissing = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );

    expect(isNameMissing).toBe(true);
    expect(isEmailMissing).toBe(true);

    const firstInvalid = await page.evaluate(() => {
      const nameField = document.querySelector('[data-qa="signup-name"]') as HTMLInputElement | null;
      const emailField = document.querySelector('[data-qa="signup-email"]') as HTMLInputElement | null;
      if (!nameField || !emailField) {
        return null;
      }

      const activeElement = document.activeElement as HTMLElement | null;
      return activeElement === nameField ? 'name' : activeElement === emailField ? 'email' : 'none';
    });

    expect(firstInvalid).toBe('name');

    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: /signup \/ login/i })).toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-04 rejects malformed signup email missing the at sign', async ({
    page,
    homePage,
    loginPage,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-04');

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await loginPage.signupNameInput.fill(data.name);
    await loginPage.signupEmailInput.fill(data.malformedEmail);

    await expect(loginPage.signupNameInput).toHaveValue(data.name);
    await expect(loginPage.signupEmailInput).toHaveValue(data.malformedEmail);

    await loginPage.signupButton.click();

    await expect(page).toHaveURL(/\/login$/);

    const isTypeMismatch = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.typeMismatch,
    );
    expect(isTypeMismatch).toBe(true);

    const validationMessage = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage.trim().length).toBeGreaterThan(0);

    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: /signup \/ login/i })).toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-05 rejects incomplete signup email formats', async ({
    page,
    homePage,
    loginPage,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-05');

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await loginPage.signupNameInput.fill(data.name);
    await expect(loginPage.signupNameInput).toHaveValue(data.name);

    await loginPage.signupEmailInput.fill(data.missingDomainEmail);
    await expect(loginPage.signupEmailInput).toHaveValue(data.missingDomainEmail);

    await loginPage.signupButton.click();

    await expect(page).toHaveURL(/\/login$/);

    let isTypeMismatch = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.typeMismatch,
    );
    expect(isTypeMismatch).toBe(true);

    await loginPage.signupEmailInput.fill('');
    await loginPage.signupEmailInput.fill(data.missingLocalPartEmail);
    await expect(loginPage.signupEmailInput).toHaveValue(data.missingLocalPartEmail);

    await loginPage.signupButton.click();

    await expect(page).toHaveURL(/\/login$/);

    isTypeMismatch = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.typeMismatch,
    );
    expect(isTypeMismatch).toBe(true);

    const validationMessage = await loginPage.signupEmailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage.trim().length).toBeGreaterThan(0);

    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: /signup \/ login/i })).toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-06 rejects blank password on account information step', async ({
    page,
    homePage,
    loginPage,
    accountInformationPage,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-06');

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await loginPage.signUp(data.name, data.email);

    await accountInformationPage.expectLoaded();
    await accountInformationPage.mrTitleRadio.check();
    await accountInformationPage.firstNameInput.fill('QA');
    await accountInformationPage.lastNameInput.fill('User');
    await accountInformationPage.addressInput.fill('100 Test Street');
    await accountInformationPage.selectCountry('United States');
    await accountInformationPage.stateInput.fill('California');
    await accountInformationPage.cityInput.fill('San Francisco');
    await accountInformationPage.zipcodeInput.fill('94105');
    await accountInformationPage.mobileNumberInput.fill(`${Date.now()}`.slice(-10));

    await accountInformationPage.createAccountButton.click();

    await expect(page).toHaveURL(/\/signup$/);

    const isInvalid = await accountInformationPage.passwordInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(isInvalid).toBe(true);

    const validationMessage = await accountInformationPage.passwordInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage.trim().length).toBeGreaterThan(0);

    await expect(page.getByRole('heading', { name: 'ACCOUNT CREATED!' })).not.toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-07 rejects blank first and last names on account information step', async ({
    page,
    homePage,
    loginPage,
    accountInformationPage,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-07');

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await loginPage.signUp(data.name, data.email);
    await accountInformationPage.expectLoaded();

    await accountInformationPage.passwordInput.fill('Password@123');
    await accountInformationPage.addressInput.fill('100 Test Street');
    await accountInformationPage.selectCountry('United States');
    await accountInformationPage.stateInput.fill('California');
    await accountInformationPage.cityInput.fill('San Francisco');
    await accountInformationPage.zipcodeInput.fill('94105');
    await accountInformationPage.mobileNumberInput.fill(`${Date.now()}`.slice(-10));

    await accountInformationPage.createAccountButton.click();
    await expect(page).toHaveURL(/\/signup$/);

    const firstNameInvalid = await accountInformationPage.firstNameInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(firstNameInvalid).toBe(true);

    await accountInformationPage.firstNameInput.fill('QA');
    await accountInformationPage.lastNameInput.fill('');
    await accountInformationPage.createAccountButton.click();
    await expect(page).toHaveURL(/\/signup$/);

    const lastNameInvalid = await accountInformationPage.lastNameInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(lastNameInvalid).toBe(true);

    await expect(page.getByRole('heading', { name: 'ACCOUNT CREATED!' })).not.toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-08 rejects blank address-related required fields on account information step', async ({
    page,
    homePage,
    loginPage,
    accountInformationPage,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-08');

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await loginPage.signUp(data.name, data.email);
    await accountInformationPage.expectLoaded();

    await accountInformationPage.mrTitleRadio.check();
    await accountInformationPage.passwordInput.fill('Password@123');
    await accountInformationPage.firstNameInput.fill('QA');
    await accountInformationPage.lastNameInput.fill('User');
    await accountInformationPage.selectCountry('United States');
    await accountInformationPage.mobileNumberInput.fill(`${Date.now()}`.slice(-10));

    const fieldChecks = [
      { field: accountInformationPage.addressInput, value: '' },
      { field: accountInformationPage.stateInput, value: 'California' },
      { field: accountInformationPage.cityInput, value: 'San Francisco' },
      { field: accountInformationPage.zipcodeInput, value: '94105' },
    ] as const;

    for (const [index, check] of fieldChecks.entries()) {
      if (check.value) {
        await check.field.fill(check.value);
      } else {
        await check.field.fill('');
      }

      if (index === 0) {
        await accountInformationPage.createAccountButton.click();
        await expect(page).toHaveURL(/\/signup$/);
        const isAddressInvalid = await accountInformationPage.addressInput.evaluate(
          (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
        );
        expect(isAddressInvalid).toBe(true);
        await accountInformationPage.addressInput.fill('100 Test Street');
      }
    }

    await accountInformationPage.stateInput.fill('');
    await accountInformationPage.createAccountButton.click();
    await expect(page).toHaveURL(/\/signup$/);
    const isStateInvalid = await accountInformationPage.stateInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(isStateInvalid).toBe(true);

    await accountInformationPage.stateInput.fill('California');
    await accountInformationPage.cityInput.fill('');
    await accountInformationPage.createAccountButton.click();
    await expect(page).toHaveURL(/\/signup$/);
    const isCityInvalid = await accountInformationPage.cityInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(isCityInvalid).toBe(true);

    await accountInformationPage.cityInput.fill('San Francisco');
    await accountInformationPage.zipcodeInput.fill('');
    await accountInformationPage.createAccountButton.click();
    await expect(page).toHaveURL(/\/signup$/);
    const isZipcodeInvalid = await accountInformationPage.zipcodeInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(isZipcodeInvalid).toBe(true);

    await expect(page.getByRole('heading', { name: 'ACCOUNT CREATED!' })).not.toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-09 rejects blank mobile number on account information step', async ({
    page,
    homePage,
    loginPage,
    accountInformationPage,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-09');

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openLogin();

    await loginPage.expectLoaded();
    await loginPage.signUp(data.name, data.email);
    await accountInformationPage.expectLoaded();

    await accountInformationPage.mrTitleRadio.check();
    await accountInformationPage.passwordInput.fill('Password@123');
    await accountInformationPage.firstNameInput.fill('QA');
    await accountInformationPage.lastNameInput.fill('User');
    await accountInformationPage.addressInput.fill('100 Test Street');
    await accountInformationPage.selectCountry('United States');
    await accountInformationPage.stateInput.fill('California');
    await accountInformationPage.cityInput.fill('San Francisco');
    await accountInformationPage.zipcodeInput.fill('94105');

    await accountInformationPage.createAccountButton.click();
    await expect(page).toHaveURL(/\/signup$/);

    const isInvalid = await accountInformationPage.mobileNumberInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing,
    );
    expect(isInvalid).toBe(true);

    const validationMessage = await accountInformationPage.mobileNumberInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage.trim().length).toBeGreaterThan(0);

    await expect(page.getByRole('heading', { name: 'ACCOUNT CREATED!' })).not.toBeVisible();
    await expect(page.getByText(/Logged in as /i)).not.toBeVisible();
  });

  test('TC-IAM-03-10 rejects whitespace-only mandatory values without server errors', async ({
    page,
    homePage,
    loginPage,
    accountInformationPage,
    accountCreatedPage,
    request,
  }, testInfo) => {
    const data = buildTcIam03CaseData(testInfo.workerIndex, 'TC-IAM-03-10');
    const badResponses: number[] = [];
    let accountCreated = false;

    page.on('response', (response) => {
      if (response.status() >= 500) {
        badResponses.push(response.status());
      }
    });

    try {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openLogin();

      await loginPage.expectLoaded();
      await loginPage.signupNameInput.fill(data.name);
      await loginPage.signupEmailInput.fill(data.email);
      await loginPage.signupButton.click();

      const currentUrl = page.url();
      if (/\/signup$/.test(currentUrl)) {
        await accountInformationPage.expectLoaded();
        await accountInformationPage.mrTitleRadio.check();
        await accountInformationPage.passwordInput.fill(data.password);
        await accountInformationPage.firstNameInput.fill('   ');
        await accountInformationPage.lastNameInput.fill('User');
        await accountInformationPage.addressInput.fill('   ');
        await accountInformationPage.selectCountry('United States');
        await accountInformationPage.stateInput.fill('California');
        await accountInformationPage.cityInput.fill('San Francisco');
        await accountInformationPage.zipcodeInput.fill('94105');
        await accountInformationPage.mobileNumberInput.fill(`${Date.now()}`.slice(-10));
        await accountInformationPage.createAccountButton.click();

        const finalUrl = page.url();
        if (/\/account_created$/.test(finalUrl)) {
          accountCreated = true;
          await accountCreatedPage.expectLoaded();
          await expect(page.getByText(/^Logged in as\s*$/i)).not.toBeVisible();
          await accountCreatedPage.continue();
        }

        expect(page.url()).not.toContain('500');
      } else {
        await expect(page).toHaveURL(/\/login$/);
      }

      expect(badResponses).toEqual([]);
      await expect(page.getByText(/^Logged in as\s+/i)).not.toBeVisible();
    } finally {
      if (accountCreated) {
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
    }
  });
});
