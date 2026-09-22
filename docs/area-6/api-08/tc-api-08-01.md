# TC-API-08-01 - Verify Login Without Email Parameter Returns Validation Error

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-08-01 |
| Parent Condition | TC-API-08 |
| Smoke Test | No |
| Design Technique | Input Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `POST /api/verifyLogin` rejects a request missing the required `email` field and reports the validation problem via JSON `responseCode: 400`.

## Preconditions

1. The SUT is available.
2. The login verification endpoint is reachable.
3. The test request intentionally omits the email value.

## Test Data

- Endpoint: `POST /api/verifyLogin`
- Parameters: password provided, email missing
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `400`

## Test Steps And Expected Results

1. Send a `POST` request to `/api/verifyLogin` without the `email` parameter.
2. Capture the HTTP and JSON responses.
3. Assert HTTP status is `200`.
4. Assert JSON `responseCode` is `400`.
5. Confirm the API rejects the request as invalid due to missing required input.

## Expected Result

The API indicates the required `email` parameter is missing and rejects the request using the expected JSON validation contract.

## Cleanup And Failure Handling

1. No mutation is expected because the request is not a successful login.
2. If the response differs from `responseCode: 400`, log the exact payload and request details for debugging.

## Automation Notes

- This is a classic case where HTTP 200 must not be treated as a successful request; the JSON body indicates the actual business result.
- Keep the request parameter omission explicit so the validation path is deterministic.

## Traceability

This case implements the missing-email validation for:

> TC-API-08 - Login without email parameter
