# TC-API-07-02 - Invalid Password or Unknown Email Should Fail Login Verification

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-07-02 |
| Parent Condition | TC-API-07 |
| Smoke Test | No |
| Design Technique | Authentication / Negative |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that an invalid password or unknown email does not create a valid session and instead returns the expected failed-authentication response.

## Preconditions

1. The SUT is available.
2. The login verification endpoint is reachable.
3. Invalid credentials are known and intentionally incorrect.

## Test Data

- Endpoint: `POST /api/verifyLogin`
- Values: unknown email or wrong password
- Expected result: failed authentication response code, no login session created

## Test Steps And Expected Results

1. Send a `POST` request to `/api/verifyLogin` with an unknown email or incorrect password.
2. Capture the response body and status.
3. Assert the response signals failed authentication instead of a successful login.
4. Confirm no session or success state is created.

## Expected Result

The invalid login attempt fails cleanly and is reported as an authentication failure rather than as a successful account verification.

## Cleanup And Failure Handling

1. No state mutation is expected from an incorrect login attempt.
2. If the endpoint behaves as a success case, capture the payload and treat the response as a contract violation.

## Automation Notes

- This is the API-level negative companion to the successful login contract.
- Always assert the JSON response code rather than assuming HTTP 200 means acceptance.

## Traceability

This case implements the negative authentication validation for:

> TC-API-07 - Login with valid credentials
