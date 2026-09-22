# TC-CAT-02-04 - Persistence Post-Removal

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-02-04 |
| Parent Condition | TC-CAT-02 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P2 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that removing an item from the shopping cart and performing a hard page reload does not cause the removed item to reappear.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. At least one product is added to the shopping cart.

## Test Data

- Product to add and remove: First product in the product listing.

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product to the cart and navigate to `https://automationexercise.com/view_cart`.
3. Verify the product is present in the cart table.
4. Click the delete button (`a.cart_quantity_delete`) to remove the item.
5. Verify the product row is removed from the cart list.
6. Perform a hard page reload (`page.reload()`).
7. Verify the removed product does not reappear in the cart.

## Expected Result

The cart state accurately reflects the item removal persistently across page reloads.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Use `page.reload()` to simulate the browser reload.
- Assert that the cart remains empty or without the removed item.

## Traceability

This case implements the post-removal persistence test for:

> TC-CAT-02 - Remove Products From Cart
