# TC-CAT-04-02 - Cart Quantity Decrease And Line Total Adjustment

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-04-02 |
| Parent Condition | TC-CAT-04 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P2 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that decreasing a product's quantity in the shopping cart correctly updates the quantity display and recalculates the line item total.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. A product with a quantity greater than 1 is added to the shopping cart.

## Test Data

- Product: First product in the listing.
- Initial Quantity: `3`
- Decremented Quantity: `2`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product with quantity `3` to the cart and navigate to `https://automationexercise.com/view_cart`.
3. Verify the initial quantity is `3` and note the calculated total price.
4. Adjust or decrement the quantity to `2`.
5. Verify the cart quantity updates to `2`.
6. Verify that the line item total equals `Unit Price * 2`.

## Expected Result

Decreasing the quantity accurately updates the quantity indicator and correctly adjusts the line item total amount.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Verify quantity adjustments and recalculations against the table elements.

## Traceability

This case implements the quantity decrease and calculation test for:

> TC-CAT-04 - Cart Quantity Updates And Price Calculations
