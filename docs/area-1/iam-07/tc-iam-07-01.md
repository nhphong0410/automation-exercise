# TC-IAM-07-01 - Baseline Account Deletion

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-07-01 |
| Parent Condition | TC-IAM-07 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P0 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that an authenticated user can successfully trigger account deletion from the Home page navbar, reach the account deletion confirmation screen, and transition back to the unauthenticated Home page.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA Delete User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Verify the header displays `Logged in as QA Delete User <timestamp>`.
4. Select `Delete Account` from the navbar (`a[href="/delete_account"]`).
5. Verify the browser displays the `ACCOUNT DELETED!` confirmation screen (`h2[data-qa="account-deleted"]`).
6. Select the `Continue` button (`a[data-qa="continue-button"]`).
7. Verify the browser is redirected to the home page (`/`).
8. Verify the header navbar displays `Signup / Login` (`a[href="/login"]`).

## Expected Result

The user account is successfully deleted through the UI, and the application confirms the state transition to an unauthenticated, logged-out Home page.

## Cleanup And Failure Handling

1. Since successful execution deletes the account, an `afterEach` hook calling `DELETE /api/deleteAccount` will receive a `404` (Account not found).
2. The teardown handler must safely accept both `200` (if UI deletion failed) and `404` (if UI deletion succeeded) without throwing errors.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `AccountPage` to trigger deletion and `AccountDeletedPage` (if applicable) or verify locators on the confirmation page.
- Handle potential Google vignette ad overlays when clicking `Continue`.

## Traceability

This case implements the baseline account deletion test for:

> TC-IAM-07 - Delete Account Via UI
