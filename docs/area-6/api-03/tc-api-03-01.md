# TC-API-03-01 - Fetch Brands List and Validate Payload Structure

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-03-01 |
| Parent Condition | TC-API-03 |
| Smoke Test | No |
| Design Technique | Schema Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `GET /api/brandsList` responds successfully and that the payload contains a valid brands array structure.

## Preconditions

1. The SUT is available.
2. The brands endpoint is reachable.
3. The request does not require authentication.

## Test Data

- Endpoint: `GET /api/brandsList`
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `200`

## Test Steps And Expected Results

1. Send a `GET` request to `/api/brandsList`.
2. Capture the HTTP response and response JSON.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` is `200`.
5. Validate the brands payload is an array with at least expected entries or a valid structure according to the API contract.

## Expected Result

The API returns the available brand list successfully and the response structure is valid for downstream UI and functional validation.

## Cleanup And Failure Handling

1. No state changes are expected from a GET request.
2. If the array is empty or malformed, record the exact response body for investigation.

## Automation Notes

- Do not treat the HTTP status alone as sufficient validation; assert the application-level JSON `responseCode` too.
- Validate the array shape and example data values instead of a generic pass/fail only.

## Traceability

This case implements the successful brands-list API validation for:

> TC-API-03 - Fetch all brands and validate array size
