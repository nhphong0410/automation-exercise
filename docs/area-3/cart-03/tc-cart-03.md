# TC-CRT-03 - Validate Mathematical Accuracy (Unit Price * Quantity = Item Total)

`TC-CRT-03` is the high-level test condition. The detailed case below verifies that the shopping cart table accurately calculates row totals and item subtotals based on the formula `Unit Price * Quantity = Item Total`.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CRT-03-01**](tc-crt-03-01.md) | Equivalence Partitioning / Calculation | Add multiple distinct products with various quantities and verify cart calculations | Each row item total equals its respective `Unit Price * Quantity`, and the aggregate total is correct | P0 | No |

### Technique Boundaries

- Mathematical accuracy calculations in the cart table belong to `TC-CRT-03`.
- Initial cart additions belong to `TC-CRT-01` and `TC-CRT-02`.
- Checkout order total calculations belong to `TC-ORD-06`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
