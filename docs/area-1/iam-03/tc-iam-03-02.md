# TC-IAM-03-02 - Initial Signup With Blank Email Address Field

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-03-02 |
| Parent Condition | TC-IAM-03 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - blank mandatory email partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the initial signup form on `/login` with a valid `Name` and an empty `Email Address` field is prevented by native browser HTML5 constraint validation (`valueMissing`), keeps the user on `/login`, and prevents progression to Step 2 (`Enter Account Information`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated user name using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Signup submission data:

- Name: `QA User <timestamp>`
- Email: `""` (empty string / unpopulated)

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
3. Enter the valid name into the signup `Name` field. Verify the field contains the expected name value.
4. Leave the signup `Email Address` field blank. Verify the field value is empty.
5. Select `Signup`. Verify the form submission is intercepted by the browser.
6. Verify the browser remains on `/login` and does not navigate to `/signup`.
7. Evaluate the DOM validity state of the `Email Address` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
8. Verify the native validation message property (`validationMessage`) of the `Email Address` element is non-empty.
9. Verify the Step 2 header `Enter Account Information` is not visible.
10. Verify the header navbar continues to display `Signup / Login` and does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked by native HTML5 constraint validation on the mandatory `Email Address` input (`valueMissing = true`). The application does not dispatch a registration request, prevents transition to Step 2 (`Enter Account Information`), and keeps the user on `/login`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account record is created in the database and no backend cleanup is needed.
2. If an unexpected registration progression occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` in a `finally` block or `afterEach` hook for any newly created account.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Automation Exercise uses native HTML5 `required` and `type="email"` attributes on `input[data-qa="signup-email"]` rather than custom DOM error banners.
- Assert validation states via DOM property evaluations:
  ```typescript
  const isInvalid = await loginPage.signupEmailInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  expect(isInvalid).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*login/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the blank mandatory email equivalence partition for:

> TC-IAM-03 - Sign up form validation (Blank mandatory fields, invalid email syntax)