# TC-IAM-08-07 - Synchronized Session And Cart Persistence

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-08-07 |
| Parent Condition | TC-IAM-08 |
| Smoke Test | No |
| Design Technique | State Transition / Data Integrity |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Data Integrity |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that both the authenticated session and the shopping cart contents are maintained across page reloads, ensuring data integrity for the user's session state.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA SessionCart User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Navigate to `/products` and add a product to the cart.
4. Verify the cart contains the item.
5. Perform a page reload (`page.reload()`).
6. Verify the header still displays `Logged in as QA SessionCart User <timestamp>`.
7. Navigate to the cart page (`/view_cart`) and verify the product is still present in the cart.

## Expected Result

The session and shopping cart state persist concurrently across reloads, demonstrating that the application preserves both user identity and session-dependent data accurately.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use `page.reload()` to refresh the page.
- Assert authenticated state and cart item persistence.

## Traceability

This case implements the session and cart synchronization test for:

> TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen
