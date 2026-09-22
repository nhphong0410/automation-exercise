# TC-CAT-02-02 - Multi-Item Partial Removal From Cart

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-02-02 |
| Parent Condition | TC-CAT-02 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when multiple distinct products are added to the shopping cart, removing only one item successfully deletes that specific item while leaving the other item intact in the cart.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. Two distinct products are added to the shopping cart.

## Test Data

- Products to add: "Blue Top" and "Men Tshirt"
- Product to remove: "Blue Top"

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add the first product ("Blue Top") to the cart, click `Continue Shopping`.
3. Add the second product ("Men Tshirt") to the cart, click `View Cart`.
4. Verify both products are present in the cart table (`https://automationexercise.com/view_cart`).
5. Click the delete button (`a.cart_quantity_delete`) for the first product ("Blue Top").
6. Verify the first product row is removed from the cart list.
7. Verify the second product ("Men Tshirt") remains visible and intact in the cart.

## Expected Result

Partial removal deletes only the targeted product while leaving all other cart contents unaffected.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target specific table rows when deleting to ensure the correct item is removed.
- Assert visibility of the remaining item.

## Traceability

This case implements the multi-item partial removal test for:

> TC-CAT-02 - Remove Products From Cart
