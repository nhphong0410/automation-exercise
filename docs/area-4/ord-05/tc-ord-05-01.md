# TC-ORD-05-01 - Add Order Comment During Checkout Review

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-05-01 |
| Parent Condition | TC-ORD-05 |
| Smoke Test | No |
| Design Technique | Data Entry / Form Validation |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P2 |
| Test Type | Functional / Data Entry |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can enter an order comment in the checkout review step and continue through the order flow without the comment causing validation errors or a blocked submission.

## Preconditions

1. The SUT is available.
2. A valid user account is available and logged in.
3. A product is present in the cart for checkout.

## Test Data

- Product to purchase: first available product
- Order comment: a realistic instruction or note, such as `Please deliver before 5 PM.`

## Test Steps And Expected Results

1. Log in with a valid test account.
2. Add a product to the cart.
3. Navigate to `https://automationexercise.com/view_cart`.
4. Click `Proceed To Checkout`.
5. Locate the order comment field in the checkout review area.
6. Enter a valid test order comment.
7. Continue through the checkout flow to the payment step.
8. Verify the comment field accepts the input and does not produce an error state.
9. Complete the order using valid payment details.
10. Verify the payment and confirmation flow still completes successfully.

## Expected Result

The user can add an order comment during review without interrupting the payment or order confirmation flow, and the order completes successfully.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the account or generated order is created only for testing, perform teardown cleanup.
3. Record any input validation issue or field-level failure for future automation follow-up.

## Automation Notes

- Input the order comment into the visible review form before final submission.
- Verify that the finished checkout flow still reaches the payment and success page.
- Avoid incorrect assertions on hidden comments when the field is not visible in the checkout state.

## Traceability

This case implements the comment-entry validation for:

> TC-ORD-05 - Enter order comments in Checkout review step
