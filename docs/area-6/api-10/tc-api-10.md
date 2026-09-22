# TC-API-10 - Delete Existing User Account via API

`TC-API-10` is the high-level account teardown API condition. The detailed case verifies that a valid `DELETE /api/deleteAccount` request removes an existing user account and returns the expected success payload.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-10-01**](tc-api-10-01.md) | Teardown / Account Lifecycle | DELETE `/api/deleteAccount` for an existing user | HTTP status is `200`; JSON `responseCode` is `200`; account is successfully removed from the system | P0 | Yes |
| [**TC-API-10-02**](tc-api-10-02.md) | Teardown / Negative | DELETE `/api/deleteAccount` for a non-existent or already-removed account | HTTP status is `200`; JSON `responseCode` is `404`; response message indicates account not found | P2 | No |

### Technique Boundaries

- Account deletion belongs to `TC-API-10`.
- Account creation belongs to `TC-API-09`.
- Login validation belongs to `TC-API-07` and `TC-API-12`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
