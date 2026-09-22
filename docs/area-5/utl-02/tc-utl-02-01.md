# TC-UTL-02-01 - Accept JavaScript Confirmation Dialog on Contact Us Submit

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-UTL-02-01 |
| Parent Condition | TC-UTL-02 |
| Smoke Test | No |
| Design Technique | Dialog Handling / State Transition |
| Area | Area 5 - Interactive Utilities & Communication |
| Priority | P1 |
| Test Type | Functional / Dialog Handling |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when the Contact Us form triggers a JavaScript `window.confirm` prompt, the user can accept it and the submission proceeds to the expected success outcome.

## Preconditions

1. The SUT is available.
2. The Contact Us form is open with valid field data.
3. The browser is ready to accept a native confirmation dialog.

## Test Data

- Valid name, email, subject, and message
- Optional valid attachment file

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/contact_us`.
2. Fill the Contact Us form with valid values.
3. Submit the form.
4. When the browser dialog appears, accept the confirmation prompt.
5. Observe the page after the dialog is resolved.
6. Verify the success indicator appears and the form is accepted.

## Expected Result

The confirmation dialog is successfully handled, the submission continues, and the user sees the expected success status after form completion.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the dialog is not handled properly, capture the exact timing or page state where the prompt blocked the flow.
3. Ensure the context is reset to avoid dialog state leakage into subsequent tests.

## Automation Notes

- Use Playwright’s `page.on('dialog', ...)` handling or an equivalent form of dialog acceptance.
- Test both the presence of the dialog and the success state after acceptance.
- Keep the assertion focused on the successful post-submit UI state rather than only the dialog dismissal.

## Traceability

This case implements the Contact Us dialog-handling flow for:

> TC-UTL-02 - Handle browser dialog (JavaScript `window.confirm`) on Contact Us submit
