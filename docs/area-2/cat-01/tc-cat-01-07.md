# TC-CAT-01-07 - Guest User Cart Addition

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-01-07 |
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

Verify that an unauthenticated guest user can successfully add products to the shopping cart and view them without requiring login.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context with no active user session.

## Test Data

- Product to add: First product in the listing.

## Test Steps And Expected Results

1. Ensure no user is logged in (guest state).
2. Navigate to `https://automationexercise.com/products`.
3. Add a product to the cart.
4. Navigate to `https://automationexercise.com/view_cart`.
5. Verify the product is present in the cart.

## Expected Result

Guest users can successfully add and view items in the shopping cart.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Verify that no login is performed during the test execution.

## Traceability

This case implements the guest cart addition test for:

> TC-CAT-01 - Add Products To Cart
