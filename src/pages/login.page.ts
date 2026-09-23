import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly newUserSignupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly duplicateEmailError: Locator;

  constructor(private readonly page: Page) {
    this.newUserSignupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.duplicateEmailError = page.locator('.signup-form form p').filter({ hasText: 'Email Address already exist!' });
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async expectDuplicateEmailError(): Promise<void> {
    await expect(this.duplicateEmailError).toBeVisible();
    await expect(this.duplicateEmailError).toHaveText(/Email Address already exist!/i);
  }

  async signUp(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
