# TC-CRT-05-01 - Guest Cart Persists After User Logs In

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CRT-05-01 |
| Parent Condition | TC-CRT-05 |
| Smoke Test | No |
| Design Technique | State Transition / Session Persistence |
| Area | Area 3 - Shopping Cart Management |
| Priority | P1 |
| Test Type | Functional / Session State |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that products added to the cart while browsing as a guest remain available after the user logs in, and that the cart contents are preserved across the authentication transition.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. The user has no existing cart items before the test begins.

## Test Data

- Product A: first product from the catalog
- Product B: second product from the catalog
- New user credentials for login flow

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Add Product A to the cart while not logged in.
3. Add Product B to the cart while not logged in.
4. Navigate to `https://automationexercise.com/view_cart`.
5. Verify the cart contains Product A and Product B.
6. Click `Signup / Login` and register or log in using a valid account.
7. After login, navigate to `https://automationexercise.com/view_cart` again.
8. Verify that both products are still present in the cart.
9. Verify that item quantities and product names remain unchanged after authentication.

## Expected Result

The guest cart is retained when the user logs in, and the previously added items remain available in the authenticated cart without duplication or loss.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the account was created for the test, perform appropriate teardown to avoid data contamination.

## Automation Notes

- Use a freshly seeded browser context so cart persistence is tested without contamination from previous tests.
- Confirm the cart table still contains the same product names and counts after login.
- For any created account, ensure cleanup follows the project’s teardown pattern using API delete-account flow if needed.

## Traceability

This case implements guest-to-login cart persistence for:

> TC-CRT-05 - Add items as Guest, log in, and verify cart contents persist
