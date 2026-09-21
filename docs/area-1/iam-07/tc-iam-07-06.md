# TC-IAM-07-06 - Post-Deletion Navigation Flow

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-07-06 |
| Parent Condition | TC-IAM-07 |
| Smoke Test | No |
| Design Technique | State Transition / Navigation |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that after clicking the `Continue` button on the `"ACCOUNT DELETED!"` screen, the user is correctly redirected to the Home page and the navbar displays unauthenticated state elements.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA NavTest User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Select `Delete Account` from the navbar.
4. Verify the `ACCOUNT DELETED!` screen is displayed.
5. Select the `Continue` button (`a[data-qa="continue-button"]`).
6. Verify the current URL is `https://automationexercise.com/`.
7. Verify the header navbar displays `Signup / Login` (`a[href="/login"]`) and does not display `Logout` or `Logged in as ...`.

## Expected Result

The navigation after account deletion is seamless, returning the user to a clean, unauthenticated state on the home page.

## Cleanup And Failure Handling

1. An `afterEach` hook calling `DELETE /api/deleteAccount` should receive a `404` (Account not found).
2. The teardown handler must safely accept both `200` (if UI deletion failed) and `404` (if UI deletion succeeded) without throwing errors.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Verify the base URL after clicking `Continue` to ensure the correct landing.

## Traceability

This case implements the post-deletion navigation test for:

> TC-IAM-07 - Delete Account Via UI
