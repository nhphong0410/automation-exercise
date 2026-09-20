import { expect, type Page } from '@playwright/test';
import type { RegistrationData } from '../data/user-data';

export class AccountInformationPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
  }

  async completeRegistration(data: RegistrationData): Promise<void> {
    await this.page.locator('#id_gender1').check();
    await this.page.locator('[data-qa="password"]').fill(data.password);
    await this.page.locator('[data-qa="days"]').selectOption('15');
    await this.page.locator('[data-qa="months"]').selectOption({ label: 'January' });
    await this.page.locator('[data-qa="years"]').selectOption('1990');
    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();
    await this.page.locator('[data-qa="first_name"]').fill(data.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(data.lastName);
    await this.page.locator('[data-qa="company"]').fill(data.company);
    await this.page.locator('[data-qa="address"]').fill(data.address);
    await this.page.locator('[data-qa="address2"]').fill(data.address2);
    await this.page.locator('[data-qa="country"]').selectOption({ label: data.country });
    await this.page.locator('[data-qa="state"]').fill(data.state);
    await this.page.locator('[data-qa="city"]').fill(data.city);
    await this.page.locator('[data-qa="zipcode"]').fill(data.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(data.mobileNumber);
    await this.page.locator('[data-qa="create-account"]').click();
  }
}
