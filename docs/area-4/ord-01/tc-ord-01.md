# TC-ORD-01 - E2E: Register While Checkout Flow

`TC-ORD-01` is the high-level checkout test condition. The detailed case below verifies the end-to-end flow in which a guest adds a product, begins checkout, registers during the purchase journey, and successfully completes the transaction.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-ORD-01-01**](tc-ord-01-01.md) | End-to-End Flow | Register during checkout with a valid new account | User can create an account at checkout, complete payment, and land on the order success screen | P0 | Yes |

### Technique Boundaries

- Registering during checkout belongs to `TC-ORD-01`.
- Registering before checkout belongs to `TC-ORD-02`.
- Logging in before checkout belongs to `TC-ORD-03`.
- Address validation, payment details, and order-state assertions belong to `TC-ORD-04` through `TC-ORD-08`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
