import { expect, type APIRequestContext } from '@playwright/test';
import type { RegistrationData } from '../data/user-data';
import type { AccountPage } from '../pages/account.page';
import type { HomePage } from '../pages/home.page';
import { cleanupAccount } from './account-api';

export async function cleanupCreatedAccount({
  request,
  accountPage,
  data,
  accountCreated,
  accountDeleted,
  authenticated,
}: {
  request: APIRequestContext;
  accountPage?: Pick<AccountPage, 'deleteAccount' | 'expectDeleted'>;
  data: Pick<RegistrationData, 'email' | 'password'>;
  accountCreated: boolean;
  accountDeleted: boolean;
  authenticated: boolean;
}): Promise<boolean> {
  if (accountDeleted) {
    return true;
  }

  if (authenticated && accountPage) {
    try {
      await accountPage.deleteAccount();
      await accountPage.expectDeleted();
      return true;
    } catch {
      // Fall back to API cleanup when UI cleanup is unavailable.
    }
  }

  if (accountCreated) {
    await cleanupAccount(request, data);
  }

  return false;
}

export async function deleteThroughUi(accountPage: AccountPage): Promise<void> {
  await accountPage.deleteAccount();
  await accountPage.expectDeleted();
}

export async function continueToGuestHome(
  accountPage: AccountPage,
  homePage: HomePage,
): Promise<void> {
  await accountPage.continueAfterDeletion();
  await homePage.expectLoaded();
  await accountPage.expectGuestState();
}
