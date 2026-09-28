# TC-IAM-04-03 - Login With Registered Email In Varied Casing

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-04-03 |
| Parent Condition | TC-IAM-04 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - case-insensitive email partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a registered user whose lowercase email is submitted in uppercase form is rejected by the live login flow, remains unauthenticated on `/login`, shows the standard credential error banner, and does not create an active session.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with a lowercase email address is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API with lowercase email):

- Name: `QA Case User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `Case`
- Address: `100 Case Sensitivity Rd`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Login submission data:

- Email: `USER_<YYYYMMDD_HHMMSS_SSS>_<WORKERINDEX>@QA.TEST` (exact seeded email string converted to uppercase)
- Password: `Password@123` (exact match to seeded password)

Retain the generated lowercase email and password for API seeding, UI login, and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the lowercase email payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the uppercase transformed email (`USER_<...>@QA.TEST`) into the login `Email Address` field. Verify the field contains the uppercase string.
5. Enter the seeded password into the login `Password` field. Verify the field contains the password value.
6. Select `Login`. Verify the form submission is dispatched.
7. Verify the browser remains on `/login` instead of navigating to `/`.
8. Verify the login form shows the error banner `Your email or password is incorrect!`.
9. Verify the navbar does not show `Logged in as <username>`, `Logout`, or `Delete Account`.
10. Verify the account remains unauthenticated and no session is created.
11. Clean up the seeded account with `DELETE /api/deleteAccount` using the original lowercase email and password.

## Expected Result

The application treats the uppercase email variant as a credential mismatch. The login attempt is rejected, the user remains on `/login`, the error banner `Your email or password is incorrect!` is visible, and no authenticated session is established.

## Cleanup And Failure Handling

1. Seed the lowercase email account before the login attempt.
2. If the UI login attempt fails as expected, call `DELETE /api/deleteAccount` with the seeded lowercase email and password in a `finally` block.
3. Assert the cleanup response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountPage`.
- Seed the account using Playwright's `request` API context via `POST /api/createAccount` using the standard lowercase email format before driving the UI.
- Transform the email using `email.toUpperCase()` when calling the login email field.
- Assert that the page remains on `/login` and that `.login-form form p` or a `p:has-text("Your email or password is incorrect!")` locator is visible.
- Verify `Logged in as` is absent and no authenticated navigation elements appear.
- Do not reuse authenticated storage state because this test explicitly exercises the login flow and verifies failed auth behavior.

## Traceability

This case implements the live SUT behavior for the uppercase-email negative variation of:

> TC-IAM-04 - Login with valid credentials and verify "Logged in as <username>"