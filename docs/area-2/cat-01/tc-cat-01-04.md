# TC-CAT-01-04 - Add From Product Details Page

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-01-04 |
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

Verify that a user can successfully add a product to the shopping cart from the dedicated Product Details page.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Product: First available product in the catalog.

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click `View Product` for the first product in the list.
3. Verify the browser is on the product detail page (`/product_details/*`).
4. Click the `Add to cart` button on the product details page.
5. Verify the success modal appears.
6. Click `View Cart` and verify the product is present in the cart.

## Expected Result

The product is added successfully from its detail view and correctly appears in the cart.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Use locators specific to the product details page action button.

## Traceability

This case implements the product details page addition test for:

> TC-CAT-01 - Add Products To Cart
