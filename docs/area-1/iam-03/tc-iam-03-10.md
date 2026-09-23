# TC-IAM-03-10 - Registration With Whitespace-Only Mandatory Inputs

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-03-10 |
| Parent Condition | TC-IAM-03 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis - whitespace boundary partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Boundary / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting whitespace-only strings into mandatory text inputs (such as `Name` on Step 1, or `First Name` and `Address 1` on Step 2) does not cause HTTP 500 errors, broken account state, or unhandled client failures. The live SUT may accept these values and continue through the signup flow without trimming them, but the application must remain stable and must not render a malformed authenticated banner.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Step 1 submission data (Whitespace Name):

- Name: `"   "` (three space characters)
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`

Step 2 form data (Whitespace Address):

- Password: `Password@123`
- First name: `"   "` (three space characters)
- Last name: `User`
- Address: `"   "` (three space characters)
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Retain the generated email for failure handling assertions.

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
3. Enter whitespace-only string (`"   "`) into the signup `Name` field. Verify the field accepts the spaces.
4. Enter the valid generated email into the signup `Email Address` field.
5. Select `Signup`. Verify the form submission is dispatched.
6. Verify application behavior on Step 1:
   - If the site blocks the submission at the client layer, verify the browser remains on `/login`.
   - If the site allows the flow to continue, verify it does not return an HTTP 500 and that navigation proceeds to `/signup` or the success path without a broken error state.
7. If Step 2 (`/signup`) is reached, enter valid password and required fields while supplying whitespace-only (`"   "`) into `First Name` and `Address 1`.
8. Select `Create Account`. Verify the form submission is dispatched.
9. Verify that no HTTP 500 Internal Server Error is returned by any network requests.
10. If an account is created, verify the navbar does not render an empty or malformed identity banner (for example `Logged in as ` with no name string).
11. If a created account is observed, perform a teardown cleanup using `DELETE /api/deleteAccount` with the generated email and password.

## Expected Result

Submitting whitespace-only strings in mandatory fields does not cause application crashes, server-side 500 errors, or malformed authenticated state. The system may accept the values and continue through signup without trimming them, but it must remain stable and must not produce a broken `Logged in as` display or a failed server response.

## Cleanup And Failure Handling

1. In the event that an account is created due to lack of server-side whitespace trimming, execute a fallback API teardown in a `finally` block or `afterEach` hook calling `DELETE /api/deleteAccount` with the generated email and password.
2. Assert the teardown response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountInformationPage`.
- Use Playwright's `locator.fill('   ')` to ensure raw whitespace is populated directly into the DOM input without framework-level trimming.
- Attach network response listeners (`page.on('response', ...)`) to assert that no HTTP 500 responses occur during whitespace submission.
- Do not assume the site will reject whitespace-only values; assert the real runtime behavior, which may be acceptance through signup or account creation without 500 errors.
- Assert that the authenticated banner is never rendered in a malformed state (for example `Logged in as ` without a name).
- If the flow produces an account, call `DELETE /api/deleteAccount` in a `finally` block, asserting HTTP `200` and JSON `responseCode` in `[200, 404]`.

## Traceability

This case implements the whitespace boundary value analysis for:

> TC-IAM-03 - Sign up form validation (Blank mandatory fields, invalid email syntax)