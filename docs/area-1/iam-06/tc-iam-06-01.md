# TC-IAM-06-01 - Baseline Logout From Home Page

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-06-01 |
| Parent Condition | TC-IAM-06 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |
## Objective

Verify that a logged-in user can successfully initiate a logout from the Home page (`/`), resulting in immediate session termination, redirection to the login page, and restoration of unauthenticated navigation elements.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.
## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA Logout User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Open the SUT home page. Select `Signup / Login`.
3. Perform UI login with the seeded credentials.
4. Verify navigation to `/` and the header displays `Logged in as QA Logout User <timestamp>`.
5. Select `Logout` from the navbar (`a[href="/logout"]`).
6. Verify the browser is redirected to `https://automationexercise.com/login`.
7. Verify the header navbar displays `Signup / Login` (`a[href="/login"]`).
8. Verify the header navbar no longer displays `Logout`, `Logged in as ...`, or `Delete Account`.
## Expected Result

The session is terminated successfully, the user is redirected to the login page, and the application restores the unauthenticated UI state.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, and `AccountPage`.
- Ensure the `Logout` link locator `a[href="/logout"]` is used.
- Assert the redirection URL using `page.url()`.
- Use `expect` to verify the invisibility of authenticated controls and the visibility of the `"Signup / Login"` link.

## Traceability

This case implements the baseline logout flow test for:

> TC-IAM-06 - Logout Flow And Restricted-Page Access Verification

