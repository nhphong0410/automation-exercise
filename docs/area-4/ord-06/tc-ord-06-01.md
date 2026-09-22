# TC-ORD-06-01 - Submit Valid Payment Details and Continue Order Placement

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-06-01 |
| Parent Condition | TC-ORD-06 |
| Smoke Test | Yes |
| Design Technique | Functional / Data Entry |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P0 |
| Test Type | Functional / Payment |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can enter valid payment information into the checkout form and successfully submit the final order without validation errors or order termination.

## Preconditions

1. The SUT is available.
2. The user is authenticated or has created an account and is in the checkout step.
3. A product is present in the cart.
4. The address and order review steps are already resolved or available.

## Test Data

- Product in cart: first available product
- Card name: valid test name
- Card number: valid format for test environment
- CVC: valid numeric value
- Expiration: valid future month/year

## Test Steps And Expected Results

1. Log in or complete account setup before checkout.
2. Add a product to the cart and proceed to checkout.
3. Confirm the cart and address review steps are complete.
4. Enter valid payment details into the payment form fields.
5. Click the payment submission action.
6. Verify the page transitions away from the payment form without displaying validation errors.
7. Confirm the confirmation / success page is rendered.
8. Verify the order has been successfully placed as indicated by the final UI state.

## Expected Result

The valid payment input is accepted, the order is submitted successfully, and the system proceeds to the confirmation screen without blocking on card data validation.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. Remove the created test account or generated order if the environment requires cleanup.
3. If the form rejects submission, capture the invalid field state for debugging and prevent cross-test contamination.

## Automation Notes

- Use real-looking payment values that match the form format, not placeholder values.
- Assert that validation errors are absent before moving to the final confirmation page.
- Confirm the UI lands on the success state rather than relying only on the absence of errors.

## Traceability

This case implements the payment-entry validation for:

> TC-ORD-06 - Enter payment details (Name, Card Number, CVC, Expiration) and submit
