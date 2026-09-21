# TC-IAM-02-07 - Rapid Repeated Submission Of Duplicate Email Registration

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-02-07 |
| Parent Condition | TC-IAM-02 |
| Smoke Test | No |
| Design Technique | Error Guessing - rapid repeated submission and UI idempotency |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Error Guessing / Negative |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that rapidly triggering consecutive click events on the `Signup` button with an already-registered email address does not cause race conditions, unhandled client-side runtime errors, or server-side 500 crashes, and that the application idempotently retains the `"Email Address already exist!"` error banner.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with the target email address is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the pre-seeded account using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Rapid User <timestamp>`
- Email: `existing_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `Rapid`
- Address: `100 Collision Road`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Signup submission data:

- Name: `QA Rapid User <timestamp>`
- Email: `existing_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)

Retain the generated email and password for API seeding and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the pre-existing user account via `POST /api/createAccount` with the test data payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Attach listeners for `pageerror` and network responses to capture unhandled exceptions or HTTP 500 status codes.
3. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
4. Select `Signup / Login`. Verify the `New User Signup!` form is visible.
5. Enter the seeded name into the signup `Name` field. Verify the field contains the expected value.
6. Enter the seeded email into the signup `Email Address` field. Verify the field contains the expected value.
7. Dispatch multiple rapid consecutive clicks on the `Signup` button without awaiting intermediate responses (e.g., 3 consecutive clicks in rapid succession).
8. Verify no unhandled JavaScript errors or page crashes were recorded during the click burst.
9. Verify the browser remains on the signup/login page and is not redirected to `/signup`.
10. Verify no network response triggered by the burst submissions returned an HTTP 500 Internal Server Error.
11. Verify the error message `Email Address already exist!` is rendered stably inside the signup form.
12. Verify the Step 2 header `Enter Account Information` is not visible.
13. Verify the header navbar continues to display `Signup / Login` and does not display `Logged in as <name>`.

## Expected Result

The application handles rapid consecutive submissions idempotently. The client and backend absorb repeated requests without unhandled script errors or HTTP 500 responses, stably displaying `"Email Address already exist!"` while keeping the user on the signup form.

## Cleanup And Failure Handling

1. Execute an unconditional API teardown in a `finally` block or `afterEach` hook calling `DELETE /api/deleteAccount` with the seeded email and password.
2. Assert the teardown response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
3. If an unexpected UI registration success occurs due to a race condition regression, invoke account deletion to ensure no duplicate records remain.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage` and `LoginPage`.
- Attach `page.on('pageerror', ...)` and `page.on('response', ...)` listeners before initiating the action to assert no crashes occur.
- Trigger rapid clicks using multiple unawaited `locator.click({ force: true })` calls or dispatch click events via DOM script evaluation in quick succession.
- Seed the existing account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Target the duplicate email error banner using `.signup-form form p` or locator `p:has-text("Email Address already exist!")`.
- Note the literal SUT spelling `exist` without the trailing `s`.
- Do not reuse authenticated storage state because this test evaluates unauthenticated guest behavior.

## Traceability

This case implements the rapid repeated submission error guessing test for:

> TC-IAM-02 - Register user with already-registered email address (Verify error banner)