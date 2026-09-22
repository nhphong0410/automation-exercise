# TC-API-05-01 - Search Product with Valid Keyword and Validate Matching Results

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-05-01 |
| Parent Condition | TC-API-05 |
| Smoke Test | Yes |
| Design Technique | Input Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P0 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `POST /api/searchProduct` with a valid `search_product` parameter returns successful results and a JSON payload indicating a successful search.

## Preconditions

1. The SUT is available.
2. The search endpoint is reachable.
3. A known valid product keyword is available for search, such as a product name fragment.

## Test Data

- Endpoint: `POST /api/searchProduct`
- Parameter: `search_product=<valid keyword>`
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `200`

## Test Steps And Expected Results

1. Send a `POST` request to `/api/searchProduct` with a valid search keyword.
2. Capture the HTTP status and JSON body.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` is `200`.
5. Validate the response body contains matching product results and the expected structure.

## Expected Result

The API accepts a valid search token and returns matching product data with a successful application-level response code.

## Cleanup And Failure Handling

1. No teardown is required because this call is read-only.
2. If the search returns no results when the keyword should match, record the exact request data and endpoint response for debugging.

## Automation Notes

- Use a known keyword that is likely to match a real catalog product.
- Check both the HTTP and JSON `responseCode` values, not just one of them.

## Traceability

This case implements the valid-product search validation for:

> TC-API-05 - Search products with valid `search_product` parameter
