# TC-IAM-03-03 - Initial Signup With Both Name And Email Blank

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-03-03 |
| Parent Condition | TC-IAM-03 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis - empty form boundary partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the initial signup form on `/login` with both the `Name` and `Email Address` fields left completely empty is prevented by native browser HTML5 constraint validation on the mandatory inputs, prevents network submission, keeps the user on `/login`, and prevents progression to Step 2 (`Enter Account Information`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Signup submission data:

- Name: `""` (empty string / unpopulated)
- Email: `""` (empty string / unpopulated)

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
3. Leave the signup `Name` field blank. Verify the field value is empty.
4. Leave the signup `Email Address` field blank. Verify the field value is empty.
5. Select `Signup`. Verify the form submission is intercepted by the browser.
6. Verify the browser remains on `/login` and does not navigate to `/signup`.
7. Evaluate the DOM validity state of the `Name` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
8. Evaluate the DOM validity state of the `Email Address` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
9. Verify that native browser focus remains anchored to the first invalid mandatory input (`Name`).
10. Verify the Step 2 header `Enter Account Information` is not visible.
11. Verify the header navbar continues to display `Signup / Login` and does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked on the client side by HTML5 constraint validation on the mandatory inputs (`valueMissing = true`). No registration request is dispatched to the server, transition to Step 2 (`Enter Account Information`) is blocked, and the user remains on `/login`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account record is created in the database and no backend cleanup is needed.
2. If an unexpected registration progression occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` in a `finally` block or `afterEach` hook for any newly created account.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Both `input[data-qa="signup-name"]` and `input[data-qa="signup-email"]` define the HTML5 `required` attribute.
- Assert validation states on both elements via DOM property evaluations:
  ```typescript
  const isNameMissing = await loginPage.signupNameInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  const isEmailMissing = await loginPage.signupEmailInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  expect(isNameMissing).toBe(true);
  expect(isEmailMissing).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*login/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the empty form boundary value analysis for:

> TC-IAM-03 - Sign up form validation (Blank mandatory fields, invalid email syntax)