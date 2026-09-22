# TC-UTL-04 - Subscribe to Newsletter in Cart Page Footer

`TC-UTL-04` is the high-level cart-page newsletter condition. The detailed case below verifies that the newsletter banner in the cart footer accepts a valid email and shows the expected AJAX success alert.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-UTL-04-01**](tc-utl-04-01.md) | AJAX Validation / UI Interaction | Subscribe to cart footer newsletter with a valid email | Cart-page subscription is accepted and the success message is visible | P2 | No |

### Technique Boundaries

- Cart footer newsletter subscription belongs to `TC-UTL-04`.
- Home page newsletter subscription belongs to `TC-UTL-03`.
- Contact Us behaviors belong to `TC-UTL-01` and `TC-UTL-02`.
- Scroll interactions belong to `TC-UTL-05` and `TC-UTL-06`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
