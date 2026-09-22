# TC-CRT-06-01 - Validate Success Modal `View Cart` Action

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-06-01 |
| Parent Condition | TC-CRT-06 |
| Smoke Test | No |
| Design Technique | State Transition / UI Flow |
| Area | Area 3 - Shopping Cart Management |
| Priority | P1 |
| Test Type | Functional / UI |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that when a user clicks `View Cart` in the add-to-cart success modal, they are redirected to the cart page and the item is visible there.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. At least one product is available in the catalog.

## Test Data

- Target product: first available product on the product listing page

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add the first visible product to the cart via the listing-page add button.
3. Observe the add-to-cart success modal.
4. Click `View Cart` in the modal.
5. Verify that the browser navigates to `https://automationexercise.com/view_cart`.
6. Verify that the added product appears in the cart table.

## Expected Result

Clicking `View Cart` immediately opens the shopping cart and the selected product is visible in the cart contents.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the cart contains test products at the end of the run, remove them or close the browser context to avoid cross-test contamination.

## Automation Notes

- Target the `View Cart` button by visible text.
- Validate both the URL and the DOM contents on `/view_cart`.

## Traceability

This case implements the `View Cart` branch of:

> TC-CRT-06 - Verify cart modal actions ("Continue Shopping" vs "View Cart")
