# TC-API-11-01 - Get User Details by Email and Validate Stored Profile

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-11-01 |
| Parent Condition | TC-API-11 |
| Smoke Test | No |
| Design Technique | Data Retrieval |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `GET /api/getUserDetailByEmail` returns the stored user data for a known email and matches the expected account profile structure.

## Preconditions

1. The SUT is available.
2. An account exists with a known email in the system.
3. The request can query the endpoint without additional authentication requirements.

## Test Data

- Endpoint: `GET /api/getUserDetailByEmail`
- Query parameter: known existing email
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `200`

## Test Steps And Expected Results

1. Send a `GET` request to `/api/getUserDetailByEmail` using a known email.
2. Capture the HTTP status and JSON payload.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` is `200`.
5. Validate the response contains the expected user profile details corresponding to the account.

## Expected Result

The API returns the user record associated with the supplied email and the payload is valid and consistent with the stored account data.

## Cleanup And Failure Handling

1. No teardown is required for read-only retrieval.
2. If the user record is not found or the payload is malformed, record the exact request and response details for investigation.

## Automation Notes

- Assert both the HTTP response and the JSON `responseCode` values for correct contract validation.
- Prefer known seeded data values for deterministic checks.

## Traceability

This case implements the user-detail lookup validation for:

> TC-API-11 - GET /api/getUserDetailByEmail
