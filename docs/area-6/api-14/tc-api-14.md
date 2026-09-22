# TC-API-14 - Update an Existing User Account

`TC-API-14` is the high-level account-update API condition. The detailed case verifies that an authenticated or otherwise valid update request to `/api/updateAccount` succeeds and returns the expected JSON success response.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-API-14-01**](tc-api-14-01.md) | Account Update | PUT `/api/updateAccount` with valid account information | HTTP status is `200`; JSON `responseCode` is `200`; account record is updated successfully | P1 | No |
| [**TC-API-14-02**](tc-api-14-02.md) | Account Update / Negative | PUT `/api/updateAccount` with missing-field, malformed-identifier, and unknown-account variants | Missing/malformed variants return HTTP `200` + JSON `responseCode: 400`; unknown-account variant returns HTTP `200` + JSON `responseCode: 404`; no account mutation occurs | P2 | No |

### Technique Boundaries

- Account update belongs to `TC-API-14`.
- Account creation and deletion are covered by `TC-API-09` and `TC-API-10`.
- User lookup by email belongs to `TC-API-11`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
