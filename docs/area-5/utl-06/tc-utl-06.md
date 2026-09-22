# TC-UTL-06 - Verify Scroll Up Without Arrow and Header Visibility

`TC-UTL-06` is the high-level scroll utility condition. The detailed case below verifies that the user can trigger a page return to the top without using the arrow control and that the header remains visible after the scroll completes.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-UTL-06-01**](tc-utl-06-01.md) | UI Behavior / Scroll Interaction | Scroll to bottom without the arrow button and observe header visibility | Page returns to the top or relevant anchor state, and the header becomes visible again without the special arrow control | P2 | No |

### Technique Boundaries

- Scroll-up without arrow button belongs to `TC-UTL-06`.
- Scroll-up via bottom-right arrow belongs to `TC-UTL-05`.
- Newsletter and Contact Us submission behaviors belong to `TC-UTL-01` through `TC-UTL-04`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
