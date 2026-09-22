# TC-ORD-06 - Enter Payment Details and Submit

`TC-ORD-06` is the high-level payment test condition. The detailed case below verifies that a user can fill the card form with valid payment details, submit the order, and advance successfully through the checkout finalization flow.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-ORD-06-01**](tc-ord-06-01.md) | Functional / Data Entry | Submit valid payment details using the checkout form | Order proceeds to confirmation and no validation error blocks completion | P0 | Yes |

### Technique Boundaries

- Payment form entry belongs to `TC-ORD-06`.
- Order comments belong to `TC-ORD-05`.
- Address validation belongs to `TC-ORD-04`.
- Order success-state confirmation belongs to `TC-ORD-07`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
