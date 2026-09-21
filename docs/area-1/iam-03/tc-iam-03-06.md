# TC-IAM-03-06 - Step 2 Registration With Blank Mandatory Password Field

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-03-06 |
| Parent Condition | TC-IAM-03 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - blank mandatory password partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that on Step 2 of registration (`/signup`), leaving the mandatory `Password` field blank while populating all other required profile and address fields blocks form submission via native HTML5 constraint validation (`valueMissing`), keeps the user on `/signup`, and prevents account creation.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. A fresh, unique email address is generated to complete Step 1 (`/login`) and advance to Step 2 (`/signup`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Step 1 initial submission data:

- Name: `QA Blank Pass <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`

Step 2 form data:

- Password: `""` (empty string / unpopulated)
- Title: `Mr`
- First name: `QA`
- Last name: `User`
- Address: `100 Test Street`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Retain the generated email for failure handling assertions.

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
3. Enter the generated name and unique email into Step 1 inputs. Select `Signup`.
4. Verify the browser navigates to `/signup` and `ENTER ACCOUNT INFORMATION` is visible.
5. Select title `Mr`. Verify the radio button is selected.
6. Leave the `Password` field blank. Verify the field value is empty.
7. Enter all required address fields: First name, Last name, Address, Country, State, City, Zipcode, and Mobile number. Verify all fields contain their values.
8. Select `Create Account`. Verify the form submission is intercepted by the browser.
9. Verify the browser remains on `/signup` and does not navigate to `/account_created`.
10. Evaluate the DOM validity state of the `Password` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
11. Verify the native validation message property (`validationMessage`) of the `Password` element is non-empty.
12. Verify the confirmation text `ACCOUNT CREATED!` is not visible.
13. Verify the header navbar does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked by native HTML5 constraint validation on the mandatory `Password` input (`valueMissing = true`). No account record is created in the database, the confirmation page is not reached, and the user remains on `/signup`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account record is created in the database and no backend cleanup is needed.
2. If an unexpected account creation occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` in a `finally` block or `afterEach` hook for the generated email.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountInformationPage`.
- Target the password input using `input[data-qa="password"]`, which defines the HTML5 `required` attribute.
- Assert validation states via DOM property evaluations:
  ```typescript
  const isInvalid = await accountInfoPage.passwordInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  expect(isInvalid).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*signup/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the blank mandatory password equivalence partition for:

> TC-IAM-03 - Sign up form validation (Blank mandatory fields, invalid email syntax)