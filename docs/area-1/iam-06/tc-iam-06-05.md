# TC-IAM-06-05 - Direct Access to Checkout Route Post-Logout

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-06-05 |
| Parent Condition | TC-IAM-06 |
| Smoke Test | No |
| Design Technique | Security / Access Control |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Security |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that direct URL navigation to the checkout route (`/checkout`) post-logout is intercepted, redirecting the user to login or an authentication prompt.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA CheckoutSec User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Select `Logout` from the navbar.
4. Verify the browser is on `https://automationexercise.com/login`.
5. Attempt to navigate directly to `https://automationexercise.com/checkout` using `page.goto()`.
6. Verify the user is redirected to `/login` or otherwise blocked from viewing checkout information.

## Expected Result

Access to checkout information is restricted to authenticated sessions only.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `page.goto('/checkout')`.
- Assert that the final URL is `/login` or contains a login-related query parameter.

## Traceability

This case implements the direct access checkout security test for:

> TC-IAM-06 - Logout Flow And Restricted-Page Access Verification
