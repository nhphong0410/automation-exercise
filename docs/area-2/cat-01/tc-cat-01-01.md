# TC-CAT-01-01 - Baseline Add Product To Cart From Listing

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-01-01 |
| Parent Condition | TC-CAT-01 |
| Smoke Test | Yes |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P0 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can successfully add a single product to the shopping cart from the products listing page and confirm the addition via the success modal.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

- Product to add: First product in the listing (e.g., "Blue Top")

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Locate the first product in the list.
3. Hover over the product and select `Add to cart`.
4. Verify the success modal appears with the message `"Your product has been added to cart."`.
5. Select `View Cart` in the modal.
6. Verify the browser navigates to `https://automationexercise.com/view_cart`.
7. Verify the added product is present in the cart.

## Expected Result

The product is successfully added to the cart, the success feedback is displayed, and the cart view correctly reflects the added item.

## Cleanup And Failure Handling

1. Clear cart contents if necessary or rely on fresh browser context.
2. Close the isolated browser context after the test.

## Automation Notes

- Use the `ProductsPage` POM to locate products and interact with them.
- Ensure the success modal is handled correctly, potentially clicking `View Cart` after it appears.
- Use `expect` to verify the presence of the product in the cart list.

## Traceability

This case implements the baseline product addition test for:

> TC-CAT-01 - Add Products To Cart
