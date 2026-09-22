# TC-CRT-02-02 - Add Product with Quantity Zero from PDP

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-02-02 |
| Parent Condition | TC-CRT-02 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis / Negative Testing |
| Area | Area 3 - Shopping Cart Management |
| Priority | P2 |
| Test Type | Negative / Boundary |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify the application behavior when a user sets the product quantity to `0` on the Product Detail Page (PDP) and attempts to add the item to the cart.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Target Product: First product detail page
- Quantity Input: `0`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click `View Product` for the first item to open the Product Detail Page (`/product_details/1`).
3. Locate the quantity input (`#quantity`), clear it, and enter `0`.
4. Click the `Add to cart` button.
5. Verify that the user cannot add the product with quantity = 0 (submission is blocked or the quantity value is prevented/corrected).

## Expected Result

User cannot add product with quantity = 0.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Check HTML5 input `min` attribute or form behavior.

## Traceability

This case implements zero quantity boundary testing for:

> TC-CRT-02 - Add product with custom quantity (>1) from Product Detail Page
