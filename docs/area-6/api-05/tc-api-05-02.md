# TC-API-05-02 - Invalid Search Inputs Should Return Deterministic Negative Contracts

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-05-02 |
| Parent Condition | TC-API-05 |
| Smoke Test | No |
| Design Technique | Input Validation / Negative |
| Area | Area 6 - Backend REST API Services |
| Priority | P2 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify deterministic negative contracts for invalid `search_product` inputs: empty string, whitespace-only string, and special-character-only string.

## Preconditions

1. The SUT is available.
2. The search endpoint is reachable.
3. The test can send controlled invalid `search_product` values.

## Test Data

- Endpoint: `POST /api/searchProduct`
- Variant A input: empty string (`""`) → Expected HTTP `200`, JSON `responseCode: 400`
- Variant B input: whitespace-only string (`"   "`) → Expected HTTP `200`, JSON `responseCode: 400`
- Variant C input: special-character-only string (`"@@@"`) → Expected HTTP `200`, JSON `responseCode: 200`, `products` is an empty array

## Test Steps And Expected Results

1. Execute Variant A by sending `POST /api/searchProduct` with `search_product=""`; assert HTTP `200` and JSON `responseCode: 400`.
2. Execute Variant B by sending `POST /api/searchProduct` with `search_product="   "`; assert HTTP `200` and JSON `responseCode: 400`.
3. Execute Variant C by sending `POST /api/searchProduct` with `search_product="@@@"`; assert HTTP `200`, JSON `responseCode: 200`, and `products.length === 0`.
4. Capture the full JSON response for each variant and fail if any variant returns a success contract inconsistent with its expected outcome.

## Expected Result

Each invalid-input variant returns its documented deterministic negative contract, and none of the variants produce a false-positive successful product match.

## Cleanup And Failure Handling

1. No state mutation is expected.
2. If the endpoint accepts the invalid input unexpectedly, capture the raw payload and fail the contract check accordingly.

## Automation Notes

- Keep each variant isolated and asserted independently to avoid mixed-oracle outcomes.
- Assert both HTTP status and JSON/body contracts per variant.

## Traceability

This case implements the negative search-input validation for:

> TC-API-05 - Search products with valid `search_product` parameter
