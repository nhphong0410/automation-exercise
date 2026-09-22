# TC-CRT-05 - Persist Cart Contents Across Guest-to-Login Transition

`TC-CRT-05` is the high-level test condition. The detailed case below verifies that a user can add products to the cart while browsing as a guest, log in afterward, and then confirm that the cart contents are preserved across the authentication transition.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CRT-05-01**](tc-crt-05-01.md) | State Transition / Session Persistence | Guest adds items to cart, logs in, and confirms persisted cart contents | Logged-in user sees the same selected products in the cart after authentication; no cart loss occurs during session transition | P1 | No |

### Technique Boundaries

- Guest cart persistence across login belongs to `TC-CRT-05`.
- Product additions from the listing page belong to `TC-CRT-01`.
- Quantity-specific cart behavior belongs to `TC-CRT-02`.
- Cart item removal and recalculation belong to `TC-CRT-04`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
