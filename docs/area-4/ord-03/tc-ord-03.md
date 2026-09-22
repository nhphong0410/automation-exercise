# TC-ORD-03 - E2E: Login Before Checkout Flow

`TC-ORD-03` is the high-level checkout test condition. The detailed case below verifies the end-to-end flow in which a user logs in before beginning checkout, confirms the authenticated state, and completes the purchase.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-ORD-03-01**](tc-ord-03-01.md) | End-to-End Flow | Login before checkout and purchase | Authenticated user can checkout with the existing user profile and complete the order successfully | P0 | Yes |

### Technique Boundaries

- Logging in before checkout belongs to `TC-ORD-03`.
- Registration during checkout belongs to `TC-ORD-01`.
- Registration before checkout belongs to `TC-ORD-02`.
- Address and payment validations belong to `TC-ORD-04` through `TC-ORD-08`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
