# TC-IAM-04-07 - Re-Authentication Lifecycle Flow

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-04-07 |
| Parent Condition | TC-IAM-04 |
| Smoke Test | No |
| Design Technique | State Transition - login, logout, and re-authentication cycle |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / State Transition / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that an authenticated user can log out via the navbar and immediately re-authenticate with the same credentials within the same browser session without experiencing cache lockups, token conflicts, or session degradation, and delete the account cleanly during teardown.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with known credentials is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Reauth User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `Reauth`
- Address: `100 Cycle Street`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)
- Password: `Password@123` (exact match to seeded password)

Retain the generated email and password for API seeding, UI logins, and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the test data payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the seeded email and password into login fields. Select `Login`.
5. Verify the browser navigates to `/` (home page) and navbar displays `Logged in as QA Reauth User <timestamp>`.
6. Select `Logout` (`a[href="/logout"]`) from the navbar.
7. Verify the browser navigates to `/login`, `"Logged in as"` is removed from the navbar, and the `Login to your account` form is visible.
8. Enter the exact same email and password into the login form inputs.
9. Select `Login`. Verify the second form submission is dispatched.
10. Verify the browser navigates to `/` (home page).
11. Verify the header navbar displays `Logged in as QA Reauth User <timestamp>`.
12. Verify the header navbar displays `Logout` and `Delete Account` links.
13. Select `Delete Account`. Verify account deletion is submitted.
14. Verify `ACCOUNT DELETED!` is visible on the confirmation screen.

## Expected Result

The user completes the entire authentication cycle (`Login` $\rightarrow$ `Logout` $\rightarrow$ `Re-login`) cleanly. The second authentication establishes an active session without cookie collisions or stale cache errors, displays `"Logged in as <username>"`, and the account is deleted cleanly during teardown.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block whenever the account is authenticated.
2. Verify `ACCOUNT DELETED!` after UI deletion.
3. If UI cleanup is unavailable or fails after account creation, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
4. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
5. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountPage`.
- Seed the account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Execute both login actions and the intermediate logout within the same Playwright test execution to evaluate in-session state clearing.
- Assert the session banner (`li:has-text("Logged in as")`) after both the initial login and the re-login steps.
- Do not reuse authenticated storage state because this test explicitly exercises the login flow and mutates account data.

## Traceability

This case implements the re-authentication lifecycle state transition test for:

> TC-IAM-04 - Login with valid credentials and verify "Logged in as <username>"