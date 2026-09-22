# TC-CAT-03-02 - Authenticated Cart Persistence Post-Logout

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-03-02 |
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

Verify the behavior of shopping cart items when an authenticated user adds products to the cart and subsequently logs out of the session.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.
3. A pre-registered user account exists in the database (seeded via `POST /api/createAccount`).

## Test Data

- Seeded User Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Seeded User Password: `Password@123`
- Product to add: First product in the product listing.

## Test Steps And Expected Results

1. Seed the user account via `POST /api/createAccount`.
2. Navigate to `https://automationexercise.com/login` and log in with the seeded credentials.
3. Verify successful authentication (`Logged in as ...`).
4. Navigate to `https://automationexercise.com/products` and add a product to the cart.
5. Navigate to `https://automationexercise.com/view_cart` and verify the product is present.
6. Click `Logout` in the navbar (`a[href="/logout"]`).
7. Verify redirection to `/login` and return to `https://automationexercise.com/view_cart` (or re-inspect cart state).
8. Verify whether the cart persists or clears upon logout according to SUT behavior.

## Expected Result

The shopping cart either preserves guest-accessible cart state or clears per application design upon session termination, without throwing errors.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block if authentication was successful.
2. If UI cleanup is unavailable or fails, call `DELETE /api/deleteAccount` in an `afterEach` hook.
3. Close the isolated browser context after the test.

## Automation Notes

- Capture and document the SUT behavior regarding cart state upon explicit logout.

## Traceability

This case implements the post-logout cart persistence test for:

> TC-CAT-03 - Cart Persistence Across Authentication Sessions
