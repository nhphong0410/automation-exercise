# TC-IAM-06-04 - Direct Access to Protected Delete Route Post-Logout

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-06-04 |
| Parent Condition | TC-IAM-06 |
| Smoke Test | No |
| Design Technique | Security / Access Control |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Security |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that direct URL navigation to the protected `/delete_account` route after logging out is denied, preventing unauthorized account deletion attempts.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA AuthSec User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Select `Logout` from the navbar.
4. Verify the browser is on `https://automationexercise.com/login`.
5. Attempt to navigate directly to `https://automationexercise.com/delete_account` using `page.goto()`.
6. Verify the user is **not** allowed to access the delete account page (expected behavior: redirect to `/login` or display an error/access denied message).

## Expected Result

Direct navigation to restricted routes is rejected by the application server post-logout.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `page.goto('/delete_account')`.
- Assert that the URL does not remain at `/delete_account` or that the page content does not contain "ACCOUNT DELETED!".

## Traceability

This case implements the direct access security test for:

> TC-IAM-06 - Logout Flow And Restricted-Page Access Verification
