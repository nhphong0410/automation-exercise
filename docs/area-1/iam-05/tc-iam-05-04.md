# TC-IAM-05-04 - Login With Blank Password Field

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-05-04 |
| Parent Condition | TC-IAM-05 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning - blank password partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the login form on `/login` with a registered email address and an empty `Password` field is prevented by native browser HTML5 constraint validation (`valueMissing`), dispatches no network request, keeps the user on `/login`, and prevents session establishment.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with known credentials is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Blank Pass User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `BlankPass`
- Address: `100 Security Gate`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)
- Password: `""` (empty string / unpopulated)

Retain the generated email and password for API seeding and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the valid credentials payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the seeded email into the login `Email Address` field. Verify the field contains the email value.
5. Leave the login `Password` field blank. Verify the field value is empty.
6. Select `Login`. Verify the form submission is intercepted by the browser.
7. Verify the browser remains on `/login` and does not navigate to `/`.
8. Evaluate the DOM validity state of the `Password` input element. Verify `checkValidity()` returns `false` and `validity.valueMissing` is `true`.
9. Verify the native validation message property (`validationMessage`) of the `Password` element is non-empty.
10. Verify that native browser focus remains anchored to the `Password` input.
11. Verify the header navbar continues to display `Signup / Login` (`a[href="/login"]`) and does not display `Logged in as <name>`.

## Expected Result

Form submission is blocked on the client side by HTML5 constraint validation on the mandatory `Password` input (`valueMissing = true`). No authentication request is dispatched to the server, and the user remains unauthenticated on `/login`.

## Cleanup And Failure Handling

1. Execute an unconditional API teardown in a `finally` block or `afterEach` hook calling `DELETE /api/deleteAccount` with the seeded email and password.
2. Assert the teardown response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
3. If an unexpected authentication bypass occurs due to a validation regression defect, attempt UI account deletion or log a critical defect.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Seed the account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Automation Exercise enforces HTML5 `required` and `type="password"` attributes on `input[data-qa="login-password"]` rather than rendering custom DOM error banners.
- Assert validation states via DOM property evaluations:
  ```typescript
  const isInvalid = await loginPage.loginPasswordInput.evaluate(
    (el: HTMLInputElement) => !el.checkValidity() && el.validity.valueMissing
  );
  expect(isInvalid).toBe(true);
  ```
- Confirm URL stability using `expect(page).toHaveURL(/.*login/)`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the blank password equivalence partition for:

> TC-IAM-05 - Login with incorrect email or password (Verify rejection message)