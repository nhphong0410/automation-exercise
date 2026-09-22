# TC-ORD-04-01 - Verify Delivery and Billing Address Match User Registration Data

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-04-01 |
| Parent Condition | TC-ORD-04 |
| Smoke Test | No |
| Design Technique | Data Integrity / UI Validation |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P0 |
| Test Type | Functional / Data Integrity |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that the delivery and billing information displayed in checkout matches the user registration or account data, ensuring address data integrity in the purchase flow.

## Preconditions

1. The SUT is available.
2. A valid test user account exists.
3. The test user has a known address profile that can be verified in checkout.
4. A product is available in the cart.

## Test Data

- Existing account with known profile values: first name, last name, address, city, zip, mobile number
- Product added to cart before checkout

## Test Steps And Expected Results

1. Log in using a valid test account.
2. Add a product to the cart.
3. Navigate to `https://automationexercise.com/view_cart`.
4. Click `Proceed To Checkout`.
5. Verify the checkout page loads the address details for the user.
6. Compare the displayed delivery address values against the expected registration data.
7. Compare the billing address values against the same known user data or checkout profile data.
8. Verify that both address sections are populated consistently and match the signed-in customer profile.

## Expected Result

The checkout page reflects the correct user address data consistently in both delivery and billing sections without mismatch or stale values.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If any test data is mutated during the flow, restore or delete the account as needed.
3. Log any mismatch between displayed and expected data for debugging.

## Automation Notes

- Assert against specific address fields (first name, last name, address, city, state, zip, mobile number).
- Avoid comparing only partial text; verify exact field-level values where possible.
- Keep data generation deterministic to support reliable assertions.

## Traceability

This case implements the checkout address validation for:

> TC-ORD-04 - Verify Delivery Address and Billing Address match user registration data
