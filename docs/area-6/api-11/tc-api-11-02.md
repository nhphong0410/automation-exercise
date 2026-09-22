# TC-API-11-02 - Unknown and Malformed Email Inputs Should Reject User Lookup

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-11-02 |
| Parent Condition | TC-API-11 |
| Smoke Test | No |
| Design Technique | Data Retrieval / Negative |
| Area | Area 6 - Backend REST API Services |
| Priority | P2 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify deterministic rejection contracts for two separate lookup variants: unknown email and malformed email format.

## Preconditions

1. The SUT is available.
2. The user lookup endpoint is reachable.
3. Non-existent and malformed email test values are prepared.

## Test Data

- Endpoint: `GET /api/getUserDetailByEmail`
- Variant A (unknown email): value is syntactically valid but not registered → Expected HTTP `200`, JSON `responseCode: 404`
- Variant B (malformed email): value is syntactically invalid email format → Expected HTTP `200`, JSON `responseCode: 400`

## Test Steps And Expected Results

1. Execute Variant A by sending `GET /api/getUserDetailByEmail` with a non-existent but valid-format email; assert HTTP `200` and JSON `responseCode: 404`.
2. Execute Variant B by sending `GET /api/getUserDetailByEmail` with a malformed email value; assert HTTP `200` and JSON `responseCode: 400`.
3. For both variants, confirm no user record is returned.
4. Capture the full payload for each variant if the contract differs from the expected response code.

## Expected Result

Both variants are rejected with deterministic response codes, and no false-positive user details are returned.

## Cleanup And Failure Handling

1. No state mutation is expected.
2. Store the response body if the endpoint incorrectly returns a user record or success metadata.

## Automation Notes

- Use a deterministic non-existent or malformed email value so the negative result is repeatable.
- Fail the test if the endpoint returns a user payload when no valid record exists.

## Traceability

This case implements the negative user-detail lookup validation for:

> TC-API-11 - GET /api/getUserDetailByEmail
