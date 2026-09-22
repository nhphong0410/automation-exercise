# TC-CRT-06-02 - Validate Success Modal `Continue Shopping` Action

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-06-02 |
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

Verify that when a user clicks `Continue Shopping` in the add-to-cart success modal, the modal closes and the user remains on the current page with the cart state preserved.

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
4. Click `Continue Shopping` in the modal.
5. Verify that the modal closes and the page remains on the product listing page.
6. Verify that the cart still contains the added product or that the product has been successfully added to the cart state.

## Expected Result

Clicking `Continue Shopping` dismisses the modal and returns the user to the current catalog context without losing the newly added item in the cart.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the cart contains test products at the end of the run, remove them or close the browser context to avoid cross-test contamination.

## Automation Notes

- Target the `Continue Shopping` button by visible text.
- Assert that the modal disappears and the user remains on the same listing page.
- Confirm the cart state persists after dismissal.

## Traceability

This case implements the `Continue Shopping` branch of:

> TC-CRT-06 - Verify cart modal actions ("Continue Shopping" vs "View Cart")
