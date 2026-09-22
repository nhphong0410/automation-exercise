# TC-IAM-05-08 - Authentication Recovery Flow After Rejected Login

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-05-08 |
| Parent Condition | TC-IAM-05 |
| Smoke Test | No |
| Design Technique | State Transition - authentication recovery flow |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / State Transition / Negative to Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when an initial login attempt is rejected due to invalid credentials and displays the `"Your email or password is incorrect!"` error banner, the user can immediately correct their credentials in-place without refreshing the page, re-submit, successfully authenticate, observe the `"Logged in as <username>"` indicator, and delete the account cleanly during teardown.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with known valid credentials is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Recover User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `Recover`
- Address: `100 Recovery Road`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Initial rejected login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)
- Password: `WrongPassword@999` (incorrect password string)

Recovery login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123` (corrected valid password)

Retain the generated email and valid password for API seeding, UI login, and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the valid credentials payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the seeded email into the login `Email Address` field. Verify the field contains the email value.
5. Enter the incorrect password (`WrongPassword@999`) into the login `Password` field. Verify the field contains the incorrect password.
6. Select `Login`. Verify the form submission is dispatched.
7. Verify the browser remains on `/login` and the error message `Your email or password is incorrect!` is visible inside the login form (`.login-form form p`).
8. Clear the `Password` field and enter the correct password (`Password@123`). Verify the field contains the corrected password value.
9. Select `Login`. Verify the second form submission is dispatched.
10. Verify the browser transitions successfully to `/` (home page).
11. Verify the error message `Your email or password is incorrect!` is no longer visible.
12. Verify the header navbar displays `Logged in as QA Recover User <timestamp>`.
13. Verify the header navbar displays the `Logout` link (`a[href="/logout"]`) and `Delete Account` link (`a[href="/delete_account"]`).
14. Select `Delete Account`. Verify account deletion is submitted.
15. Verify `ACCOUNT DELETED!` is visible on the confirmation screen.

## Expected Result

The initial authentication failure displays `"Your email or password is incorrect!"`. Correcting the password in-place without reloading the page successfully clears the rejected state, authenticates the user, navigates to the home page with `"Logged in as <username>"`, and the account is deleted cleanly during teardown.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block whenever the account is authenticated.
2. Verify `ACCOUNT DELETED!` after UI deletion.
3. If UI cleanup is unavailable or fails after account creation, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
4. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
5. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountPage`.
- Seed the account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Use `loginPage.passwordInput.fill(validPassword)` directly to overwrite the field without refreshing the page, testing seamless in-place state transition.
- Target the server-side error banner using `.login-form form p` or locator `p:has-text("Your email or password is incorrect!")`.
- Assert authenticated state using `li:has-text("Logged in as")` and verify absence of `a[href="/login"]`.
- Do not reuse authenticated storage state because this test explicitly exercises the login flow and mutates account data.

## Traceability

This case implements the negative-to-positive authentication recovery state transition test for:

> TC-IAM-05 - Login with incorrect email or password (Verify rejection message)