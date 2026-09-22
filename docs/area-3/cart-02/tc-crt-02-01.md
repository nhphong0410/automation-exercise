# TC-CRT-02-01 - Add Product with Custom Quantity from PDP

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-02-01 |
| Parent Condition | TC-CRT-02 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning / Boundary Value Analysis |
| Area | Area 3 - Shopping Cart Management |
| Priority | P0 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can set a custom quantity (>1, e.g., `3`) on the Product Detail Page (PDP) and add the product to the shopping cart, confirming that the cart displays the correct quantity and line subtotal (`Unit Price * Quantity`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Target Product: First product detail page
- Custom Quantity: `3`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click `View Product` for the first item to open the Product Detail Page (`/product_details/1`).
3. Locate the quantity input (`#quantity`), clear it, and fill in `3`.
4. Click the `Add to cart` button.
5. Click `View Cart` in the success modal or navigate to `https://automationexercise.com/view_cart`.
6. Verify that the cart table displays the product with quantity `3`.
7. Verify that the product line subtotal equals `Unit Price * 3`.

## Expected Result

Setting a custom quantity on the PDP successfully adds the specified quantity to the shopping cart and displays the correct line subtotal.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target quantity input using `#quantity`.

## Traceability

This case implements custom quantity addition from PDP for:

> TC-CRT-02 - Add product with custom quantity (>1) from Product Detail Page
