# TC-UTL-02 - Handle Browser Dialog on Contact Us Submit

`TC-UTL-02` is the high-level dialog-handling condition. The detailed case below verifies that users can handle the JavaScript confirmation dialog shown when the Contact Us form is submitted and continue through the expected success flow.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-UTL-02-01**](tc-utl-02-01.md) | Dialog Handling / State Transition | Accept the `window.confirm` prompt and submit the form | Confirmation dialog is accepted, form submission proceeds, and the success outcome is shown | P1 | No |

### Technique Boundaries

- Browser dialog acceptance on Contact Us submit belongs to `TC-UTL-02`.
- Valid Contact Us form submission without dialog handling belongs to `TC-UTL-01`.
- Newsletter and scroll behaviors belong to `TC-UTL-03` through `TC-UTL-06`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
