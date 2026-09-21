# TC-IAM-05-05 - Login With Both Email And Password Blank

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-05-05 |
| Parent Condition | TC-IAM-05 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis - empty login form boundary partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the login form on `/login` with both the `Email Address` and `Password` fields left completely empty is prevented by native browser HTML5 constraint validation on the mandatory inputs, prevents network submission, keeps the user on `/login`, and prevents session establishment.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Login submission data:

- Email: `""` (empty string / unpopulated)
- Password: `""` (empty string / unpopulated)

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `Login to your account` form is visible.
3. Leave the login `Email Address` field blank. Verify the field value is empty.
4. Leave the login `Password` field blank. Verify the field value is empty.
5. Select `Login`. Verify the form submission is intercepted by the browser.
6. Verify the browser remains on `/login` and does not navigate to `/`.
7. Evaluate the DOM validity state of the `Email Address` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
8. Evaluate the DOM validity state of the `Password` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
9. Verify that native browser focus remains anchored to the first invalid mandatory input (`Email Address`).
10. Verify the header navbar continues to display `Signup / Login` (`a[href="/login"]`) and does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked on the client side by HTML5 constraint validation on both mandatory inputs (`valueMissing = true`), prioritizing the first empty input (`Email Address`). No authentication request is dispatched to the server, and the user remains unauthenticated on `/login`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account is authenticated or created, so no backend cleanup is needed.
2. If an unexpected authentication bypass occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` or log a critical defect.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Both `input[data-qa="login-email"]` and `input[data-qa="login-password"]` define the HTML5 `required` attribute.
- Assert validation states on both elements via DOM property evaluations:
  ```typescript
  const isEmailMissing = await loginPage.loginEmailInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  const isPasswordMissing = await loginPage.loginPasswordInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  expect(isEmailMissing).toBe(true);
  expect(isPasswordMissing).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*login/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the empty login form boundary value analysis for:

> TC-IAM-05 - Login with incorrect email or password (Verify rejection message)