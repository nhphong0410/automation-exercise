# TC-IAM-08-04 - Cross-context Boundary Isolation

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-08-04 |
| Parent Condition | TC-IAM-08 |
| Smoke Test | No |
| Design Technique | Security / Context Isolation |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Security |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a separate browser context (`browser.newContext()`) is completely isolated and does not inherit authenticated cookies from the original context.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context (`Context 1`).
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`) in `Context 1`.
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA ContextIso User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials in `Context 1`.
3. Create a second, completely separate browser context (`browser.newContext()`) as `Context 2`.
4. Open a new page in `Context 2` and navigate to `https://automationexercise.com/`.
5. Verify `Context 2` displays the unauthenticated header (`Signup / Login` is present, `Logout` is absent).

## Expected Result

The authenticated session state is not leaked to a new browser context, maintaining strict security isolation between browser instances.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` with the generated email and password in an `afterEach` hook.
3. Assert the fallback response returns HTTP `200` with JSON `responseCode` in `[200, 404]`.
4. Close the isolated browser contexts after the test.

## Automation Notes

- Use `browser.newContext()` to create the isolated second context.
- Verify that `Context 2` is in the guest state (unauthenticated).

## Traceability

This case implements the cross-context isolation test for:

> TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen
