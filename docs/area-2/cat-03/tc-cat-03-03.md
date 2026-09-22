# TC-CAT-03-03 - Cart Preservation During Registration

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-03-03 |
| Parent Condition | TC-CAT-03 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P2 |
| Test Type | Functional / State Transition |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that items added to the shopping cart during a guest session are preserved through the new user registration workflow.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context (guest state).

## Test Data

- Dynamic Registration Data generated via `createRegistrationData()`.
- Product to add: First product in the product listing.

## Test Steps And Expected Results

1. As a guest user, navigate to `https://automationexercise.com/products`.
2. Add a product to the cart.
3. Navigate to `https://automationexercise.com/view_cart` and verify the product is present.
4. Click `"Signup / Login"` and initiate registration with a new name and email.
5. Complete the account information and submission flow until reaching the account created screen.
6. Continue to the account page and navigate to `https://automationexercise.com/view_cart`.
7. Verify whether the cart items added prior to registration are preserved in the newly created user session.

## Expected Result

The shopping cart state is successfully preserved through the registration process without losing selected items.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if account creation succeeded.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` in an `afterEach` hook.
3. Close the isolated browser context after the test.

## Automation Notes

- Combine cart addition steps with the registration flow from `TC-IAM-01`.

## Traceability

This case implements the cart preservation during registration test for:

> TC-CAT-03 - Cart Persistence Across Authentication Sessions
