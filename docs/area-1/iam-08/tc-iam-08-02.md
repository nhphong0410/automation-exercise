# TC-IAM-08-02 - Multi-tab Session Sharing

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-08-02 |
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

Verify that an authenticated session is shared across multiple tabs within the same browser context, allowing authenticated access without re-authentication in the second tab.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA MultiTab User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials in `Tab 1`.
3. Open a second tab (`Tab 2`) in the same browser context (`context.newPage()`).
4. Navigate `Tab 2` to `https://automationexercise.com/`.
5. Verify `Tab 2` displays the authenticated header (`Logged in as QA MultiTab User <timestamp>`).
6. Verify `Tab 2` displays `Logout` (`a[href="/logout"]`) and `Delete Account` (`a[href="/delete_account"]`).

## Expected Result

The authenticated session state is correctly shared across tabs in the same browser context, maintaining user login across the entire application interface.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use `context.newPage()` to open a second tab in the same context.
- Assert authenticated state in `Tab 2` using the standard header locators.

## Traceability

This case implements the multi-tab session sharing test for:

> TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen
