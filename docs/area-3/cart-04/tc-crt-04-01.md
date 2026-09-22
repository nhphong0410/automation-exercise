# TC-CRT-04-01 - Remove One Item from a Multi-Item Cart and Verify Recalculation

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-04-01 |
| Parent Condition | TC-CRT-04 |
| Smoke Test | No |
| Design Technique | State Transition / Calculation |
| Area | Area 3 - Shopping Cart Management |
| Priority | P1 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when a user removes one product from a cart containing multiple products, the selected product row is removed from the DOM and the remaining totals are recalculated accurately.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. The cart contains at least two distinct products before the action is taken.

## Test Data

- Product A: first product from the catalog, quantity `1`
- Product B: second product from the catalog, quantity `1`
- Cart state before removal: both products are present and their totals are visible

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add Product A to the cart.
3. Add Product B to the cart.
4. Navigate to `https://automationexercise.com/view_cart`.
5. Record the cart rows currently displayed and the subtotal/total values before removal.
6. Click the `X`/delete control associated with Product A in the cart table.
7. Observe the cart after the item removal action.
8. Verify that Product A no longer appears in the cart table.
9. Verify that Product B is still present and unchanged.
10. Verify that the cart subtotal and total values are recalculated to reflect the remaining product only.

## Expected Result

The selected product row is removed from the cart and the remaining cart total updates correctly to exclude the removed item. No stale row or stale subtotal remains visible.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the cart still contains items after the test, clear the cart through the available UI action or close the browser context to avoid contamination.

## Automation Notes

- Identify each row by product name or cart item identity and assert it is no longer present after removal.
- Re-read the cart summary values after the delete action to avoid stale assertions.
- Prefer checking the visible rows within `#cart_info_table tbody tr` and recalculated totals in the summary area.

## Traceability

This case implements cart-removal validation for:

> TC-CRT-04 - Remove item from cart and verify DOM removal and cart recalculation
