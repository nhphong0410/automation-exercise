# TC-CAT-02-01 - Baseline Single Item Removal From Cart

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-02-01 |
| Parent Condition | TC-CAT-02 |
| Smoke Test | Yes |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P0 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that an added product can be successfully removed from the shopping cart by clicking the item delete button (`X`), resulting in immediate removal from the cart view.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. At least one product is added to the shopping cart.

## Test Data

- Product to add and remove: First product in the product listing.

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product to the cart and proceed to `https://automationexercise.com/view_cart`.
3. Verify the product is present in the cart table.
4. Click the delete button (`a.cart_quantity_delete`) for the product.
5. Verify the product row is removed from the cart list.

## Expected Result

The item is successfully deleted from the cart, and the table updates immediately to reflect the removal.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Use locator `a.cart_quantity_delete` to target the item removal action.
- Assert that the product row is no longer visible in the table.

## Traceability

This case implements the baseline item removal test for:

> TC-CAT-02 - Remove Products From Cart
