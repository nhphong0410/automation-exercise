# TC-IAM-01-06 - Register With Special Offers Only

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-06 |
| Parent Condition | TC-IAM-01 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P2 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify registration succeeds when special offers subscription is selected and newsletter is not selected.

## Preconditions

1. The SUT is available.
2. Use a fresh browser context.
3. Generate a unique timestamp-based identity.

## Test Data

Use valid baseline data, title `Mr`, date `15 January 1990`, newsletter unselected, and special offers selected. Use valid required profile fields and generated credentials.

## Steps And Expected Results

## Test Steps And Expected Results

1. Open `/`, select `Signup / Login`, and verify `New User Signup!`.
2. Enter generated name and email, select `Signup`, and verify `Enter Account Information`.
3. Fill all valid account fields.
4. Leave newsletter unselected, select special offers, and assert both checkbox states.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Select `Continue` and verify the generated authenticated username.
7. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

The account is created successfully with only special-offers subscription selected.

## Cleanup And Failure Handling

Attempt UI deletion in `finally`; use API deletion with the generated email and password if UI cleanup fails.

## Automation Notes

Use page-object checkbox properties and explicit state assertions. Do not persist the authenticated state.

## Traceability

This case implements the valid optional-preference partition for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
