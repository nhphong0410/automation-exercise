# TC-CRT-07-01 - Remove the Final Cart Item and Verify Empty Cart State

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-07-01 |
| Parent Condition | TC-CRT-07 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis |
| Area | Area 3 - Shopping Cart Management |
| Priority | P2 |
| Test Type | Functional / Boundary |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when the last remaining product is removed from the cart, the UI transitions to the empty-cart state and displays the expected empty-cart message and navigation back to the products list.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. The cart is empty before the test adds its single product.

## Test Data

- Product to add: first available product in the catalog
- Cart state before removal: exactly one visible cart row exists

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Verify that the cart is initially empty by navigating to `https://automationexercise.com/view_cart` and confirming the empty-cart indicator is visible, such as text containing `"Cart is empty!"` and/or the `#empty_cart` element.
3. Return to the products page.
4. Add the first visible product to the cart.
5. Navigate to `https://automationexercise.com/view_cart`.
6. Confirm that the cart contains the selected product and one row is visible.
7. Click the delete button for the item in the cart table.
8. Observe the cart after removal.
9. Verify that no product rows remain in the cart table.
10. Verify that the empty-cart indicator is visible again after the final item is removed.
11. Verify that a link or action to return to the products page is visible (`/products`).

## Expected Result

Removing the final product transitions the cart to the empty state. The item row disappears, the empty-cart message is displayed, and the user is given a clear path back to the catalog.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the cart has leftover items or a stale DOM state, reset the browser context to avoid contamination in subsequent tests.

## Automation Notes

- Target the cart delete control by the visible row or product-specific selector and assert the row count becomes zero.
- Verify both the DOM empty-cart marker and the presence of the products-page link.
- Use a resilient assertion for the empty-cart message text, such as `page.locator('text=Cart is empty!')` or `#empty_cart`.

## Traceability

This case implements the final-item empty-state validation for:

> TC-CRT-07 - Verify empty cart state message when all items are removed
