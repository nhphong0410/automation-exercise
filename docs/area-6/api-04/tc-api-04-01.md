# TC-API-04-01 - PUT to Brands List and Verify Unsupported Method Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-04-01 |
| Parent Condition | TC-API-04 |
| Smoke Test | No |
| Design Technique | Method Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P2 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that sending a `PUT` request to `/api/brandsList` is rejected and returns the expected JSON `responseCode: 405` contract result.

## Preconditions

1. The SUT is available.
2. The endpoint is reachable.
3. The request can send a `PUT` without authentication.

## Test Data

- Endpoint: `PUT /api/brandsList`
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `405`

## Test Steps And Expected Results

1. Send a `PUT` request to `/api/brandsList`.
2. Capture the HTTP status and JSON payload.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` equals `405`.
5. Confirm the response indicates the method is unsupported and not successful.

## Expected Result

The brands endpoint rejects the unsupported `PUT` method and reports the app-level rejection in the JSON response.

## Cleanup And Failure Handling

1. No mutation is expected, so no teardown is required.
2. If the response code does not match `405`, record the exact payload for debugging.

## Automation Notes

- This endpoint is another example of the platform’s HTTP-200 plus JSON-response-code contract.
- Keep the method-validation assertion precise to avoid false positives from normal HTTP transport success.

## Traceability

This case implements the unsupported PUT validation for:

> TC-API-04 - Attempt PUT to brands list
