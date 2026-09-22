# TC-CAT-02-05 - Guest User Item Removal

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-02-05 |
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

Verify that an unauthenticated guest user can successfully add items to the shopping cart and remove them without requiring authentication.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context with no active user session.

## Test Data

- Product to add and remove: First product in the product listing.

## Test Steps And Expected Results

1. Ensure no user is logged in (guest state).
2. Navigate to `https://automationexercise.com/products`.
3. Add a product to the cart and navigate to `https://automationexercise.com/view_cart`.
4. Verify the product is present in the cart table.
5. Click the delete button (`a.cart_quantity_delete`) for the product.
6. Verify the product row is successfully removed from the guest cart.

## Expected Result

Guest users can successfully remove items from the shopping cart just like authenticated users.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Verify guest status by checking that the navigation bar shows `"Signup / Login"`.
- Use locator `a.cart_quantity_delete` to perform the removal.

## Traceability

This case implements the guest user item removal test for:

> TC-CAT-02 - Remove Products From Cart
