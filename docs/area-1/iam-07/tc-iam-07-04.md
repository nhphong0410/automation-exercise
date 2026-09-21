# TC-IAM-07-04 - Backend API State Verification

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-07-04 |
| Parent Condition | TC-IAM-07 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / API |
| Automation Level | UI + API hybrid |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that after an account is deleted via the UI, the account record is completely removed from the data store by querying the backend API.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. An active user account is pre-registered in the SUT (seeded via `POST /api/createAccount`).
4. User is authenticated via the UI (`/login`).
5. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a dedicated data set for the test user using the current UTC timestamp and Playwright worker index.

- Name: `QA APIPurge User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Perform UI login with the seeded credentials.
3. Select `Delete Account` from the navbar and complete the deletion flow.
4. Use the Playwright `request` fixture to send a `POST` request to `/api/verifyLogin` with the email and password of the deleted account.
5. Verify the API response status is `200` and the response body contains `responseCode: 404` and `message: "User not found!"`.

## Expected Result

The backend API confirms that the user account does not exist, proving the account was completely purged from the data store following the UI deletion.

## Cleanup And Failure Handling

1. An `afterEach` hook calling `DELETE /api/deleteAccount` should receive a `404` (Account not found).
2. The teardown handler must safely accept both `200` (if UI deletion failed) and `404` (if UI deletion succeeded) without throwing errors.
3. Close the isolated browser context after the test.

## Automation Notes

- Use the Playwright `request` fixture for API verification.
- Ensure the API verifyLogin endpoint is used correctly.

## Traceability

This case implements the backend API state verification test for:

> TC-IAM-07 - Delete Account Via UI
