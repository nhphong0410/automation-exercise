# TC-API-13-01 - DELETE on VerifyLogin Endpoint and Verify Unsupported Method Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-13-01 |
| Parent Condition | TC-API-13 |
| Smoke Test | No |
| Design Technique | Method Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P2 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that sending a `DELETE` request to `/api/verifyLogin` is rejected and returns the expected JSON `responseCode: 405` contract result.

## Preconditions

1. The SUT is available.
2. The endpoint is reachable.
3. A `DELETE` request can be issued to the API without UI interaction.

## Test Data

- Endpoint: `DELETE /api/verifyLogin`
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `405`

## Test Steps And Expected Results

1. Send a `DELETE` request to `/api/verifyLogin`.
2. Capture the HTTP status and response body.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` equals `405`.
5. Confirm that the endpoint rejects the unsupported method cleanly.

## Expected Result

The API rejects the unsupported `DELETE` method and reports the application-level unsupported operation through the JSON response code.

## Cleanup And Failure Handling

1. No account state should change from this request.
2. If the response differs from `405`, capture the full payload and request details for debugging.

## Automation Notes

- This is another SUT contract case where transport success (`HTTP 200`) is not the same as a successful operation.
- Keep the method mismatch explicit so the negative validation is deterministic.

## Traceability

This case implements the unsupported DELETE path for:

> TC-API-13 - Attempt to delete login verification with unsupported method
