import { test as base } from '@playwright/test';
import { AccountCreatedPage } from '../pages/account-created.page';
import { AccountInformationPage } from '../pages/account-information.page';
import { AccountPage } from '../pages/account.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

type PageFixtures = {
  accountCreatedPage: AccountCreatedPage;
  accountInformationPage: AccountInformationPage;
  accountPage: AccountPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

export const test = base.extend<PageFixtures>({
  context: async ({ context }, use) => {
    await context.route(
      /doubleclick\.net|googleadservices\.com|googlesyndication\.com/,
      (route) => route.abort(),
    );
    await use(context);
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  accountInformationPage: async ({ page }, use) => {
    await use(new AccountInformationPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect } from '@playwright/test';
