# TC-IAM-03-05 - Initial Signup With Incomplete Email Domain Or Local Part

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-03-05 |
| Parent Condition | TC-IAM-03 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - incomplete email syntax partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Syntax / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the initial signup form on `/login` with an incomplete email format missing either the domain part (e.g., `user@`) or the local username part (e.g., `@domain.com`) is rejected by native browser HTML5 email validation (`typeMismatch`), prevents server submission, keeps the user on `/login`, and prevents progression to Step 2 (`Enter Account Information`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated user name and incomplete email strings using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Signup submission data:

- Name: `QA Incomplete Syntax <timestamp>`
- Primary Variation (Missing Domain): `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@`
- Secondary Variation (Missing Local Part): `@qa.test`

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
3. Enter the valid name into the signup `Name` field. Verify the field contains the expected value.
4. Enter the incomplete email missing domain (`user_<...>@`) into the signup `Email Address` field. Verify the field contains the input string.
5. Select `Signup`. Verify the form submission is intercepted by the browser.
6. Verify the browser remains on `/login` and does not navigate to `/signup`.
7. Evaluate the DOM validity state of the `Email Address` input element. Verify `checkValidity()` returns `false` and `validity.typeMismatch` is `true`.
8. Verify the native validation message property (`validationMessage`) of the `Email Address` element is non-empty.
9. Clear the `Email Address` field and enter the secondary variation missing local part (`@qa.test`).
10. Select `Signup`. Verify form submission is again intercepted by the browser and page remains on `/login`.
11. Verify the Step 2 header `Enter Account Information` is not visible.
12. Verify the header navbar continues to display `Signup / Login` and does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked by native HTML5 constraint validation on the `type="email"` input due to incomplete email structure (`typeMismatch = true`). The application dispatches no registration request, prevents progression to Step 2 (`Enter Account Information`), and keeps the user on `/login`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account record is created in the database and no backend cleanup is needed.
2. If an unexpected registration progression occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` in a `finally` block or `afterEach` hook for any newly created account.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Automation Exercise relies on native browser `type="email"` constraint validation on `input[data-qa="signup-email"]`.
- Assert syntax rejection via DOM property evaluation:
  ```typescript
  const isTypeMismatch = await loginPage.signupEmailInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.typeMismatch
  );
  expect(isTypeMismatch).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*login/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the incomplete email syntax equivalence partition for:

> TC-IAM-03 - Sign up form validation (Blank mandatory fields, invalid email syntax)