# TC-UTL-03 - Subscribe to Newsletter in Home Page Footer

`TC-UTL-03` is the high-level newsletter subscription condition. The detailed case below verifies that a user can subscribe from the home page footer and that the AJAX success notification is displayed.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-UTL-03-01**](tc-utl-03-01.md) | AJAX Validation / UI Interaction | Subscribe to home page newsletter with a valid email | Subscription is accepted and a success alert is displayed without page interruption | P2 | No |

### Technique Boundaries

- Home page newsletter subscription belongs to `TC-UTL-03`.
- Cart page newsletter subscription belongs to `TC-UTL-04`.
- Contact Us submission belongs to `TC-UTL-01` and `TC-UTL-02`.
- Scroll behavior belongs to `TC-UTL-05` and `TC-UTL-06`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
