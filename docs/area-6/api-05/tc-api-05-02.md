# TC-API-05-02 - Empty or Special-Character Search Input Should Fail Validation or Return a Negative Search Result

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

Verify that an empty, whitespace-only, or special-character-only search value is handled as a negative search case rather than as a successful product-search operation.

## Preconditions

1. The SUT is available.
2. The search endpoint is reachable.
3. The test can send an empty or invalid `search_product` value.

## Test Data

- Endpoint: `POST /api/searchProduct`
- Parameter values: empty string, whitespace-only string, or special-character-only string
- Expected behavior: validation failure or explicit negative search result

## Test Steps And Expected Results

1. Send a `POST` request to `/api/searchProduct` with an empty or invalid search value.
2. Capture the HTTP and JSON responses.
3. Assert that the result is treated as a negative search or validation failure.
4. Verify the API does not accept the invalid input as a valid product search.

## Expected Result

The API handles invalid search input safely and does not falsely report a successful search when the keyword is empty or unusable.

## Cleanup And Failure Handling

1. No state mutation is expected.
2. If the endpoint accepts the invalid input unexpectedly, capture the raw payload and fail the contract check accordingly.

## Automation Notes

- Keep the input invalid but deterministic so the negative result is repeatable.
- Validate the negative contract precisely instead of equating all non-200 codes with success.

## Traceability

This case implements the negative search-input validation for:

> TC-API-05 - Search products with valid `search_product` parameter
