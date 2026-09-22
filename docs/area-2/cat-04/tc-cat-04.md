# TC-CAT-04 - Cart Quantity Updates And Price Calculations

`TC-CAT-04` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case verifies item quantity adjustments, pricing accuracy, subtotal calculations, and total amount consistency within the shopping cart (`/view_cart`).

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CAT-04-01**](tc-cat-04-01.md) | Boundary Value Analysis | Quantity increase: Increment item quantity in the cart table or update via input | Quantity updates correctly, and line item total reflects `Price x Quantity` | P1 | No |
| [**TC-CAT-04-02**](tc-cat-04-02.md) | Boundary Value Analysis | Quantity decrease: Decrement item quantity in the cart | Quantity updates correctly, and line item total adjusts accordingly | P2 | No |
| [**TC-CAT-04-03**](tc-CAT-04-03.md) | Equivalence Partitioning | Subtotal and total price verification: Add multiple items with various quantities | Subtotals for each row and total calculations match expected arithmetic sums | P1 | No |

### Technique Boundaries

- Quantity updates and calculations strictly cover modifications made within or prior to the cart view.
- Initial product additions belong to `TC-CAT-01`.
- Product removals belong to `TC-CAT-02`.
- Checkout calculations belong to `TC-ORD-01`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
