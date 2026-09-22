# TC-CAT-01-02 - Add Multiple Distinct Products

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-01-02 |
| Parent Condition | TC-CAT-01 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P0 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can add multiple distinct products to the shopping cart and that all items are correctly reflected in the cart view.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Products to add: "Blue Top" and "Men Tshirt"

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Locate the first product, hover, and select `Add to cart`.
3. Select `Continue Shopping` in the success modal.
4. Locate the second product, hover, and select `Add to cart`.
5. Select `View Cart` in the success modal.
6. Verify the cart contains both products.

## Expected Result

The cart view displays both distinct items with their respective names and prices.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Use `ProductsPage` to locate multiple items.
- Ensure the success modal is handled by clicking `Continue Shopping` for the first item.

## Traceability

This case implements the multiple distinct products test for:

> TC-CAT-01 - Add Products To Cart
