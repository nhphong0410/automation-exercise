# TC-CAT-01-05 - Add High Volume Quantity

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-01-05 |
| Parent Condition | TC-CAT-01 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P2 |
| Test Type | Functional / Boundary |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can add a specified high quantity of a product from the product details page and that the cart accurately reflects the entered quantity.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Quantity value: `10`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click `View Product` for the first product.
3. Locate the quantity input field (`#quantity`).
4. Clear the quantity field and enter `10`.
5. Click `Add to cart`.
6. Click `View Cart`.
7. Verify the product is listed in the cart with quantity `10`.

## Expected Result

The cart correctly displays the specified quantity of 10 for the product.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Use `#quantity` input locator on the product details page.

## Traceability

This case implements the high quantity boundary test for:

> TC-CAT-01 - Add Products To Cart
