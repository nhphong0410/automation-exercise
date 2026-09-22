# TC-CAT-02 - Remove Products From Cart

`TC-CAT-02` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case verifies the shopping cart item removal functionality, ensuring users can delete individual or multiple items, observe cart updates, and verify empty cart behavior.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CAT-02-01**](tc-cat-02-01.md) | Equivalence Partitioning | Baseline item removal: Remove a single product from the cart via the delete (`X`) button | Product is successfully removed from the cart list and the cart updates immediately | P0 | Yes |
| [**TC-CAT-02-02**](tc-CAT-02-02.md) | Equivalence Partitioning | Multi-item partial removal: Add two distinct items and remove only one | The deleted item is removed while the remaining item stays in the cart | P1 | No |
| [**TC-CAT-02-03**](tc-cat-02-03.md) | Boundary Value Analysis | Empty cart state verification: Remove the last remaining item from the cart | Cart displays the empty cart message (`"Cart is empty!"`) | P1 | No |
| [**TC-CAT-02-04**](tc-cat-02-04.md) | State Transition | Persistence post-removal: Remove an item, reload page (`page.reload()`), verify absence | Removed item does not reappear after hard page refresh | P2 | No |
| [**TC-CAT-02-05**](tc-cat-02-05.md) | Equivalence Partitioning | Guest user item removal: Add item as guest and remove it | Guest cart item removal functions identically to authenticated removal | P1 | No |

### Technique Boundaries

- Item removal validation strictly covers deleting products from the `/view_cart` page interface.
- Adding products to the cart belongs to `TC-CAT-01`.
- Cart persistence across login/logout session transitions belongs to `TC-CAT-03`.
- **Preconditions & Setup:**
  - Test accounts or guest sessions must have products pre-added to the shopping cart prior to removal actions.
- **SUT DOM Locators & Confirmations:**
  - Removal trigger: `a.cart_quantity_delete` or `[class="cart_quantity_delete"]`.
  - Empty cart message: `span#empty_cart` or text containing `"Cart is empty!"`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
