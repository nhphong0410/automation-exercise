# TC-CAT-01-03 - Add Duplicate Products

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-01-03 |
| Parent Condition | TC-CAT-01 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that adding the same product multiple times to the cart correctly increments the item quantity.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Product to add: "Blue Top" (added twice)

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Locate the first product, hover, and select `Add to cart`.
3. Select `Continue Shopping` in the success modal.
4. Locate the first product again and select `Add to cart` again.
5. Select `View Cart` in the success modal.
6. Verify the cart displays the product with quantity `2`.

## Expected Result

The cart shows the product with the updated quantity of 2.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Verify quantity in the cart using the specific row quantity element.

## Traceability

This case implements the duplicate product addition test for:

> TC-CAT-01 - Add Products To Cart
