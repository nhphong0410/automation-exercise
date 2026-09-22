# TC-API-11-02 - Non-Existent or Malformed Email Should Reject User Lookup

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

Verify that querying `/api/getUserDetailByEmail` with a non-existent or malformed email returns a contract-level failure instead of incorrectly returning user data.

## Preconditions

1. The SUT is available.
2. The user lookup endpoint is reachable.
3. A non-existent or malformed email value is prepared.

## Test Data

- Endpoint: `GET /api/getUserDetailByEmail`
- Values: unknown email or invalid email format
- Expected result: lookup failure and no false-positive user record returned

## Test Steps And Expected Results

1. Send a request to `/api/getUserDetailByEmail` with a non-existent or malformed email.
2. Capture the response payload and status.
3. Assert the lookup is rejected rather than treated as a valid user retrieval.
4. Confirm no user record is returned for the invalid input.

## Expected Result

The API handles invalid lookup values as a failed data retrieval and does not return misleading user details.

## Cleanup And Failure Handling

1. No state mutation is expected.
2. Store the response body if the endpoint incorrectly returns a user record or success metadata.

## Automation Notes

- Use a deterministic non-existent or malformed email value so the negative result is repeatable.
- Fail the test if the endpoint returns a user payload when no valid record exists.

## Traceability

This case implements the negative user-detail lookup validation for:

> TC-API-11 - GET /api/getUserDetailByEmail
