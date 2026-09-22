# TC-API-12 - Verify Login with Invalid Email or Password

`TC-API-12` is the high-level invalid-authentication API condition. The detailed case verifies that a login request using invalid credentials is rejected and reported through JSON `responseCode: 404`.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-12-01**](tc-api-12-01.md) | Authentication Failure | POST `/api/verifyLogin` with incorrect email or password | HTTP status is `200`; JSON `responseCode` is `404`; API rejects the invalid login attempt | P1 | No |

### Technique Boundaries

- Invalid credentials belong to `TC-API-12`.
- Valid login belongs to `TC-API-07`.
- Missing required email field belongs to `TC-API-08`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
