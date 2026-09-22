# TC-CAT-07 - Submit Product Review

`TC-CAT-07` is the high-level test condition. The detailed cases below decompose it using Equivalence Partitioning (EP) and Boundary Value Analysis (BVA) to cover positive review submissions, negative input validations, and length/character boundaries on the Product Detail Page (PDP).

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CAT-07-01**](tc-cat-07-01.md) | Equivalence Partitioning | Valid standard review submission (Name, valid email, descriptive review text) | Submission succeeds and displays the `"Thank you for your review."` confirmation | P2 | No |
| [**TC-CAT-07-02**](tc-cat-07-02.md) | Negative / EP | Blank mandatory review fields (Name, email, or review text left empty) | Form validation blocks submission or browser HTML5 constraint validation prevents request dispatch | P2 | No |
| [**TC-CAT-07-03**](tc-cat-07-03.md) | Negative / EP | Malformed email syntax in the review email field (e.g., missing `@` or domain) | Form submission is rejected or client-side email validation prevents completion | P2 | No |

### Technique Boundaries

- Product review tests apply exclusively to the review form on the Product Detail Page (PDP).
- Adding items to the cart from the PDP belongs to `TC-CRT-02`.
- General search and catalog filters belong to `TC-CAT-03` and `TC-CAT-05`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
