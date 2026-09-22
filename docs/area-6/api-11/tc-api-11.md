# TC-API-11 - Get User Detail by Email

`TC-API-11` is the high-level account-query API condition. The detailed case verifies that retrieving a user record by email succeeds and returns the expected user detail payload.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-11-01**](tc-api-11-01.md) | Data Retrieval | GET `/api/getUserDetailByEmail` with a known email | HTTP status is `200`; JSON `responseCode` is `200`; payload contains the matching user record | P1 | No |
| [**TC-API-11-02**](tc-api-11-02.md) | Data Retrieval / Negative | GET `/api/getUserDetailByEmail` with unknown-email and malformed-email variants | Unknown email returns HTTP `200` + JSON `responseCode: 404`; malformed email returns HTTP `200` + JSON `responseCode: 400`; no user record is returned | P2 | No |

### Technique Boundaries

- User lookup by email belongs to `TC-API-11`.
- Account creation and deletion are `TC-API-09` and `TC-API-10`.
- Login verification is `TC-API-07`, `TC-API-08`, and `TC-API-12`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
