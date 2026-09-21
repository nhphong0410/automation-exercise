# TC-IAM-02-04 - Register User With Existing Email Containing Whitespace Boundaries

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-02-04 |
| Parent Condition | TC-IAM-02 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis - whitespace boundary partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting an already-registered email address with leading and/or trailing whitespace characters is properly sanitized and trimmed by the application, correctly identified as a collision against the existing account, and displays the `"Email Address already exist!"` error banner.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with the clean/trimmed email address is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the pre-seeded account using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Space Owner <timestamp>`
- Email: `existing_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `Space`
- Address: `100 Collision Road`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Signup submission data:

- Name: `QA Space Owner <timestamp>`
- Email: `  existing_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test  ` (seeded email flanked with leading and trailing space characters)

Retain the generated clean email and password for API seeding and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the pre-existing user account via `POST /api/createAccount` with the clean email payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
4. Enter the name into the signup `Name` field. Verify the field contains the expected value.
5. Enter the whitespace-padded email (`  existing_<...>@qa.test  `) into the signup `Email Address` field. Verify the field contains the input string with spaces.
6. Select `Signup`. Verify the form submission is dispatched.
7. Verify the user remains on the signup/login page and is not redirected to `/signup`.
8. Verify the error message `Email Address already exist!` is visible inside the signup form.
9. Verify the Step 2 header `Enter Account Information` is not visible.
10. Verify the header navbar continues to display `Signup / Login` and does not display `Logged in as <name>`.

## Expected Result

The application sanitizes the input by trimming boundary whitespace, detects the collision against the registered account, blocks registration, and renders `"Email Address already exist!"` without creating a duplicate record.

## Cleanup And Failure Handling

1. Execute an unconditional API teardown in a `finally` block or `afterEach` hook calling `DELETE /api/deleteAccount` with the seeded clean email and password.
2. Assert the teardown response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
3. If an unexpected UI registration success occurs due to lack of trimming, attempt deletion of any newly created record as well.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Seed the existing account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- When populating the email input, use Playwright's `locator.fill()` to ensure leading and trailing whitespace is passed into the DOM element without automatic truncation.
- Target the duplicate email error banner using `.signup-form form p` or locator `p:has-text("Email Address already exist!")`.
- Note the literal SUT spelling `exist` without the trailing `s`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the whitespace boundary value analysis for:

> TC-IAM-02 - Register user with already-registered email address (Verify error banner)