# TC-CRT-04 - Remove Item from Cart and Recalculate Totals

`TC-CRT-04` is the high-level test condition. The detailed case below verifies that removing an item from the cart causes the corresponding row to disappear from the DOM and that the remaining totals are recalculated correctly.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CRT-04-01**](tc-crt-04-01.md) | State Transition / Calculation | Remove one of multiple items from cart | Removed product row disappears from the cart table and the remaining item totals/subtotal are re-evaluated correctly | P1 | No |

### Technique Boundaries

- Removing a single item while other products remain belongs to `TC-CRT-04`.
- Removing the final remaining item and verifying the empty-cart state belongs to `TC-CRT-07`.
- Cart arithmetic validation before and after removal belongs to `TC-CRT-03`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
