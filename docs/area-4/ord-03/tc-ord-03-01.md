# TC-ORD-03-01 - Login Before Checkout and Complete Purchase

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-03-01 |
| Parent Condition | TC-ORD-03 |
| Smoke Test | Yes |
| Design Technique | End-to-End Flow |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P0 |
| Test Type | End-to-End / Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user who is already authenticated can log in before checkout, complete a purchase, and see the confirmation page after submitting valid payment details.

## Preconditions

1. The SUT is available.
2. A valid user account exists with known credentials.
3. The test starts with a fresh browser context.
4. The catalog contains at least one product.

## Test Data

- Product: first available product in the catalog
- Existing user account: valid email and password
- Delivery and billing details stored in the user profile
- Valid payment data for checkout submission

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/login`.
2. Log in with a valid existing account.
3. Verify the account indicator displays `Logged in as <username>`.
4. Navigate to the catalog and add a product to the cart.
5. Open the cart and click `Proceed To Checkout`.
6. Verify that the checkout page opens for the authenticated user.
7. Confirm the address details displayed in checkout match the known profile or customer data.
8. Complete order review and continue to payment.
9. Fill in the valid payment details and submit.
10. Verify the order success page with `ORDER PLACED!` is displayed.
11. Confirm the flow ended successfully without a login or validation interruption.

## Expected Result

The authenticated user can proceed directly through checkout and complete the purchase with a successful order confirmation.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the user account is a temporary test account, delete it if appropriate.
3. If the login or checkout step fails, capture the exact transition state for debugging.

## Automation Notes

- Confirm the visible auth indicator before proceeding to checkout.
- Validate the final order success message instead of relying only on the payment form submission.
- Keep login credentials separate from browser storage to avoid cross-test session leakage.

## Traceability

This case implements the login-before-checkout end-to-end flow for:

> TC-ORD-03 - E2E: Login before checkout flow
