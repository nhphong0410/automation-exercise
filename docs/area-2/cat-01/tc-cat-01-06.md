# TC-CAT-01-06 - Cart Persistence Across Page Reload

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-01-06 |
| Parent Condition | TC-CAT-01 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P1 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that items added to the shopping cart persist across hard page reloads.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Product to add: First product in the listing.

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product to the cart.
3. Navigate to `https://automationexercise.com/view_cart`.
4. Verify the product is present in the cart.
5. Perform a hard page reload (`page.reload()`).
6. Verify the product remains in the cart view with correct details.

## Expected Result

Cart items persist across browser reloads without loss of data.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Use `page.reload()` to simulate page refresh.

## Traceability

This case implements the cart persistence test for:

> TC-CAT-01 - Add Products To Cart
