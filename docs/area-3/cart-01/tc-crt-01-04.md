# TC-CRT-01-04 - Verify Cart Modal "Continue Shopping" Action

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-01-04 |
| Parent Condition | TC-CRT-01 |
| Smoke Test | No |
| Design Technique | State Transition / UI Modal Validation |
| Area | Area 3 - Shopping Cart Management |
| Priority | P1 |
| Test Type | Functional / UI Behavior |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that clicking the `Continue Shopping` button inside the success modal closes the modal and keeps the user on the product listing page, allowing for continued shopping interactions.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Modal Action Button: `Continue Shopping`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product to the cart from the listing page.
3. In the success modal, click the `Continue Shopping` button.
4. Verify that the success modal is no longer visible.
5. Verify that the user remains on the `https://automationexercise.com/products` page.

## Expected Result

Clicking `Continue Shopping` in the success modal closes the modal, allowing the user to remain on the listing page to add further items.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target the button using the success modal's button selector or specific text.

## Traceability

This case implements modal interaction testing for:

> TC-CRT-01 - Add Products to Cart from Listing Page
