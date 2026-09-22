# TC-CAT-04-03 - Subtotal And Total Price Calculation

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-04-03 |
| Parent Condition | TC-CAT-04 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P1 |
| Test Type | Functional / Calculation |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when multiple items with various quantities are present in the shopping cart, each row's subtotal and the overall cart calculations are accurate.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. Multiple distinct products with different quantities are added to the cart.

## Test Data

- Product 1: "Blue Top" (Quantity: 2)
- Product 2: "Men Tshirt" (Quantity: 1)

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add Product 1 with quantity 2 to the cart.
3. Add Product 2 with quantity 1 to the cart.
4. Navigate to `https://automationexercise.com/view_cart`.
5. Verify that for each product row, the Total price equals `Unit Price * Quantity`.
6. Verify that all line item subtotals are displayed correctly.

## Expected Result

All row subtotals and item pricing calculations match expected mathematical values.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Extract price text and quantity values, parse them, and assert arithmetic accuracy.

## Traceability

This case implements the subtotal and total calculation test for:

> TC-CAT-04 - Cart Quantity Updates And Price Calculations
