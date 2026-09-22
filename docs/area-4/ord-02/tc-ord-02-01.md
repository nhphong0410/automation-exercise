# TC-ORD-02-01 - Register Before Checkout and Complete Purchase

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-02-01 |
| Parent Condition | TC-ORD-02 |
| Smoke Test | Yes |
| Design Technique | End-to-End Flow |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P0 |
| Test Type | End-to-End / Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can register before checkout, proceed through the cart and checkout flow, and complete an order successfully without any registration-related interruptions.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh browser context.
3. The user has not already created the generated account.
4. The catalog contains at least one product.

## Test Data

- Product: first available product in the catalog
- New account credentials and profile data generated for the test
- Delivery and billing address details
- Valid payment card values for checkout submission

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/`.
2. Open the signup page and create a new user account with valid data.
3. Verify the account is created successfully and the user is logged in.
4. Navigate to the products catalog and add one item to the cart.
5. Navigate to `https://automationexercise.com/view_cart`.
6. Click `Proceed To Checkout`.
7. Verify the checkout page loads for the authenticated user.
8. Confirm the delivery and billing address details match the account profile or the checkout form values.
9. Enter any order comments if applicable and continue to payment.
10. Fill the payment form with valid card details and submit.
11. Verify the success message `ORDER PLACED!` appears.
12. Confirm the order confirmation page is rendered without broken flows or validation errors.

## Expected Result

The user completes registration before checkout and the full purchase process succeeds with the order confirmation displayed at the end of the journey.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. Delete the created account using the API or teardown hooks after completion.
3. Capture the step where the user flow stops if checkout fails before order placement.

## Automation Notes

- Ensure account creation is fully complete before adding products to the cart.
- Assert the user is authenticated before beginning checkout.
- Validate both the payment form success and the final confirmation message.

## Traceability

This case implements the register-before-checkout end-to-end flow for:

> TC-ORD-02 - E2E: Register before checkout flow
