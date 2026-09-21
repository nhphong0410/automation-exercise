# TC-IAM-05-07 - Login With SQL Injection Payloads

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-05-07 |
| Parent Condition | TC-IAM-05 |
| Smoke Test | No |
| Design Technique | Error Guessing / Security - SQL injection input partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Error Guessing / Security / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting common SQL injection (SQLi) payloads into the login form inputs (`Email Address` and `Password`) is handled safely by the application, does not bypass authentication, exposes no database syntax errors or HTTP 500 crashes, and stably displays standard credential rejection feedback.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate injection strings using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Login submission data:

- Email: `admin'--@qa.test` (syntactically valid email format containing SQL comment characters)
- Password: `' OR '1'='1` (standard authentication bypass SQL payload)

## Test Steps And Expected Results

1. Attach network response listeners (`page.on('response')`) to inspect server HTTP status codes and response bodies.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the SQL injection email string (`admin'--@qa.test`) into the login `Email Address` field. Verify the field contains the input string.
5. Enter the SQL injection payload (`' OR '1'='1`) into the login `Password` field. Verify the field contains the payload string.
6. Select `Login`. Verify the form submission is dispatched.
7. Verify that no network response returns an HTTP 500 Internal Server Error or leaks database error messages (e.g., SQL syntax warnings, MySQL/MariaDB error strings).
8. Verify the browser remains on `/login` and does not navigate to `/`.
9. Verify the error message `Your email or password is incorrect!` is visible inside the login form (`.login-form form p`).
10. Verify the header navbar continues to display `Signup / Login` (`a[href="/login"]`) and does not display `Logged in as <name>`, `Logout`, or `Delete Account`.

## Expected Result

The SQL injection strings are treated safely as literal data by parameterized queries or escaping logic. The server safely rejects the authentication attempt with `"Your email or password is incorrect!"`, returns no 500 errors or database disclosures, and preserves the unauthenticated guest state.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account is authenticated or created, so no backend cleanup is needed.
2. If an authentication bypass occurs due to a critical security regression, log an immediate severity-blocker defect and attempt UI/API teardown if an unexpected session was established.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Attach `page.on('response', ...)` before clicking login to assert all HTTP responses return status `< 500`.
- Target the server-side error banner using `.login-form form p` or locator `p:has-text("Your email or password is incorrect!")`.
- Assert unauthenticated navbar state: `expect(page.locator('a[href="/login"]')).toBeVisible()`, and `expect(page.locator('li:has-text("Logged in as")')).toHaveCount(0)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the SQL injection error guessing security test for:

> TC-IAM-05 - Login with incorrect email or password (Verify rejection message)