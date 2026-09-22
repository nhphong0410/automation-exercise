# TC-API-09 - Create User Account via Form-Data Payload

`TC-API-09` is the high-level account-creation API condition. The detailed case verifies that a valid `POST /api/createAccount` request creates a new user account and returns the expected JSON success response.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-09-01**](tc-api-09-01.md) | Account Creation | POST `/api/createAccount` with valid form-data | HTTP status is `200`; JSON `responseCode` is `201`; account is created and is available for follow-up login or teardown | P0 | Yes |
| [**TC-API-09-02**](tc-api-09-02.md) | Account Creation / Negative | POST `/api/createAccount` with duplicate email and missing-field variants | Both variants return HTTP `200` + JSON `responseCode: 400` with variant-specific failure messages; no account is created | P1 | No |

### Technique Boundaries

- Successful account creation belongs to `TC-API-09`.
- Duplicate email validation belongs to UI `TC-IAM-02` and the API contract path of `TC-API-09` when reused for negative scenarios.
- Account deletion belongs to `TC-API-10`.
- Login verification belongs to `TC-API-07` and `TC-API-12`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
