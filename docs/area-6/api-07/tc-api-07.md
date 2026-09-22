# TC-API-07 - Verify Login with Valid Credentials

`TC-API-07` is the high-level successful authentication API condition. The detailed case verifies that a valid login request returns a successful JSON payload with `responseCode: 200` and confirms the credentials are accepted.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-07-01**](tc-api-07-01.md) | Authentication | POST `/api/verifyLogin` with valid account credentials | HTTP status is `200`; JSON `responseCode` is `200`; login is accepted and the API returns the expected success payload | P0 | Yes |
| [**TC-API-07-02**](tc-api-07-02.md) | Authentication / Negative | POST `/api/verifyLogin` with an invalid password or unknown email | HTTP status remains `200`; JSON `responseCode` indicates failed authentication and no session is created | P1 | No |

### Technique Boundaries

- Successful login belongs to `TC-API-07`.
- Missing email parameter belongs to `TC-API-08`.
- Invalid credential login belongs to `TC-API-12`.
- Account creation belongs to `TC-API-09`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
