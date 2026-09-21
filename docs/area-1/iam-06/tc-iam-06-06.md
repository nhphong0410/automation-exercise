# TC-IAM-06-06 - Multi-tab Session Invalidation

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-06-06 |
| Parent Condition | TC-IAM-06 |
| Smoke Test | No |
| Design Technique | Concurrency / State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Concurrency |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that logging out in one browser tab effectively invalidates the session for other open tabs within the same browser context upon refresh.

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
2. Perform UI login with the seeded credentials.
3. Open a second page (`Tab 2`) in the same browser context.
4. Verify `Tab 2` displays the authenticated header (`Logged in as ...`).
5. Return to `Tab 1` and select `Logout` from the navbar.
6. Return to `Tab 2` and refresh the page (`page.reload()`).
7. Verify `Tab 2` now displays the unauthenticated state (`Signup / Login` is present, `Logout` is absent).

## Expected Result

Logout in one tab correctly propagates session revocation to other open tabs upon page refresh.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use `context.newPage()` to open a second tab.
- Use `page.reload()` to refresh the state in the secondary tab.
- Assert authenticated status in the second tab before and after the logout in the first tab.

## Traceability

This case implements the multi-tab session test for:

> TC-IAM-06 - Logout Flow And Restricted-Page Access Verification
