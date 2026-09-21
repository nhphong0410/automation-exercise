# TC-IAM-04-04 - Login With Complex Password Containing Special Characters

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-04-04 |
| Parent Condition | TC-IAM-04 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - complex password partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a registered user with a complex password comprising uppercase letters, lowercase letters, digits, and varied special characters can authenticate successfully without character escaping, URL encoding, or truncation defects, establish an active session, observe the `"Logged in as <username>"` indicator, and delete the account cleanly during teardown.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with a complex password is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Complex Pass User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `C0mpl3x!_#P@ss$2026%^&*` (mixed case, numbers, and diverse ASCII symbols)
- Title: `Mr`
- First name: `QA`
- Last name: `Complex`
- Address: `100 Security Boulevard`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)
- Password: `C0mpl3x!_#P@ss$2026%^&*` (exact match to complex password)

Retain the generated email and password for API seeding, UI login, and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the complex password payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the seeded email into the login `Email Address` field. Verify the field contains the email value.
5. Enter the complex password into the login `Password` field. Verify the field contains the password string.
6. Select `Login`. Verify the form submission is dispatched.
7. Verify the browser navigates to `/` (home page).
8. Verify the header navbar displays `Logged in as QA Complex Pass User <timestamp>`.
9. Verify the header navbar displays the `Logout` link (`a[href="/logout"]`).
10. Verify the header navbar displays the `Delete Account` link (`a[href="/delete_account"]`).
11. Verify the unauthenticated link `Signup / Login` (`a[href="/login"]`) is not visible in the navbar.
12. Select `Delete Account`. Verify account deletion is submitted.
13. Verify `ACCOUNT DELETED!` is visible on the confirmation screen.

## Expected Result

The complex password string is transmitted, parsed, and verified accurately without symbol encoding or truncation issues. The user authenticates successfully, reaches the home page with `"Logged in as <username>"`, `Logout`, and `Delete Account` links visible, and the account is deleted cleanly during teardown.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block whenever the account is authenticated.
2. Verify `ACCOUNT DELETED!` after UI deletion.
3. If UI cleanup is unavailable or fails after account creation, call `DELETE /api/deleteAccount` with the generated email and complex password in an `afterEach` hook.
4. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
5. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountPage`.
- When seeding via `POST /api/createAccount` using Playwright's `request` context, ensure the form payload properly encodes reserved characters (e.g., `#`, `&`, `%`, `+`).
- Target login form inputs: `input[data-qa="login-email"]`, `input[data-qa="login-password"]`, and `button[data-qa="login-button"]`.
- Assert authenticated state using `li:has-text("Logged in as")` and verify absence of `a[href="/login"]`.
- Do not reuse authenticated storage state because this test explicitly exercises the login flow and mutates account data.

## Traceability

This case implements the complex password equivalence partition for:

> TC-IAM-04 - Login with valid credentials and verify "Logged in as <username>"