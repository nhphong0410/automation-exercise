# TC-API-04 - Attempt PUT to Brands List Endpoint

`TC-API-04` is the high-level unsupported-method API condition. The detailed case verifies that a `PUT` request to the brands list endpoint is rejected and reported as HTTP 200 with JSON `responseCode: 405`.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-04-01**](tc-api-04-01.md) | Method Validation | PUT to `/api/brandsList` | HTTP response is `200`; JSON `responseCode` is `405`; server rejects the unsupported verb without altering brand data | P2 | No |

### Technique Boundaries

- Unsupported method on `/api/brandsList` belongs to `TC-API-04`.
- Valid brand retrieval belongs to `TC-API-03`.
- Unsupported methods on other endpoints belong to `TC-API-02` and `TC-API-13`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
