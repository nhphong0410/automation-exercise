# TC-CAT-05 - Filter Products by Category and Subcategory

`TC-CAT-05` is the high-level test condition. The detailed case below verifies filtering products by selecting a main category and specific subcategory, ensuring the catalog view updates correctly and renders the appropriate category title header.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CAT-05-01**](tc-cat-05-01.md) | Equivalence Partitioning | Women main category and Dress subcategory selection | Catalog filters to display only women dress items and updates header to `WOMEN - DRESS PRODUCTS` | P1 | No |

### Technique Boundaries

- Category and subcategory filtering strictly covers sidebar-driven category navigation.
- Search keyword filtering belongs to `TC-CAT-03` and `TC-CAT-04`.
- Brand filtering belongs to `TC-CAT-06`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
