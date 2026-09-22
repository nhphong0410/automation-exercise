# TC-API-01-01 - Fetch Products List and Validate Response Schema

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-01-01 |
| Parent Condition | TC-API-01 |
| Smoke Test | Yes |
| Design Technique | Schema Validation |
| Area | Area 6 - Backend REST API Services |
| Priority | P0 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `GET /api/productsList` returns a successful HTTP response and a valid product payload structure containing expected product fields.

## Preconditions

1. The SUT is available.
2. A valid API base URL is configured for the environment.
3. The request can be issued without authentication.

## Test Data

- Endpoint: `GET /api/productsList`
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `200`

## Test Steps And Expected Results

1. Send a `GET` request to `/api/productsList`.
2. Capture the HTTP status and full JSON response.
3. Assert the HTTP status is `200`.
4. Assert the JSON `responseCode` is `200`.
5. Assert the response contains a top-level `products` array.
6. Assert the `products` array is non-empty.
7. Assert at least one product object includes `id` (number), `name` (string), and `price` (string).

## Expected Result

The products endpoint responds successfully and returns a non-empty `products` array where product entries include `id` (number), `name` (string), and `price` (string).

## Cleanup And Failure Handling

1. No state teardown is required for a read-only GET request.
2. If the response structure is invalid or fields are missing, capture the payload for debugging and update the schema validation accordingly.

## Automation Notes

- Assert both HTTP status and JSON `responseCode` separately as required by the SUT contract.
- Validate only the fields expected by the schema and avoid brittle assumptions about unrelated properties.
- Use response assertions for both transport success and application-level success.

## Traceability

This case implements the successful products-list API validation for:

> TC-API-01 - Fetch all products, validate JSON schema
