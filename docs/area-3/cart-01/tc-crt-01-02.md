# TC-CRT-01-02 - Add Multiple Distinct Products to Cart from Listing Page

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-01-02 |
| Parent Condition | TC-CRT-01 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 3 - Shopping Cart Management |
| Priority | P1 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that adding multiple distinct products sequentially from the product listing page correctly aggregates all items into the shopping cart.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Target Products: First and second product cards in the catalog listing.

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add the first product to the cart and click `Continue Shopping` in the modal.
3. Add the second product to the cart and click `View Cart` in the modal.
4. Verify that the cart table displays both distinct products with correct quantities (`1` each).

## Expected Result

Multiple distinct products added from the listing page appear together in the cart view with accurate item rows.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Handle modal action buttons (`.modal-footer .btn-success` or similar).

## Traceability

This case implements multiple product additions for:

> TC-CRT-01 - Add Products to Cart from Listing Page
