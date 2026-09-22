# TC-ORD-01-01 - Register During Checkout and Complete Purchase

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-01-01 |
| Parent Condition | TC-ORD-01 |
| Smoke Test | Yes |
| Design Technique | End-to-End Flow |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P0 |
| Test Type | End-to-End / Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a guest can add a product to the cart, initiate checkout, register a new account during the purchase flow, and successfully complete the order without interruptions.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh browser context.
3. The catalog contains at least one available product.
4. The user does not already have an account with the generated email.

## Test Data

- Product: first available product from the catalog
- New user account: dynamic email and password generated for the test
- Billing details: valid first name, last name, address, city, zip, mobile number
- Payment details: valid test card values accepted by the checkout UI

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add the first visible product to the cart.
3. Navigate to `https://automationexercise.com/view_cart`.
4. Click `Proceed To Checkout`.
5. On the checkout page, verify that the guest checkout prompt is presented.
6. Click `Register / Login` or the equivalent account entry action to begin account creation.
7. Fill the signup form with valid user data and submit.
8. Verify the account creation confirmation and the user is redirected to the account or checkout flow as expected.
9. Complete the address and checkout review steps if the site requires the user to confirm or edit details.
10. Enter valid payment details (card name, number, CVC, expiration) and submit the order.
11. Verify the order confirmation page renders the success message `ORDER PLACED!`.
12. Verify the user can continue to the main account area or remains on the final confirmation page without a checkout block.

## Expected Result

The checkout journey succeeds when the user registers during checkout, and the order is placed successfully with a clear completion confirmation shown to the user.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. Delete the created test account through the API or UI if the account remains in the system.
3. If the flow fails before payment submission, record the exact step where the checkout or account creation breaks for debugging.

## Automation Notes

- Use a dynamically generated email and password to avoid account collisions.
- Prefer robust selectors for checkout prompts, signup fields, and the final success message.
- Check both the URL and text of the order-confirmation state to avoid false positives.

## Traceability

This case implements the register-during-checkout end-to-end flow for:

> TC-ORD-01 - E2E: Register while checkout flow
