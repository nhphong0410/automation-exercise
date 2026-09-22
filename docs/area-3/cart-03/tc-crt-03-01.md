# TC-CRT-03-01 - Validate Mathematical Accuracy for Multiple Products with Various Quantities

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-03-01 |
| Parent Condition | TC-CRT-03 |
| Smoke Test | No |
| Design Technique | Calculation / Equivalence Partitioning |
| Area | Area 3 - Shopping Cart Management |
| Priority | P0 |
| Test Type | Functional / Calculation |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when multiple distinct products are added with various quantities, every individual row's total equals its `Unit Price * Quantity`, and the aggregate cart subtotal matches the sum of all row totals.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Product 1: Quantity `2`
- Product 2: Quantity `3`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add Product 1 with quantity `2` (via PDP).
3. Add Product 2 with quantity `3` (via PDP).
4. Navigate to `https://automationexercise.com/view_cart`.
5. For each product row, verify that `Item Total === Unit Price * Quantity`.
6. Verify that the cart subtotal/total equals the sum of all row item totals.

## Expected Result

All cart rows accurately calculate and display row totals corresponding to their respective unit prices and quantities, and the cart subtotal/total matches the sum of those row totals.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Iterate over table rows (`#cart_info_table tbody tr`) to extract unit price, quantity, and total.

## Traceability

This case implements multi-product calculation validation for:

> TC-CRT-03 - Validate mathematical accuracy: Unit Price * Quantity = Item Total
