# TC-CRT-07 - Verify Empty Cart State Message When All Items Are Removed

`TC-CRT-07` is the high-level test condition. The detailed case below verifies the boundary state that occurs when the last remaining product is removed from the cart and the application transitions to the empty-cart view.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CRT-07-01**](tc-crt-07-01.md) | Boundary Value Analysis | Remove the final remaining product from the cart | Cart displays the empty-cart message and a link back to the products page, with no stale item rows remaining | P2 | No |

### Technique Boundaries

- Removing the final remaining item from the cart belongs to `TC-CRT-07`.
- Removing one item from a multi-item cart belongs to `TC-CRT-04`.
- Cart modal navigation behaviors belong to `TC-CRT-06`.
- Product addition, quantity, and subtotal validations belong to `TC-CRT-01`, `TC-CRT-02`, and `TC-CRT-03`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
