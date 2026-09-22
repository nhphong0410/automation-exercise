# TC-API-05 - Search Product with a Valid Search Parameter

`TC-API-05` is the high-level search API condition. The detailed case verifies that the search endpoint accepts a valid `search_product` value and returns matching product results with a successful JSON `responseCode`.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-05-01**](tc-api-05-01.md) | Input Validation | POST `/api/searchProduct` with a valid keyword | HTTP status is `200`; JSON `responseCode` is `200`; payload contains matching product records | P0 | Yes |
| [**TC-API-05-02**](tc-api-05-02.md) | Input Validation / Negative | POST `/api/searchProduct` with an empty, whitespace-only, or special-character-only keyword | API returns a validation failure or zero-result contract that is handled as a negative search result instead of a successful search | P2 | No |

### Technique Boundaries

- Valid search request belongs to `TC-API-05`.
- Missing `search_product` parameter belongs to `TC-API-06`.
- Product list and brand list retrieval belong to `TC-API-01` and `TC-API-03`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
