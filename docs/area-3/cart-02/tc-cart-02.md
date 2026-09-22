# TC-CRT-02 - Add Product with Custom Quantity from PDP

`TC-CRT-02` is the high-level test condition. The detailed case below verifies adjusting the quantity input on the Product Detail Page (PDP) before adding the item to the cart, ensuring the cart correctly reflects the custom quantity.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CRT-02-01**](tc-crt-02-01.md) | Equivalence Partitioning / BVA | Set custom quantity (>1, e.g., `3`) on PDP and add to cart | Cart displays the product with the exact custom quantity (`3`) and correct line subtotal | P0 | No |
| [**TC-CRT-02-02**](tc-crt-02-02.md) | Boundary Value Analysis / Negative | Set quantity to `0` on PDP and attempt to add to cart | User cannot add product with quantity = 0 (submission blocked or input corrected to minimum valid quantity) | P2 | No |

### Technique Boundaries

- Adding products with custom quantity from PDP belongs to `TC-CRT-02`.
- Adding products with default quantity `1` from the listing page belongs to `TC-CRT-01`.
- Cart price and subtotal calculations belong to `TC-CRT-03`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
