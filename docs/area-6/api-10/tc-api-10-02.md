# TC-API-10-02 - Deleting a Non-Existent Account Should Be Treated as Safe Cleanup, Not a Hard Failure

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

Verify that deleting a non-existent or already-removed account is handled as a safe cleanup condition rather than as an unexpected system failure.

## Preconditions

1. The SUT is available.
2. The account is known to be absent or already deleted.
3. The delete endpoint is reachable.

## Test Data

- Endpoint: `DELETE /api/deleteAccount`
- Account identifier: non-existent email or already-removed account
- Expected behavior: safe idempotent cleanup or contract-level no-op handling

## Test Steps And Expected Results

1. Send a `DELETE` request for an account that no longer exists.
2. Capture the HTTP status and JSON payload.
3. Verify the result is handled as a safe cleanup condition without failing the suite unexpectedly.
4. Ensure the response is interpreted consistently as a no-op or not-found cleanup state.

## Expected Result

The API does not block the teardown flow simply because the account is already absent; it handles the request defensively and keeps the cleanup process deterministic.

## Cleanup And Failure Handling

1. No additional teardown is needed.
2. If the endpoint returns a misleading success or an unstable payload, capture the raw response for debugging.

## Automation Notes

- Treat this as a safe idempotent cleanup case to avoid flaky teardown logic.
- This is a negative test case for deletion lifecycle robustness, not a lost-account regression.

## Traceability

This case implements the negative teardown validation for:

> TC-API-10 - Delete existing user account (Teardown)
