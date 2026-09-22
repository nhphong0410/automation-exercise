# TC-UTL-03-01 - Subscribe to Home Page Newsletter and Verify Success Alert

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-UTL-03-01 |
| Parent Condition | TC-UTL-03 |
| Smoke Test | No |
| Design Technique | AJAX Validation / UI Interaction |
| Area | Area 5 - Interactive Utilities & Communication |
| Priority | P2 |
| Test Type | Functional / AJAX |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a valid email can be submitted through the home page newsletter form and that the AJAX success alert appears after the request is processed.

## Preconditions

1. The SUT is available.
2. The home page is loaded.
3. The newsletter input is visible in the footer.

## Test Data

- Email: valid and unique test email value

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/`.
2. Locate the newsletter subscription field in the home page footer.
3. Enter a valid email address.
4. Click the subscription button.
5. Wait for the AJAX response to complete.
6. Verify the success alert is visible and indicates a successful subscription.

## Expected Result

The newsletter form accepts the email, the AJAX request is successful, and a visible success message is displayed to the user.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the subscription remains in a visible success state after completion, reset the browser context to prevent contamination.
3. Record whether the alert failed to appear or was delayed beyond expected timing.

## Automation Notes

- Watch for the success toast or alert after the form submit rather than just checking the button state.
- Avoid hard-coding repeated email addresses across tests by using a dynamic value per run.
- Assert on the success text rather than just the form disappearance.

## Traceability

This case implements the home-page newsletter subscription flow for:

> TC-UTL-03 - Subscribe to Newsletter in Home page footer and verify AJAX success alert
