# TC-CAT-01 - Add Products To Cart

`TC-CAT-01` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case verifies the shopping cart functionality, ensuring products are added correctly, the cart state persists, and the UI accurately reflects the items added.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CAT-01-01**](tc-cat-01-01.md) | Equivalence Partitioning | Baseline Add to Cart: Add a single product from the products listing page | Product is successfully added, confirmation modal appears, and cart count updates | P0 | Yes |
| [**TC-CAT-01-02**](tc-cat-01-02.md) | Equivalence Partitioning | Add multiple distinct products: Add multiple unique items to the cart | All products appear in the cart view with correct details and quantity | P0 | No |
| [**TC-CAT-01-03**](tc-cat-01-03.md) | Equivalence Partitioning | Add duplicate products: Add the same item multiple times | Cart displays the item with the correct incremented quantity | P1 | No |
| [**TC-CAT-01-04**](tc-cat-01-04.md) | State Transition | Add from Product Details page: Trigger "Add to cart" from the product detail view | Product is added to the cart and identified by its specific ID/Name | P1 | No |
| [**TC-CAT-01-05**](tc-cat-01-05.md) | Boundary Value Analysis | Add maximum quantity of a single product (if constrained) or high-volume additions | Cart correctly handles volume/quantity constraints | P2 | No |
| [**TC-CAT-01-06**](tc-cat-01-06.md) | State Transition | Persistence check: Add product, reload page, verify product remains in cart | Cart state persists across page refresh | P1 | No |
| [**TC-CAT-01-07**](tc-cat-01-07.md) | Equivalence Partitioning | Add products while unauthenticated: Add to cart as a guest user | Cart functionality works as expected for guests | P1 | No |

### Technique Boundaries

- Adding products focuses on the "Add to cart" functionality and cart state visibility.
- Removing items from the cart belongs to `TC-CAT-02`.
- Cart persistence across login/logout session transitions belongs to `TC-CAT-03`.
- Checkout process and final order validation belong to `TC-ORD-01`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
