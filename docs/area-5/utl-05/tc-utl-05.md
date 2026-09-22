# TC-UTL-05 - Verify Scroll Up via Bottom-Right Arrow Button

`TC-UTL-05` is the high-level scroll utility condition. The detailed case below verifies that the bottom-right scroll-up control returns the page to the top of the viewport when clicked.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-UTL-05-01**](tc-utl-05-01.md) | UI Behavior / Scroll Interaction | Click the bottom-right "Scroll Up" button after vertical page movement | Page scrolls back to the top and the header is re-established as the visible top anchor | P2 | No |

### Technique Boundaries

- Scroll-up via arrow button belongs to `TC-UTL-05`.
- Scroll-up without arrow and header visibility belongs to `TC-UTL-06`.
- Newsletter and Contact Us interactions are covered by `TC-UTL-01` through `TC-UTL-04`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
