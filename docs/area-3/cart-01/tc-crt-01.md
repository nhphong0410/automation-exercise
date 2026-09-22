# TC-CRT-01 - Add Products to Cart from Listing Page

`TC-CRT-01` is the high-level test condition. The detailed cases below decompose it using Equivalence Partitioning (EP) and Boundary Value Analysis (BVA) to cover single product additions, multiple distinct product additions, modal action choices, and bulk/upper boundary cart additions.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CRT-01-01**](tc-crt-01-01.md) | Equivalence Partitioning | Add a single product to cart from product listing page | Success modal appears, and navigating to `/view_cart` displays the correct item with quantity `1` | P0 | Yes |
| [**TC-CRT-01-02**](tc-crt-01-02.md) | Equivalence Partitioning | Add multiple distinct products sequentially from listing page | Success modal appears for each, and `/view_cart` displays all added items with correct quantities | P1 | No |
| [**TC-CRT-01-03**](tc-crt-01-03.md) | State Transition | Modal interaction choice: Click `"View Cart"` in success modal | Navigates directly from product listing to `/view_cart` successfully | P1 | No |
| [**TC-CRT-01-04**](tc-crt-01-04.md) | State Transition | Modal interaction choice: Click `"Continue Shopping"` in success modal | Closes the modal and maintains current page state, allowing additional cart additions | P1 | No |

### Technique Boundaries

- Adding products from the listing page via modal belongs to `TC-CRT-01`.
- Adding products with custom quantities (>1) from the Product Detail Page (PDP) belongs to `TC-CRT-02`.
- Cart price and subtotal calculations belong to `TC-CRT-03`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
