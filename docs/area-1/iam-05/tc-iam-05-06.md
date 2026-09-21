# TC-IAM-05-06 - Login With Malformed Email Syntax

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-05-06 |
| Parent Condition | TC-IAM-05 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - malformed email syntax partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Syntax / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the login form on `/login` with an email address containing invalid syntax (missing `@` symbol or missing domain) is rejected by native browser HTML5 email validation (`typeMismatch`), prevents server-side submission, keeps the user on `/login`, and prevents session establishment.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate malformed email strings using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Login submission data:

- Primary Variation (Missing `@` symbol): `plainaddress_<yyyyMMdd_HHmmss_SSS>_qa.test`
- Secondary Variation (Missing domain): `user_<yyyyMMdd_HHmmss_SSS>@`
- Password: `Password@123`

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `Login to your account` form is visible.
3. Enter the malformed email missing `@` into the login `Email Address` field. Verify the field contains the input string.
4. Enter the password into the login `Password` field. Verify the field contains the password value.
5. Select `Login`. Verify the form submission is intercepted by the browser.
6. Verify the browser remains on `/login` and does not navigate to `/`.
7. Evaluate the DOM validity state of the `Email Address` input element. Verify `checkValidity()` returns `false` and `validity.typeMismatch` is `true`.
8. Verify the native validation message property (`validationMessage`) of the `Email Address` element is non-empty.
9. Clear `Email Address`, enter the secondary variation missing domain (`user_<...>@`), and select `Login`.
10. Verify form submission is again intercepted by the browser and the browser remains on `/login`.
11. Verify the header navbar continues to display `Signup / Login` (`a[href="/login"]`) and does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked by native HTML5 constraint validation on the `type="email"` input due to invalid email syntax (`typeMismatch = true`). The application dispatches no authentication request to the server, and the user remains unauthenticated on `/login`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account is authenticated or created, so no backend cleanup is needed.
2. If an unexpected authentication bypass occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` or log a critical defect.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Automation Exercise relies on native browser `type="email"` constraint validation on `input[data-qa="login-email"]`.
- Assert syntax rejection via DOM property evaluation:
  ```typescript
  const isTypeMismatch = await loginPage.loginEmailInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.typeMismatch
  );
  expect(isTypeMismatch).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*login/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the malformed email syntax equivalence partition for:

> TC-IAM-05 - Login with incorrect email or password (Verify rejection message)