# TC-API-06 - Search Product Without the Required Parameter

`TC-API-06` is the high-level invalid-input API condition. The detailed case verifies that searching without the required `search_product` parameter is rejected and the API reports a client-side validation error via JSON `responseCode: 400`.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-06-01**](tc-api-06-01.md) | Input Validation | POST `/api/searchProduct` without `search_product` | HTTP status is `200`; JSON `responseCode` is `400`; API rejects empty or missing parameter | P1 | No |

### Technique Boundaries

- Missing search parameter belongs to `TC-API-06`.
- Valid search request belongs to `TC-API-05`.
- Login validation errors belong to `TC-API-08` and `TC-API-12`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
