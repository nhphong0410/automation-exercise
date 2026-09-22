# TC-API-03 - Fetch All Brands and Validate Array Size

`TC-API-03` is the high-level brand-list API condition. The detailed case verifies that the brands endpoint responds successfully and returns a structured array payload containing expected brand entries.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-03-01**](tc-api-03-01.md) | Schema Validation | GET all brands from `/api/brandsList` | HTTP status is `200`; JSON `responseCode` is `200`; payload returns a non-empty brands array with expected structure | P1 | No |

### Technique Boundaries

- Successful brand retrieval belongs to `TC-API-03`.
- Unsupported method on brand list belongs to `TC-API-04`.
- Product data retrieval belongs to `TC-API-01`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
