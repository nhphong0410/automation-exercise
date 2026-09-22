# TC-API-07-01 - Verify Login with Valid Credentials Returns Successful Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-07-01 |
| Parent Condition | TC-API-07 |
| Smoke Test | Yes |
| Design Technique | Authentication |
| Area | Area 6 - Backend REST API Services |
| Priority | P0 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `POST /api/verifyLogin` accepts valid account credentials and returns a successful JSON `responseCode: 200` payload.

## Preconditions

1. The SUT is available.
2. A valid test account exists with known credentials.
3. The API request can be made without UI interaction.

## Test Data

- Endpoint: `POST /api/verifyLogin`
- Parameters: valid email and password
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `200`

## Test Steps And Expected Results

1. Send a `POST` request to `/api/verifyLogin` with valid email and password.
2. Capture the HTTP status and JSON body.
3. Assert HTTP status is `200`.
4. Assert JSON `responseCode` is `200`.
5. Validate the response indicates successful authentication.

## Expected Result

The valid credentials are accepted and the login verification endpoint returns the success contract expected by the application.

## Cleanup And Failure Handling

1. No mutation is expected for a pure login verification call.
2. If the response is not `200` or does not include the expected success payload, capture the response body for debugging.

## Automation Notes

- Assert both network-level and application-level success codes separately.
- Significantly, the platform often returns HTTP 200 even when the JSON contract indicates a validation issue, so the API-level assertion is essential.

## Traceability

This case implements the successful login verification API flow for:

> TC-API-07 - Login with valid credentials
