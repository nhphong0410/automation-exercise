# TC-CAT-03-01 - Guest Cart Retention Post-Login

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-03-01 |
| Parent Condition | TC-CAT-03 |
| Smoke Test | No |
| Design Technique | State Transition |
| Area | Area 2 - Shopping Cart (CAT) |
| Priority | P1 |
| Test Type | Functional / State Transition |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that items added to the shopping cart by an unauthenticated guest user are retained and synchronized into the user's session after logging in with valid credentials.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context (guest state).
3. A pre-registered user account exists in the database (seeded via `POST /api/createAccount`).

## Test Data

- Seeded User Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Seeded User Password: `Password@123`
- Product to add: First product in the product listing.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. As a guest user, navigate to `https://automationexercise.com/products`.
3. Add a product to the cart.
4. Navigate to `https://automationexercise.com/view_cart` and verify the product is present.
5. Click `"Signup / Login"` in the navbar (`a[href="/login"]`).
6. Log in using the seeded credentials.
7. Navigate back to `https://automationexercise.com/view_cart`.
8. Verify that the product added during the guest session is still present in the cart.

## Expected Result

The shopping cart items added prior to login are successfully retained and associated with the authenticated user session.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` in an `afterEach` hook.
3. Close the isolated browser context after the test.

## Automation Notes

- Seed the account first, then perform guest actions before logging in.
- Use `AccountPage` or navigation to check cart contents post-login.

## Traceability

This case implements the guest cart retention post-login test for:

> TC-CAT-03 - Cart Persistence Across Authentication Sessions
