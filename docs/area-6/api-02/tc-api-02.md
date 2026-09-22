# TC-API-02 - Attempt POST to Products List Endpoint

`TC-API-02` is the high-level API error-handling condition. The detailed case verifies that performing an unsupported HTTP method on the products list endpoint is rejected by the SUT and reported as an HTTP 200 + JSON `responseCode: 405` combination.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-02-01**](tc-api-02-01.md) | Method Validation | POST to `/api/productsList` | HTTP response is `200`; JSON `responseCode` is `405`; server rejects the unsupported method without changing product data | P1 | No |

### Technique Boundaries

- Unsupported method on `/api/productsList` belongs to `TC-API-02`.
- Valid product list retrieval belongs to `TC-API-01`.
- Unsupported method on brand list belongs to `TC-API-04`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
