# TC-IAM-04-06 - Authenticated Navigation Continuity Across Pages

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-04-06 |
| Parent Condition | TC-IAM-04 |
| Smoke Test | No |
| Design Technique | State Transition - authenticated multi-route navigation |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / State Transition / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that once a user authenticates via the login form, their authenticated session state (`"Logged in as <username>"`, `Logout`, `Delete Account`) remains active and persistent across internal page navigations (`/products`, `/view_cart`, `/contact_us`, `/`), and that the account is deleted cleanly during teardown.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. An active user account with known credentials is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Precondition account data (seeded via API):

- Name: `QA Continuity User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- First name: `QA`
- Last name: `Continuity`
- Address: `100 Session Way`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Login submission data:

- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test` (exact match to seeded account)
- Password: `Password@123` (exact match to seeded password)

Retain the generated email and password for API seeding, UI login, and cleanup. Never commit credentials to source control.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount` with the test data payload. Verify the response is HTTP `200` with JSON `responseCode` `201`.
2. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
3. Select `Signup / Login`. Verify the `Login to your account` form is visible.
4. Enter the seeded email and password into login fields. Select `Login`.
5. Verify the browser navigates to `/` (home page) and navbar displays `Logged in as QA Continuity User <timestamp>`.
6. Select the `Products` link in the navbar (`a[href="/products"]`). Verify navigation to `/products` and assert `Logged in as QA Continuity User <timestamp>` remains visible.
7. Select the `Cart` link in the navbar (`a[href="/view_cart"]`). Verify navigation to `/view_cart` and assert `Logged in as QA Continuity User <timestamp>` remains visible.
8. Select the `Contact us` link in the navbar (`a[href="/contact_us"]`). Verify navigation to `/contact_us` and assert `Logged in as QA Continuity User <timestamp>` remains visible.
9. Select the `Home` link in the navbar (`a[href="/"]`). Verify return to `/` and assert `Logged in as QA Continuity User <timestamp>` remains visible.
10. Verify `Logout` (`a[href="/logout"]`) and `Delete Account` (`a[href="/delete_account"]`) are visible on each navigated page.
11. Select `Delete Account`. Verify account deletion is submitted.
12. Verify `ACCOUNT DELETED!` is visible on the confirmation screen.

## Expected Result

The authenticated session persists seamlessly across internal site navigation without session degradation or redirects to login. The user identity banner remains visible throughout the journey, and the account is deleted cleanly during teardown.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block whenever the account is authenticated.
2. Verify `ACCOUNT DELETED!` after UI deletion.
3. If UI cleanup is unavailable or fails after account creation, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
4. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
5. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, `ProductsPage`, `CartPage`, `ContactUsPage`, and `AccountPage`.
- Seed the account using Playwright's `request` API context via `POST /api/createAccount` before driving the UI.
- Assert the session banner (`li:has-text("Logged in as")`) and active session links on every page transition.
- Verify that the unauthenticated `a[href="/login"]` link is detached on all routes.
- Do not reuse authenticated storage state because this test explicitly exercises the login flow and mutates account data.

## Traceability

This case implements the authenticated navigation continuity state transition test for:

> TC-IAM-04 - Login with valid credentials and verify "Logged in as <username>"