# TC-API-08 - Verify Login Without Email Parameter

`TC-API-08` is the high-level invalid-authentication API condition. The detailed case verifies that a login request missing the required email field is rejected with JSON `responseCode: 400`.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-08-01**](tc-api-08-01.md) | Input Validation | POST `/api/verifyLogin` without `email` | HTTP status is `200`; JSON `responseCode` is `400`; API rejects the missing required field | P1 | No |

### Technique Boundaries

- Missing email field belongs to `TC-API-08`.
- Valid login belongs to `TC-API-07`.
- Invalid credentials belong to `TC-API-12`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
