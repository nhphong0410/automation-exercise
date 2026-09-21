# TC-IAM-05-01 - Login With Registered Email And Incorrect Password

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-05-01 |
| Parent Condition | TC-IAM-05 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - incorrect password partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting a registered email address with an incorrect password into the login form is rejected by the application, keeps the user on `/login`, displays the `"Your email or password is incorrect!"` error banner, prevents session establishment, and cleans up the pre-seeded account cleanly during teardown.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with known credentials is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Invalid Pass User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `InvalidPass`
- Address: `100 Security Gate`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)
- Password: `WrongPassword@999` (incorrect password string)

Retain the generated email and valid password for API seeding and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the valid credentials payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the seeded registered email into the login `Email Address` field. Verify the field contains the email value.
5. Enter the incorrect password (`WrongPassword@999`) into the login `Password` field. Verify the field contains the incorrect password.
6. Select `Login`. Verify the form submission is dispatched.
7. Verify the browser remains on `/login` and does not navigate to `/`.
8. Verify the error message `Your email or password is incorrect!` is visible inside the login form (`.login-form form p`).
9. Verify the header navbar continues to display the `Signup / Login` link (`a[href="/login"]`).
10. Verify the header navbar does not display `Logged in as <name>`, `Logout`, or `Delete Account`.

## Expected Result

The authentication attempt is rejected due to credential mismatch. The application keeps the user unauthenticated on `/login`, displays the error message `"Your email or password is incorrect!"`, creates no session cookies, and the seeded account is purged during teardown.

## Cleanup And Failure Handling

1. Execute an unconditional API teardown in a `finally` block or `afterEach` hook calling `DELETE /api/deleteAccount` with the seeded email and correct password.
2. Assert the teardown response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
3. If an unexpected UI login success occurs due to a credential verification regression defect, attempt UI account deletion to ensure no active sessions remain.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Seed the account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Target login form inputs: `input[data-qa="login-email"]`, `input[data-qa="login-password"]`, and `button[data-qa="login-button"]`.
- Target the server-side error banner using `.login-form form p` or locator `p:has-text("Your email or password is incorrect!")`.
- Assert unauthenticated navbar state: `expect(page.locator('a[href="/login"]')).toBeVisible()`, and `expect(page.locator('li:has-text("Logged in as")')).toHaveCount(0)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the incorrect password equivalence partition for:

> TC-IAM-05 - Login with incorrect email or password (Verify rejection message)