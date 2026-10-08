import type { BrowserContext } from '@playwright/test';
import type { RegistrationData } from '../data/user-data';
import type { AccountPage } from '../pages/account.page';
import type { HomePage } from '../pages/home.page';
import type { LoginPage } from '../pages/login.page';

export async function loginAs(
  homePage: HomePage,
  loginPage: LoginPage,
  accountPage: AccountPage,
  data: Pick<RegistrationData, 'name' | 'email' | 'password'>,
): Promise<void> {
  await homePage.open();
  await homePage.expectLoaded();
  await homePage.openLogin();
  await loginPage.expectLoginLoaded();
  await loginPage.login(data.email, data.password);
  await accountPage.expectLoggedInAs(data.name);
}

export async function openLoginPage(homePage: HomePage, loginPage: LoginPage): Promise<void> {
  await homePage.open();
  await homePage.expectLoaded();
  await homePage.openLogin();
  await loginPage.expectLoginLoaded();
}

export async function logoutAndExpectGuest(accountPage: AccountPage): Promise<void> {
  await accountPage.logout();
  await accountPage.expectLoggedOut();
}

export async function blockAdNetworks(context: BrowserContext): Promise<void> {
  await context.route(
    /doubleclick\.net|googleadservices\.com|googlesyndication\.com/,
    (route) => route.abort(),
  );
}
