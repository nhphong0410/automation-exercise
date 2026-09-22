# TC-UTL-04-01 - Subscribe to Cart Footer Newsletter and Verify Success Alert

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-UTL-04-01 |
| Parent Condition | TC-UTL-04 |
| Smoke Test | No |
| Design Technique | AJAX Validation / UI Interaction |
| Area | Area 5 - Interactive Utilities & Communication |
| Priority | P2 |
| Test Type | Functional / AJAX |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a valid email can be submitted from the cart page newsletter input and that the AJAX success alert appears after the subscription request completes.

## Preconditions

1. The SUT is available.
2. A product is already present in the cart or the cart page is accessible.
3. The newsletter input in the cart footer is visible.

## Test Data

- Email: valid and unique test email value

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/view_cart`.
2. Locate the newsletter field in the cart page footer.
3. Enter a valid email address.
4. Click the submit button for the cart newsletter form.
5. Wait for the AJAX success response.
6. Verify that the success notification appears.

## Expected Result

The cart footer subscription accepts the valid email address and the user receives a success alert confirming the subscription.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the message remains visible or blocks future interactions, reset the browser context for isolation.
3. Note any delay or missing alert issue if the AJAX completion is not detected as expected.

## Automation Notes

- Use a unique email per run to avoid duplicate-subscription noise.
- Confirm the alert message after the request settles rather than immediately after the click.
- Keep the assertions scoped to the cart footer UI to avoid cross-page confusion.

## Traceability

This case implements the cart-page newsletter verification for:

> TC-UTL-04 - Subscribe to Newsletter in Cart page footer
