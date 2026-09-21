# TC-IAM-07-05 - Post-Deletion Credential Recycling

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-07-05 |
| Parent Condition | TC-IAM-07 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can register a new account using the email address of a previously deleted account, confirming that the database unique constraint is correctly released.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA Recycle User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Select `Delete Account` from the navbar and complete the deletion flow.
4. Navigate to `https://automationexercise.com/login`.
5. Enter the exact same name and email used for the deleted account.
6. Select `Signup`.
7. Verify that the registration flow advances to the account information page (`/signup`).

## Expected Result

The registration system successfully allows account creation with the recycled email address, confirming that the deleted account was completely removed from the database's unique index.

## Cleanup And Failure Handling

1. Since a new account is created, the `finally` block or `afterEach` hook must delete this new account using the same email and password.
2. The teardown handler must safely handle account deletion.
3. Close the isolated browser context after the test.

## Automation Notes

- Ensure the registration flow proceeds without error after clicking `Signup`.

## Traceability

This case implements the credential recycling test for:

> TC-IAM-07 - Delete Account Via UI
