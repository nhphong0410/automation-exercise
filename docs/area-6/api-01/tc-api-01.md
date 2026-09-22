# TC-API-01 - Fetch All Products and Validate JSON Schema

`TC-API-01` is the high-level API validation condition. The detailed case verifies that the products list endpoint responds successfully and returns a schema-consistent payload structure with the expected product data fields.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-01-01**](tc-api-01-01.md) | Schema Validation | GET all products from `/api/productsList` | HTTP status is `200`; JSON `responseCode` is `200`; response payload contains product entries with required structure | P0 | Yes |

### Technique Boundaries

- `GET /api/productsList` success validation belongs to `TC-API-01`.
- Unsupported method on `/api/productsList` belongs to `TC-API-02`.
- Brand list retrieval belongs to `TC-API-03`.
- Search API validations belong to `TC-API-05` and `TC-API-06`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
