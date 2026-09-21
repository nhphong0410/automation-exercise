# TC-IAM-08-01 - Baseline Hard Page Reload

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-08-01 |
| Parent Condition | TC-IAM-08 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that an authenticated session persists across a browser hard reload (`page.reload()`), maintaining the user's logged-in status and navigation bar state.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA Reload User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Verify the header displays `Logged in as QA Reload User <timestamp>`.
4. Perform a hard reload of the page (`page.reload()`).
5. Verify the header still displays `Logged in as QA Reload User <timestamp>`.
6. Verify the header navbar continues to display `Logout` (`a[href="/logout"]`) and `Delete Account` (`a[href="/delete_account"]`).

## Expected Result

The authenticated session persists seamlessly through a page reload, ensuring no loss of state or unauthorized logout occurs.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use `page.reload()` to trigger the hard reload.
- Assert authenticated state using `li:has-text("Logged in as")` and verify persistent visibility of authenticated controls.

## Traceability

This case implements the baseline hard page reload test for:

> TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen
