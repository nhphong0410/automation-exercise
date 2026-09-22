# TC-ORD-07-01 - Verify Order Placed Success Screen After Payment Submission

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-07-01 |
| Parent Condition | TC-ORD-07 |
| Smoke Test | Yes |
| Design Technique | State Validation |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P0 |
| Test Type | Functional / Order State |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that after submitting valid payment details, the user sees the final success state indicating that the order has been placed successfully.

## Preconditions

1. The SUT is available.
2. A valid user account is available and logged in or created during checkout.
3. A product is in the cart and checkout is reached.
4. Payment details are valid and order submission is possible.

## Test Data

- Product in cart: first available product
- Valid user profile details
- Valid payment form values

## Test Steps And Expected Results

1. Log in or create an account and proceed to checkout.
2. Add a product to the cart and continue through address and payment steps.
3. Submit the payment form with valid card details.
4. Observe the resulting page after submission.
5. Verify that the page shows the `ORDER PLACED!` success message.
6. Confirm that the checkout flow exits the payment step and reaches the order-completion state.

## Expected Result

The system confirms a successful order by rendering the `ORDER PLACED!` screen without errors or incomplete state transitions.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the test account or order is temporary, perform any required cleanup or deletion.
3. Capture the final browser state if the order confirmation page fails to render.

## Automation Notes

- Use the visible confirmation text rather than only checking the URL.
- Validate that the user is on the post-payment success state, not just that the request returned a success code.
- Keep the success assertion specific to the `ORDER PLACED!` text or equivalent confirmation banner.

## Traceability

This case implements the order-success confirmation for:

> TC-ORD-07 - Verify "ORDER PLACED!" success screen rendering
