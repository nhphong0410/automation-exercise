# TC-IAM-07-07 - Browser Back Navigation Post-Deletion

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-07-07 |
| Parent Condition | TC-IAM-07 |
| Smoke Test | No |
| Design Technique | Security / State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Security |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that clicking the browser "Back" button after reaching the "ACCOUNT DELETED!" confirmation screen does not restore an authenticated session or permit access to protected account actions.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA BackNavDelete User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Select `Delete Account` from the navbar.
4. Verify the `ACCOUNT DELETED!` screen is displayed.
5. Click the browser's "Back" button (`page.goBack()`).
6. Verify the browser does **not** display the previous authenticated page or cached authenticated content.
7. Verify the header navbar displays `Signup / Login` (`a[href="/login"]`) and does not display `Logout` or `Logged in as ...`.

## Expected Result

The authenticated session is terminated by the deletion flow, and browser-cached pages do not bypass access control checks upon "Back" navigation.

## Cleanup And Failure Handling

1. An `afterEach` hook calling `DELETE /api/deleteAccount` should receive a `404` (Account not found).
2. The teardown handler must safely accept both `200` (if UI deletion failed) and `404` (if UI deletion succeeded) without throwing errors.
3. Close the isolated browser context after the test.

## Automation Notes

- Use `page.goBack()` to navigate back.
- Assert that the header still shows the "Signup / Login" link and that the URL corresponds to the home page or an unauthenticated state, not the previously authenticated dashboard.

## Traceability

This case implements the post-deletion back-navigation test for:

> TC-IAM-07 - Delete Account Via UI
