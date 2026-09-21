# TC-IAM-03-08 - Step 2 Registration With Blank Mandatory Address Fields

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-03-08 |
| Parent Condition | TC-IAM-03 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - blank mandatory address fields partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that on Step 2 of registration (`/signup`), leaving mandatory address fields (`Address 1`, `State`, `City`, or `Zipcode`) blank while populating all other required fields blocks form submission via native HTML5 constraint validation (`valueMissing`), keeps the user on `/signup`, and prevents account creation.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. A fresh, unique email address is generated to complete Step 1 (`/login`) and advance to Step 2 (`/signup`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Step 1 initial submission data:

- Name: `QA Blank Address <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`

Step 2 baseline required values:

- Password: `Password@123`
- First name: `QA`
- Last name: `User`
- Country: `United States`
- Mobile number: timestamp-based unique value

Address variations to evaluate:

- Primary Variation (Blank Address 1): `Address 1 = ""` with valid `State`, `City`, `Zipcode`
- Secondary Variations (Parameterized/Evaluated):
  - Blank State: `State = ""`
  - Blank City: `City = ""`
  - Blank Zipcode: `Zipcode = ""`

Retain the generated email for failure handling assertions.

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
3. Enter the generated name and unique email into Step 1 inputs. Select `Signup`.
4. Verify the browser navigates to `/signup` and `ENTER ACCOUNT INFORMATION` is visible.
5. Enter valid values for Password, First name, Last name, Country, and Mobile number.
6. Leave the `Address 1` field (`input[data-qa="address"]`) blank while populating State, City, and Zipcode with valid values.
7. Select `Create Account`. Verify the form submission is intercepted by the browser.
8. Verify the browser remains on `/signup` and does not navigate to `/account_created`.
9. Evaluate the DOM validity state of the `Address 1` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
10. Populate `Address 1` with a valid address and systematically evaluate remaining mandatory address fields (`State`, `City`, `Zipcode`) by verifying each element's `required` attribute and asserting `validity.valueMissing` is `true` when submitted empty.
11. Verify the confirmation text `ACCOUNT CREATED!` is not visible.
12. Verify the header navbar does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked by native HTML5 constraint validation whenever any mandatory address field (`Address 1`, `State`, `City`, or `Zipcode`) is left blank (`valueMissing = true`). No account record is created in the database, the confirmation page is not reached, and the user remains on `/signup`.

## Cleanup And Failure Handling

1. Under normal pass conditions, no account record is created in the database and no backend cleanup is needed.
2. If an unexpected account creation occurs due to a validation regression defect, execute a fallback API call via `DELETE /api/deleteAccount` in a `finally` block or `afterEach` hook for the generated email.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountInformationPage`.
- Target address inputs: `input[data-qa="address"]`, `input[data-qa="state"]`, `input[data-qa="city"]`, and `input[data-qa="zipcode"]`. All define the HTML5 `required` attribute.
- To protect the nightly regression SLA (< 12 mins), validate the native constraint attributes and DOM validity across address fields within a single page session rather than executing four separate browser runs.
- Assert validation states via DOM property evaluations:
  ```typescript
  const isAddressInvalid = await accountInfoPage.address1Input.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  expect(isAddressInvalid).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*signup/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the blank mandatory address fields equivalence partition for:

> TC-IAM-03 - Sign up form validation (Blank mandatory fields, invalid email syntax)