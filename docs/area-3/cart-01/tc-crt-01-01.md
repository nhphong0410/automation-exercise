# TC-CRT-01-01 - Add Single Product to Cart from Listing Page

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-01-01 |
| Parent Condition | TC-CRT-01 |
| Smoke Test | Yes |
| Design Technique | Equivalence Partitioning |
| Area | Area 3 - Shopping Cart Management |
| Priority | P0 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can add a single product to the shopping cart from the product listing page and verify its presence and quantity in the cart view.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Target Product: First product card in the catalog listing.
- Expected Quantity: `1`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Hover over or locate the first product card and click `Add to cart`.
3. Verify that the success modal appears with the message `Added!`.
4. Click `View Cart` in the modal or navigate to `https://automationexercise.com/view_cart`.
5. Verify that the cart table contains the added product with quantity `1`.

## Expected Result

The product is successfully added to the cart from the listing page and displayed in the cart view with the correct initial quantity.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target product cards using `.product-image-wrapper` and interact with `.add-to-cart` buttons.

## Traceability

This case implements the single product addition test for:

> TC-CRT-01 - Add Products to Cart from Listing Page
