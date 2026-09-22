# TC-CRT-01-03 - Verify Cart Modal "View Cart" Action

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-01-03 |
| Parent Condition | TC-CRT-01 |
| Smoke Test | No |
| Design Technique | State Transition / UI Modal Validation |
| Area | Area 3 - Shopping Cart Management |
| Priority | P1 |
| Test Type | Functional / Navigation |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that clicking the `View Cart` link inside the success modal correctly redirects the user directly to the shopping cart page (`/view_cart`).

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Modal Action Link: `View Cart`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add a product to the cart from the listing page.
3. In the success modal, click the `View Cart` link (pointing to `/view_cart`).
4. Verify navigation to `https://automationexercise.com/view_cart`.
5. Verify the shopping cart breadcrumb or header is visible.

## Expected Result

Clicking `View Cart` in the success modal navigates the user immediately to the cart page.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target modal link with locator `a[href="/view_cart"]`.

## Traceability

This case implements modal navigation testing for:

> TC-CRT-01 - Add Products to Cart from Listing Page
