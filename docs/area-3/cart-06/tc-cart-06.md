# TC-CRT-06 - Verify Cart Modal Actions and Navigation

`TC-CRT-06` is the high-level test condition. The detailed case below verifies that the success modal shown after adding a product provides the correct navigation actions and preserves the expected user flow for a cart interaction.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CRT-06-01**](tc-crt-06-01.md) | State Transition / UI Flow | Click `View Cart` in the add-to-cart success modal | Browser navigates directly to `/view_cart` and the added item is present | P1 | No |
| [**TC-CRT-06-02**](tc-crt-06-02.md) | State Transition / UI Flow | Click `Continue Shopping` in the add-to-cart success modal | Modal closes and user remains on the current catalog page while cart state is preserved | P1 | No |

### Technique Boundaries

- Cart modal actions after adding a product belong to `TC-CRT-06`.
- Adding products from the listing page belongs to `TC-CRT-01`.
- Quantity and cart math behavior belong to `TC-CRT-02` and `TC-CRT-03`.
- Removal and empty-cart state belong to `TC-CRT-04` and `TC-CRT-07`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
