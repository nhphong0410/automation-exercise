# TC-IAM-04-02 - Login With Valid Credentials Via Keyboard Enter Key

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-04-02 |
| Parent Condition | TC-IAM-04 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - keyboard submission partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a registered user can submit the login form by pressing the keyboard `Enter` key from within the `Password` input field without clicking the `Login` button, establish an authenticated session, observe the visible `"Logged in as <username>"` indicator, and delete the account cleanly during teardown.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with known credentials is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Enter Key User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `EnterKey`
- Address: `100 Keyboard Lane`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)
- Password: `Password@123` (exact match to seeded account)

Retain the generated email and password for API seeding, UI login, and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the test data payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the seeded email into the login `Email Address` field. Verify the field contains the email value.
5. Enter the seeded password into the login `Password` field. Verify the field contains the password value.
6. Press the keyboard `Enter` key while focused in the `Password` field (`locator.press('Enter')`) without clicking the `Login` button.
7. Verify the form submission is dispatched.
8. Verify the browser navigates to `/` (home page).
9. Verify the header navbar displays `Logged in as QA Enter Key User <timestamp>`.
10. Verify the header navbar displays the `Logout` link (`a[href="/logout"]`).
11. Verify the header navbar displays the `Delete Account` link (`a[href="/delete_account"]`).
12. Verify the unauthenticated link `Signup / Login` (`a[href="/login"]`) is not visible in the navbar.
13. Select `Delete Account`. Verify account deletion is submitted.
14. Verify `ACCOUNT DELETED!` is visible on the confirmation screen.

## Expected Result

The login form submits upon receiving the keyboard `Enter` event inside the password input. The user authenticates successfully, lands on the home page, sees `"Logged in as <username>"` in the navbar, and the account is deleted cleanly during teardown.

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
- Trigger form submission using `await loginPage.passwordInput.press('Enter')` to test native browser form submission behavior.
- Assert authenticated state using `li:has-text("Logged in as")` and verify absence of `a[href="/login"]`.
- Do not reuse authenticated storage state because this test explicitly exercises the login flow and mutates account data.

## Traceability

This case implements the keyboard submission equivalence partition for:

> TC-IAM-04 - Login with valid credentials and verify "Logged in as <username>"