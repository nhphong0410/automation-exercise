# TC-API-10-02 - Deleting a Non-Existent Account Returns a Deterministic Not-Found Contract

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-10-02 |
| Parent Condition | TC-API-10 |
| Smoke Test | No |
| Design Technique | Teardown / Negative |
| Area | Area 6 - Backend REST API Services |
| Priority | P2 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that deleting a non-existent or already-removed account returns the exact not-found API contract.

## Preconditions

1. The SUT is available.
2. The account is known to be absent or already deleted.
3. The delete endpoint is reachable.

## Test Data

- Endpoint: `DELETE /api/deleteAccount`
- Account identifier: non-existent email or already-removed account
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `404`
- Expected JSON message: not-found account deletion failure

## Test Steps And Expected Results

1. Send a `DELETE` request for an account that no longer exists.
2. Capture the HTTP status and JSON payload.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` is `404`.
5. Assert the JSON message reports not-found account deletion failure.

## Expected Result

The API returns HTTP `200` with JSON `responseCode: 404` and a not-found failure message for absent-account deletion requests.

## Cleanup And Failure Handling

1. No additional teardown is needed.
2. If the endpoint returns a misleading success or an unstable payload, capture the raw response for debugging.

## Automation Notes

- Treat this as a safe idempotent cleanup case to avoid flaky teardown logic.
- This is a negative test case for deletion lifecycle robustness, not a lost-account regression.

## Traceability

This case implements the negative teardown validation for:

> TC-API-10 - Delete existing user account (Teardown)
