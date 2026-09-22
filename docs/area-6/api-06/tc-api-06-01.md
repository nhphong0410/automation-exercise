# TC-API-06-01 - Search Product Without Parameter and Verify Validation Failure

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-06-01 |
| Parent Condition | TC-API-06 |
| Smoke Test | No |
| Design Technique | Input Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `POST /api/searchProduct` without a required `search_product` parameter is rejected and returns the expected JSON `responseCode: 400` response.

## Preconditions

1. The SUT is available.
2. The search endpoint is reachable.
3. The request can omit the `search_product` parameter intentionally.

## Test Data

- Endpoint: `POST /api/searchProduct`
- Parameter: none / missing `search_product`
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `400`

## Test Steps And Expected Results

1. Send a `POST` request to `/api/searchProduct` without `search_product`.
2. Capture the HTTP status and JSON payload.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` is `400`.
5. Verify the server rejects the request as invalid input.

## Expected Result

The API reports the missing parameter as a validation error through the JSON contract and does not treat the request as a valid search.

## Cleanup And Failure Handling

1. No teardown is needed because the request is read-only.
2. If the endpoint returns `200` with a non-400 payload, record the response body for debugging and contract validation.

## Automation Notes

- The SUT often returns HTTP 200 even on validation failures, so the JSON `responseCode` must be asserted explicitly.
- Keep the request intentionally parameterless to exercise the missing-field path.

## Traceability

This case implements the missing-parameter validation for:

> TC-API-06 - Search without search_product parameter
