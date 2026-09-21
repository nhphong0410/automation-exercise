# TC-IAM-05-02 - Login With Unregistered Email Address

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-05-02 |
| Parent Condition | TC-IAM-05 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - unregistered email partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting an unregistered, non-existent email address with an arbitrary password into the login form is rejected by the application, keeps the user on `/login`, displays the `"Your email or password is incorrect!"` error banner, and creates no active session.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. The generated email address does not exist in the SUT database.
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated non-existent email string using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Login submission data:

- Email: `nonexistent_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `ArbitraryPassword@123`

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `Login to your account` form is visible.
3. Enter the non-existent email into the login `Email Address` field. Verify the field contains the email value.
4. Enter the arbitrary password into the login `Password` field. Verify the field contains the password value.
5. Select `Login`. Verify the form submission is dispatched.
6. Verify the browser remains on `/login` and does not navigate to `/`.
7. Verify the error message `Your email or password is incorrect!` is visible inside the login form (`.login-form form p`).
8. Verify the header navbar continues to display the `Signup / Login` link (`a[href="/login"]`).
9. Verify the header navbar does not display `Logged in as <name>`, `Logout`, or `Delete Account`.

## Expected Result

The authentication attempt is rejected because no matching user account exists. The application keeps the user unauthenticated on `/login`, renders `"Your email or password is incorrect!"`, and creates no authenticated session state.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account exists or is created, so no backend teardown is required.
2. If an unexpected UI login success occurs due to an authentication bypass regression, attempt UI account deletion or dispatch `DELETE /api/deleteAccount` to prevent orphan data pollution.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- No account seeding is performed before this test, ensuring the email identity is completely absent from the database.
- Target login form inputs: `input[data-qa="login-email"]`, `input[data-qa="login-password"]`, and `button[data-qa="login-button"]`.
- Target the server-side error banner using `.login-form form p` or locator `p:has-text("Your email or password is incorrect!")`.
- Assert unauthenticated navbar state: `expect(page.locator('a[href="/login"]')).toBeVisible()`, and `expect(page.locator('li:has-text("Logged in as")')).toHaveCount(0)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the unregistered email equivalence partition for:

> TC-IAM-05 - Login with incorrect email or password (Verify rejection message)