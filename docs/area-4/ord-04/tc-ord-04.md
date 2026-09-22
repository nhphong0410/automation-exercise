# TC-ORD-04 - Verify Delivery Address and Billing Address Match User Registration Data

`TC-ORD-04` is the high-level checkout data-integrity condition. The detailed case below verifies that the address data presented in the checkout review reflects the user registration details consistently for both delivery and billing.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-ORD-04-01**](tc-ord-04-01.md) | Data Integrity / UI Validation | Compare delivery and billing address values to registration data | Checkout displays the same consistent address details for the authenticated customer | P0 | No |

### Technique Boundaries

- Address matching verification belongs to `TC-ORD-04`.
- Payment input and order submission belong to `TC-ORD-06` and `TC-ORD-07`.
- Order comment entry belongs to `TC-ORD-05`.
- E2E registration and login flows belong to `TC-ORD-01` through `TC-ORD-03`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
