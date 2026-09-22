# TC-API-10-01 - Delete Existing Account and Verify Successful Teardown Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-10-01 |
| Parent Condition | TC-API-10 |
| Smoke Test | Yes |
| Design Technique | Teardown / Account Lifecycle |
| Area | Area 6 - Backend REST API Services |
| Priority | P0 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `DELETE /api/deleteAccount` successfully removes an existing user account and returns the expected success payload.

## Preconditions

1. The SUT is available.
2. A valid account exists and is known to the test.
3. The API request can be made to the delete endpoint.

## Test Data

- Endpoint: `DELETE /api/deleteAccount`
- Parameters: valid account email or user identifier
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `200`

## Test Steps And Expected Results

1. Send a `DELETE` request to `/api/deleteAccount` for an existing account.
2. Capture the response HTTP status and JSON payload.
3. Assert HTTP status is `200`.
4. Assert JSON `responseCode` is `200`.
5. Verify that the response indicates user deletion succeeded.

## Expected Result

The account is removed from the system and the API returns the success contract expected during test lifecycle cleanup.

## Cleanup And Failure Handling

1. If the account is already deleted, treat the response as a safe idempotent teardown result.
2. If the response does not indicate success, log the exact payload and account identifier for debugging.

## Automation Notes

- Use this action in a teardown hook to ensure user state remains isolated between tests.
- This endpoint is a key lifecycle utility and should be treated as idempotent-safe in test automation.

## Traceability

This case implements the API teardown validation for:

> TC-API-10 - Delete existing user account (Teardown)
