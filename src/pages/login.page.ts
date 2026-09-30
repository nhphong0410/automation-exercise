import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly loginHeading: Locator;
  readonly newUserSignupHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly duplicateEmailError: Locator;

  constructor(private readonly page: Page) {
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.newUserSignupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginError = page.locator('.login-form form p');
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

  async expectLoginLoaded(): Promise<void> {
    await expect(this.loginHeading).toBeVisible();
  }

  async expectLoginError(): Promise<void> {
    await expect(this.loginError).toHaveText('Your email or password is incorrect!');
  }

  async expectDuplicateEmailError(): Promise<void> {
    await expect(this.duplicateEmailError).toBeVisible();
    await expect(this.duplicateEmailError).toHaveText(/Email Address already exist!/i);
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signUp(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
