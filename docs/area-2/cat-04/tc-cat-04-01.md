# TC-CAT-04-01 - Cart Quantity Increase And Line Total Calculation

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-04-01 |
| Parent Condition | TC-CAT-04 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that increasing a product's quantity directly in the cart or via product details correctly updates the quantity display and recalculates the item subtotal.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. At least one product is added to the shopping cart.

## Test Data

- Product: First product in the listing.
- Target Quantity: `3`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product to the cart and navigate to `https://automationexercise.com/view_cart`.
3. Verify the initial quantity is `1` and note the unit price and total price.
4. Update the quantity (either via cart interface if supported, or by re-adding with quantity adjustment).
5. Verify the cart quantity updates to `3`.
6. Verify that the line item total equals `Unit Price * 3`.

## Expected Result

Increasing the quantity accurately updates the quantity indicator and correctly calculates the line item total amount.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Verify calculation logic against displayed table values in the cart view.

## Traceability

This case implements the quantity increase and calculation test for:

> TC-CAT-04 - Cart Quantity Updates And Price Calculations
