# TC-CAT-06 - Filter Products by Brand

`TC-CAT-06` is the high-level test condition. The detailed case below verifies filtering products by selecting a specific brand from the brands sidebar, ensuring the catalog view updates correctly and displays only matching branded items.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CAT-06-01**](tc-cat-06-01.md) | Equivalence Partitioning | Brand selection (e.g., Polo) from the sidebar menu | Catalog filters to display only Polo items and updates the header to `BRAND - POLO PRODUCTS` | P1 | No |

### Technique Boundaries

- Brand filtering strictly covers sidebar-driven brand navigation.
- Category and subcategory filtering belongs to `TC-CAT-05`.
- Search keyword filtering belongs to `TC-CAT-03` and `TC-CAT-04`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
