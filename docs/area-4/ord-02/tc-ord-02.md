# TC-ORD-02 - E2E: Register Before Checkout Flow

`TC-ORD-02` is the high-level checkout test condition. The detailed case below verifies the end-to-end flow in which a guest creates an account before proceeding to checkout and then completes the purchase without interruption.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-ORD-02-01**](tc-ord-02-01.md) | End-to-End Flow | Register before checkout and complete order | User account is created, checkout proceeds correctly, and the order is placed successfully | P0 | Yes |

### Technique Boundaries

- Registering before checkout belongs to `TC-ORD-02`.
- Registering during checkout belongs to `TC-ORD-01`.
- Logging in before checkout belongs to `TC-ORD-03`.
- Address/purchase validation belongs to `TC-ORD-04` through `TC-ORD-08`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
