# TC-API-02-01 - POST to Products List and Verify Unsupported Method Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-02-01 |
| Parent Condition | TC-API-02 |
| Smoke Test | No |
| Design Technique | Method Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that sending an unsupported HTTP method to `/api/productsList` is rejected by the application and returns the expected JSON `responseCode: 405` behavior.

## Preconditions

1. The SUT is available.
2. The endpoint is reachable.
3. The request context can send a `POST` without extra authentication.

## Test Data

- Endpoint: `POST /api/productsList`
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `405`

## Test Steps And Expected Results

1. Send a `POST` request to `/api/productsList`.
2. Capture the HTTP status and response body.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` equals `405`.
5. Confirm the response indicates an unsupported operation rather than success.

## Expected Result

The endpoint rejects the unsupported method and the response contract reflects the application-level operation denial with `responseCode: 405`.

## Cleanup And Failure Handling

1. No teardown is needed because the operation is read-only and non-mutating.
2. If the response code differs from `405`, capture the full payload and endpoint details for investigation.

## Automation Notes

- Validate both HTTP and JSON-level responses separately, because the SUT commonly returns HTTP `200` while reporting method denial in JSON.
- Keep the assertion strict to `responseCode: 405` to match the known contract.

## Traceability

This case implements the unsupported POST validation for:

> TC-API-02 - Attempt POST to read-only products list
