# TC-API-12-01 - Verify Login Fails with Invalid Email or Password

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-12-01 |
| Parent Condition | TC-API-12 |
| Smoke Test | No |
| Design Technique | Authentication Failure |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `POST /api/verifyLogin` with an invalid email or password is rejected and returns the expected JSON `responseCode: 404` contract result.

## Preconditions

1. The SUT is available.
2. The endpoint is reachable.
3. Invalid credentials are prepared intentionally for the test.

## Test Data

- Endpoint: `POST /api/verifyLogin`
- Parameters: invalid email and/or password
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `404`

## Test Steps And Expected Results

1. Send a `POST` request to `/api/verifyLogin` with invalid credentials.
2. Capture the HTTP status and response body.
3. Assert HTTP status is `200`.
4. Assert JSON `responseCode` is `404`.
5. Confirm the API rejects the invalid login attempt.

## Expected Result

The authentication endpoint rejects the invalid credentials and reports the failure through the expected JSON contract.

## Cleanup And Failure Handling

1. No teardown is required because no account state is changed.
2. If the response differs from `404`, record the exact payload and request details for debugging.

## Automation Notes

- This is another example where HTTP `200` is not a successful business result; the JSON response must be asserted separately.
- Test both invalid email and invalid password scenarios if the suite later expands beyond the primary contract.

## Traceability

This case implements the invalid-credentials API validation for:

> TC-API-12 - Login with invalid email or password
