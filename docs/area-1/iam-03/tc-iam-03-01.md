# TC-IAM-03-01 - Initial Signup With Blank Name Field

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-03-01 |
| Parent Condition | TC-IAM-03 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - blank mandatory name partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the initial signup form on `/login` with an empty `Name` field and a valid email address is prevented by native browser HTML5 constraint validation (`valueMissing`), keeps the user on `/login`, and prevents progression to Step 2 (`Enter Account Information`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated email using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Signup submission data:

- Name: `""` (empty string / unpopulated)
- Email: `valid_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`

Retain the generated email for failure handling assertions.

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
3. Leave the signup `Name` field blank. Verify the field value is empty.
4. Enter the generated valid email into the signup `Email Address` field. Verify the field contains the email value.
5. Select `Signup`. Verify the form submission is intercepted by the browser.
6. Verify the browser remains on `/login` and does not navigate to `/signup`.
7. Evaluate the DOM validity state of the `Name` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
8. Verify the native validation message property (`validationMessage`) of the `Name` element is non-empty.
9. Verify the Step 2 header `Enter Account Information` is not visible.
10. Verify the header navbar continues to display `Signup / Login` and does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked by native HTML5 constraint validation on the mandatory `Name` input (`valueMissing = true`). The application does not dispatch a registration request, prevents progression to Step 2 (`Enter Account Information`), and keeps the user on `/login`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account record is created in the database and no backend cleanup is needed.
2. If an unexpected registration progression occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` in a `finally` block or `afterEach` hook for the generated email.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Automation Exercise uses native HTML5 `required` attributes on `input[data-qa="signup-name"]` rather than custom DOM error banners.
- Assert validation states via DOM property evaluations:
  ```typescript
  const isInvalid = await loginPage.signupNameInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  expect(isInvalid).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*login/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the blank mandatory name equivalence partition for:

> TC-IAM-03 - Sign up form validation (Blank mandatory fields, invalid email syntax)