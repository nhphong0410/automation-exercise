# TC-IAM-08-03 - Tab Closure And Restoration

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-08-03 |
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

Verify that closing an authenticated tab and opening a new one in the same browser context preserves session cookies and maintains the authenticated state.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA TabRestore User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials in `Tab 1`.
3. Close `Tab 1` (`page.close()`).
4. Open a new tab (`Tab 2`) in the same browser context (`context.newPage()`).
5. Navigate `Tab 2` to `https://automationexercise.com/`.
6. Verify `Tab 2` displays the authenticated header (`Logged in as QA TabRestore User <timestamp>`).

## Expected Result

The authentication session (cookies) persists across the lifecycle of tab closure and reopening, allowing the new tab to recognize the logged-in user.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use `page.close()` to close the initial tab.
- Use `context.newPage()` to open a fresh tab.
- Verify that the new page retains the session immediately upon load.

## Traceability

This case implements the tab restoration session persistence test for:

> TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen
