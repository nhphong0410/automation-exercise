# TC-IAM-06-07 - Full Lifecycle Re-authentication

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-06-07 |
| Parent Condition | TC-IAM-06 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / State Transition |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify the integrity of the full authentication lifecycle (Login -> Logout -> Re-login) to ensure session tokens are cleared and re-initialized correctly without stale state issues.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA ReAuth User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Verify successful authentication (`Logged in as ...`).
4. Select `Logout` from the navbar.
5. Verify redirection to `/login` and unauthenticated UI state.
6. Perform UI login again with the same seeded credentials.
7. Verify successful re-authentication (`Logged in as ...` is displayed).

## Expected Result

The system completes the authentication cycle cleanly, allowing re-login without stale session tokens, cookie lockups, or caching errors.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Ensure the login flow is modular enough to be called twice in the same test sequence.
- Verify the header state carefully at each transition step (login, logout, re-login).

## Traceability

This case implements the full re-authentication test for:

> TC-IAM-06 - Logout Flow And Restricted-Page Access Verification
