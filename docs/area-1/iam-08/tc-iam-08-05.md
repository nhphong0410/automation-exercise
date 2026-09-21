# TC-IAM-08-05 - Deep-link Navigation Persistence

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-08-05 |
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

Verify that authenticated session persists when navigating directly to a deep-linked (internal) URL, ensuring that session cookies are correctly honored across page transitions.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA DeepLink User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Navigate directly to `https://automationexercise.com/products`.
4. Verify the header displays `Logged in as QA DeepLink User <timestamp>`.
5. Verify the header navbar displays `Logout` (`a[href="/logout"]`) and `Delete Account` (`a[href="/delete_account"]`).

## Expected Result

Authenticated session tokens are correctly utilized during direct deep-link navigation, maintaining login status across the application.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use `page.goto('/products')` to simulate the deep-link navigation.
- Verify authenticated state on the target page.

## Traceability

This case implements the deep-link persistence test for:

> TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen
