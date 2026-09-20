import { expect, type Locator, type Page } from '@playwright/test';
import type { RegistrationData } from '../data/user-data';

export type RegistrationTitle = 'Mr' | 'Mrs';
export type DateOfBirth = {
  day: string;
  month: string;
  year: string;
};
export type SubscriptionPreferences = {
  newsletter: boolean;
  specialOffers: boolean;
};

export class AccountInformationPage {
  readonly accountInformationHeading: Locator;
  readonly mrTitleRadio: Locator;
  readonly mrsTitleRadio: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(private readonly page: Page) {
    this.accountInformationHeading = page.getByRole('heading', { name: 'Enter Account Information' });
    this.mrTitleRadio = page.locator('#id_gender1');
    this.mrsTitleRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daySelect = page.locator('[data-qa="days"]');
    this.monthSelect = page.locator('[data-qa="months"]');
    this.yearSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.accountInformationHeading).toBeVisible();
  }

  async selectAlternateCountry(countries: string[]): Promise<string> {
    const availableCountries = await this.countrySelect.locator('option').evaluateAll((options) =>
      options.map((option) => option.textContent?.trim()).filter((country): country is string => Boolean(country)),
    );
    const country = countries.find((candidate) => availableCountries.includes(candidate));

    if (!country) {
      throw new Error(`No supported alternate country is available. Found: ${availableCountries.join(', ')}`);
    }

    await this.selectCountry(country);
    return country;
  }

  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption({ label: country });
    await expect(this.countrySelect.locator('option:checked')).toHaveText(country);
  }

  async getMobileNumberLengthBoundaries(): Promise<{ minimum?: number; maximum?: number }> {
    return this.mobileNumberInput.evaluate((input) => ({
      minimum: input.getAttribute('minlength') ? Number(input.getAttribute('minlength')) : undefined,
      maximum: input.getAttribute('maxlength') ? Number(input.getAttribute('maxlength')) : undefined,
    }));
  }

  async selectDateOfBirth(dateOfBirth: DateOfBirth): Promise<void> {
    await this.daySelect.selectOption(dateOfBirth.day);
    await this.monthSelect.selectOption({ label: dateOfBirth.month });
    await this.yearSelect.selectOption(dateOfBirth.year);
    await expect(this.daySelect).toHaveValue(dateOfBirth.day);
    await expect(this.monthSelect.locator('option:checked')).toHaveText(dateOfBirth.month);
    await expect(this.yearSelect).toHaveValue(dateOfBirth.year);
  }

  async selectEarliestDateOfBirth(): Promise<DateOfBirth> {
    const [days, months, years] = await Promise.all([
      this.daySelect.locator('option').evaluateAll((options) =>
        options
          .map((option) => (option as HTMLOptionElement).value)
          .filter((value) => /^\d+$/.test(value))
          .sort((first, second) => Number(first) - Number(second)),
      ),
      this.monthSelect.locator('option').evaluateAll((options) =>
        options
          .map((option) => {
            const optionElement = option as HTMLOptionElement;
            return { label: optionElement.textContent?.trim() ?? '', value: optionElement.value };
          })
          .filter(({ label, value }) => Boolean(label) && Boolean(value)),
      ),
      this.yearSelect.locator('option').evaluateAll((options) =>
        options
          .map((option) => (option as HTMLOptionElement).value)
          .filter((value) => /^\d+$/.test(value))
          .sort((first, second) => Number(first) - Number(second)),
      ),
    ]);
    const dateOfBirth = {
      day: days[0],
      month: months[0]?.label,
      year: years[0],
    };

    if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
      throw new Error('Unable to discover a valid date-of-birth boundary from the available controls.');
    }

    await this.selectDateOfBirth(dateOfBirth);

    return dateOfBirth;
  }

  async selectLatestDateOfBirth(): Promise<DateOfBirth> {
    const [days, months, years] = await Promise.all([
      this.daySelect.locator('option').evaluateAll((options) =>
        options
          .map((option) => (option as HTMLOptionElement).value)
          .filter((value) => /^\d+$/.test(value))
          .sort((first, second) => Number(second) - Number(first)),
      ),
      this.monthSelect.locator('option').evaluateAll((options) =>
        options
          .map((option) => {
            const optionElement = option as HTMLOptionElement;
            return { label: optionElement.textContent?.trim() ?? '', value: optionElement.value };
          })
          .filter(({ label, value }) => Boolean(label) && /^\d+$/.test(value))
          .sort((first, second) => Number(second.value) - Number(first.value)),
      ),
      this.yearSelect.locator('option').evaluateAll((options) =>
        options
          .map((option) => (option as HTMLOptionElement).value)
          .filter((value) => /^\d+$/.test(value))
          .sort((first, second) => Number(second) - Number(first)),
      ),
    ]);
    const dateOfBirth = {
      day: days[0],
      month: months[0]?.label,
      year: years[0],
    };

    if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
      throw new Error('Unable to discover a valid date-of-birth boundary from the available controls.');
    }

    await this.selectDateOfBirth(dateOfBirth);

    return dateOfBirth;
  }

  async completeRegistration(
    data: RegistrationData,
    title: RegistrationTitle = 'Mr',
    subscriptions: SubscriptionPreferences | boolean = true,
    dateOfBirth: DateOfBirth = { day: '15', month: 'January', year: '1990' },
  ): Promise<void> {
    const preferences: SubscriptionPreferences =
      typeof subscriptions === 'boolean'
        ? { newsletter: subscriptions, specialOffers: subscriptions }
        : subscriptions;
    const titleRadio = title === 'Mr' ? this.mrTitleRadio : this.mrsTitleRadio;
    await titleRadio.check();
    await expect(titleRadio).toBeChecked();
    await this.passwordInput.fill(data.password);
    await this.selectDateOfBirth(dateOfBirth);
    for (const [checkbox, selected] of [
      [this.newsletterCheckbox, preferences.newsletter],
      [this.specialOffersCheckbox, preferences.specialOffers],
    ] as const) {
      if (selected && !(await checkbox.isChecked())) {
        await checkbox.check();
      } else if (!selected && (await checkbox.isChecked())) {
        await checkbox.uncheck();
      }
      await expect(checkbox).toBeChecked({ checked: selected });
    }
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyInput.fill(data.company);
    await this.addressInput.fill(data.address);
    await this.address2Input.fill(data.address2);
    await this.selectCountry(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobileNumber);
    await this.createAccountButton.click();
  }
}
