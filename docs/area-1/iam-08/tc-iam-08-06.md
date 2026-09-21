# TC-IAM-08-06 - Cookie Eviction Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-08-06 |
| Parent Condition | TC-IAM-08 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Security |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that clearing session cookies programmatically results in an immediate invalidation of the authenticated session, forcing the user to an unauthenticated state upon page reload.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA CookieEvict User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Use `context.clearCookies()` to remove all cookies from the browser context.
4. Perform a page reload (`page.reload()`).
5. Verify the header displays `Signup / Login` (`a[href="/login"]`).
6. Verify the header no longer displays `Logout` or `Logged in as ...`.

## Expected Result

Clearing the session cookies correctly invalidates the authenticated session on the application server, resulting in a forced guest state.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use `context.clearCookies()` to simulate token/cookie expiration/deletion.
- Verify that the application responds to the absence of credentials by defaulting the UI to guest mode.

## Traceability

This case implements the cookie eviction test for:

> TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen
