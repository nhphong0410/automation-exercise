# TC-ORD-07 - Verify "ORDER PLACED!" Success Screen Rendering

`TC-ORD-07` is the high-level success-state condition. The detailed case below verifies that, after valid payment submission, the user sees the expected confirmation screen and order completion message.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-ORD-07-01**](tc-ord-07-01.md) | State Validation | Complete checkout with valid order data | Success page renders `ORDER PLACED!` and confirms order completion | P0 | Yes |

### Technique Boundaries

- Post-payment confirmation belongs to `TC-ORD-07`.
- Payment form submission belongs to `TC-ORD-06`.
- Address and order comments belong to `TC-ORD-04` and `TC-ORD-05`.
- Invoice download is covered separately in `TC-ORD-08`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
