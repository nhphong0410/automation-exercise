# TC-IAM-02-05 - Duplicate Email Rejection Recovery Flow

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-02-05 |
| Parent Condition | TC-IAM-02 |
| Smoke Test | No |
| Design Technique | State Transition - duplicate rejection and recovery |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Negative to Positive (State Transition) |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when a user is blocked by submitting an already-registered email address and receives the `"Email Address already exist!"` error banner, they can immediately edit the email field to a fresh unique email without refreshing the page, re-submit, and successfully transition to Step 2 (`Enter Account Information`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with the target duplicate email address is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. A second, fresh unique email address is generated and available for recovery submission.
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate dedicated data sets using the current UTC timestamp and Playwright worker index in the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Colliding User <timestamp>`
- Email: `existing_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Standard profile fields (title, address, country, mobile, etc.)

Initial signup submission data:

- Name: `QA Colliding User <timestamp>`
- Email: `existing_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)

Recovery signup submission data:

- Email: `recovery_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (fresh unique email)

Retain all generated credentials for API seeding, form inputs, and automated cleanup.

## Test Steps And Expected Results

1. Seed the pre-existing user account via `POST /api/createAccount` with the duplicate email payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
4. Enter the name into the signup `Name` field. Verify the field contains the name value.
5. Enter the seeded existing email into the signup `Email Address` field. Verify the field contains the colliding email.
6. Select `Signup`. Verify the form submission is dispatched.
7. Verify the user remains on the signup/login page and is not redirected to `/signup`.
8. Verify the error message `Email Address already exist!` is visible inside the signup form.
9. Clear the signup `Email Address` field and enter the fresh recovery email (`recovery_<...>@qa.test`). Verify the field contains the recovery email.
10. Select `Signup`. Verify the form submission is dispatched.
11. Verify the application transitions successfully to Step 2 (`/signup`).
12. Verify the header `ENTER ACCOUNT INFORMATION` is visible.
13. Verify the pre-populated name and email fields on Step 2 reflect the name and recovery email entered in Step 1.

## Expected Result

The initial duplicate submission is rejected with `"Email Address already exist!"`. Updating the email input to a unique address without a page reload clears the blocked state, successfully advancing the user to Step 2 (`Enter Account Information`).

## Cleanup And Failure Handling

1. Execute an unconditional API teardown in a `finally` block or `afterEach` hook calling `DELETE /api/deleteAccount` for the pre-seeded existing email.
2. In the event that the test proceeds further and creates an account for the recovery email, call `DELETE /api/deleteAccount` for the recovery credentials as well.
3. Assert teardown responses return HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountInformationPage`.
- Seed the existing account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Use `locator.fill(recoveryEmail)` directly to overwrite the email input without requiring a manual page refresh.
- Target the duplicate email error banner using `.signup-form form p` or locator `p:has-text("Email Address already exist!")`.
- Note the literal SUT spelling `exist` without the trailing `s`.
- Do not reuse authenticated storage state because this test starts in an unauthenticated guest state.

## Traceability

This case implements the negative-to-positive state transition recovery test for:

> TC-IAM-02 - Register user with already-registered email address (Verify error banner)