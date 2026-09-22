# TC-CAT-02-03 - Empty Cart State Verification

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-02-03 |
| Parent Condition | TC-CAT-02 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that removing the last remaining item from the shopping cart transitions the cart into an empty state and displays the correct empty cart message.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. Exactly one product is added to the shopping cart.

## Test Data

- Product to add: First product in the product listing.

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product to the cart and navigate to `https://automationexercise.com/view_cart`.
3. Verify the product is present in the cart.
4. Click the delete button (`a.cart_quantity_delete`) to remove the item.
5. Verify the cart table is empty.
6. Verify the empty cart indicator message (`span#empty_cart` or text containing `"Cart is empty!"`) is visible along with the link to products (`/products`).

## Expected Result

Removing all items from the cart displays the empty cart notification message and link as expected by the application design.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target the empty cart notification element (`#empty_cart` or equivalent text selector).
- Verify the presence of the link back to the products page.

## Traceability

This case implements the empty cart state verification test for:

> TC-CAT-02 - Remove Products From Cart
