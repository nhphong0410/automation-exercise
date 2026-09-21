# TC-IAM-06-03 - Browser Back Navigation Post-Logout

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-06-03 |
| Parent Condition | TC-IAM-06 |
| Smoke Test | No |
| Design Technique | State Transition / Security |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Security |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that after a successful logout, navigating back to a previously visited authenticated page via the browser's "Back" button does not restore an authenticated session or permit access to restricted account actions.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA BackNav User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Open the SUT home page. Select `Signup / Login`.
3. Perform UI login with the seeded credentials.
4. Navigate to `/account` (or trigger an action that requires auth).
5. Verify authenticated header is present (`Logged in as ...`).
6. Select `Logout` from the navbar (`a[href="/logout"]`).
7. Verify the browser is redirected to `https://automationexercise.com/login`.
8. Click the browser's "Back" button (`page.goBack()`).
9. Verify the browser does **not** display the previous authenticated page or cached content.
10. Verify the header still displays the unauthenticated state (`Signup / Login` is present, `Logout` is absent).

## Expected Result

The authenticated session is effectively terminated, and browser-cached pages do not bypass access control checks upon "Back" navigation. The application forces the user into an unauthenticated state.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `page.goBack()` to simulate user back-navigation.
- Use `expect(page.url()).not.toContain('/account')` or similar to verify no access to protected routes.
- Assert that the header still shows the "Signup / Login" link after the back navigation attempt.

## Traceability

This case implements the post-logout back-navigation test for:

> TC-IAM-06 - Logout Flow And Restricted-Page Access Verification
