# TC-IAM-07-03 - Database Purge Verification via UI

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-07-03 |
| Parent Condition | TC-IAM-07 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P0 |
| Test Type | Functional / Security |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that after an account is deleted via the UI, the credentials are permanently removed and subsequent login attempts with the same credentials are rejected.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA PurgeVerify User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Select `Delete Account` from the navbar and complete the deletion flow.
4. Verify the account is deleted and the user is redirected to the home page.
5. Navigate to `https://automationexercise.com/login`.
6. Attempt to login using the same credentials used to delete the account.
7. Verify the login form displays the error: `Your email or password is incorrect!`.

## Expected Result

The account is purged from the system after UI deletion, and the login process correctly denies access to the now-defunct credentials.

## Cleanup And Failure Handling

1. An `afterEach` hook calling `DELETE /api/deleteAccount` should receive a `404` (Account not found).
2. The teardown handler must safely accept both `200` (if UI deletion failed) and `404` (if UI deletion succeeded) without throwing errors.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Ensure the login rejection message is explicitly asserted after the deletion step.

## Traceability

This case implements the credential purge verification test for:

> TC-IAM-07 - Delete Account Via UI
