# TC-ORD-05 - Enter Order Comments in Checkout Review Step

`TC-ORD-05` is the high-level checkout data-entry condition. The detailed case below verifies that a user can add comments during the review step and that the comment is retained in the order workflow until final payment submission.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-ORD-05-01**](tc-ord-05-01.md) | Data Entry / Form Validation | Add order comment during checkout review | Comment is accepted and remains associated with the order flow without breaking checkout submission | P2 | No |

### Technique Boundaries

- Checkout review comment entry belongs to `TC-ORD-05`.
- Address validation belongs to `TC-ORD-04`.
- Payment and final submission belong to `TC-ORD-06` and `TC-ORD-07`.
- E2E login and registration flows belong to `TC-ORD-01` through `TC-ORD-03`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
