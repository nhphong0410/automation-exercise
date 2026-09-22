# TC-API-13 - Attempt Unsupported DELETE on VerifyLogin Endpoint

`TC-API-13` is the high-level method-validation API condition. The detailed case verifies that the unsupported `DELETE` method on the login verification endpoint is rejected and returns a JSON `responseCode: 405` contract result.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-13-01**](tc-api-13-01.md) | Method Validation | DELETE `/api/verifyLogin` | HTTP status is `200`; JSON `responseCode` is `405`; unsupported method is correctly rejected | P2 | No |

### Technique Boundaries

- Unsupported method on `/api/verifyLogin` belongs to `TC-API-13`.
- Supported login verification is `TC-API-07` and `TC-API-08`.
- Missing email validation belongs to `TC-API-08`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
