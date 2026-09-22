# TC-IAM-02-06 - Register User With Recycled Email After Deletion

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-02-06 |
| Parent Condition | TC-IAM-02 |
| Smoke Test | No |
| Design Technique | State Transition - account lifecycle and credential recycling |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / State Transition / Lifecycle |
| Automation Level | UI end-to-end with API lifecycle hooks |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when an existing account is permanently deleted from the system, its email address is released from the unique constraint, allowing a user to re-register with that exact same email address and successfully advance to Step 2 (`Enter Account Information`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with the target email address is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the account lifecycle using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Account and registration data:

- Name: `QA Recycled User <timestamp>`
- Email: `recycled_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `Recycled`
- Address: `100 Lifecycle Way`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Retain the generated email and password for API seeding, deletion, and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the initial user account via `POST /api/createAccount` with the test data payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
4. Enter the name into the signup `Name` field. Verify the field contains the expected value.
5. Enter the seeded email into the signup `Email Address` field. Verify the field contains the expected value.
6. Select `Signup`. Verify the form submission is dispatched.
7. Verify the user remains on the signup/login page and the error message `Email Address already exist!` is visible inside the signup form.
8. Send an API request via `DELETE /api/deleteAccount` with the target email and password. Verify the API response is HTTP `200` with JSON `responseCode` `200` (`"Account deleted!"`).
9. Re-trigger the signup submission in the UI with the same name and email address (e.g., re-click `Signup`). Verify the form submission is dispatched.
10. Verify the application transitions successfully to Step 2 (`/signup`).
11. Verify the header `ENTER ACCOUNT INFORMATION` is visible.
12. Verify the pre-populated email field on Step 2 matches the recycled email address.

## Expected Result

The initial registration attempt is blocked with `"Email Address already exist!"`. Once the account is deleted via API, the system releases the unique constraint, allowing the exact same email address to be submitted for registration and advancing to Step 2 (`Enter Account Information`).

## Cleanup And Failure Handling

1. Execute an unconditional API teardown in a `finally` block or `afterEach` hook calling `DELETE /api/deleteAccount` with the recycled email and password.
2. Assert the teardown response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
3. If an unexpected registration failure occurs prior to step 8, ensure the pre-seeded account is purged during teardown.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountInformationPage`.
- Seed the existing account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Use Playwright's `request` context mid-test at step 8 to invoke `DELETE /api/deleteAccount`, validating cross-layer state synchronization without UI logout overhead.
- Target the duplicate email error banner using `.signup-form form p` or locator `p:has-text("Email Address already exist!")`.
- Note the literal SUT spelling `exist` without the trailing `s`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the state transition lifecycle test for:

> TC-IAM-02 - Register user with already-registered email address (Verify error banner)