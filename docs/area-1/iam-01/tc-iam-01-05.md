# TC-IAM-01-05 - Register With Newsletter Only

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-05 |
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

Verify registration succeeds when newsletter subscription is selected and special offers are not selected.

## Preconditions

1. The SUT is available.
2. Use a fresh browser context with no authenticated state.
3. Use a unique timestamp-based email and mobile number.

## Test Data

Use valid baseline data, title `Mr`, date `15 January 1990`, newsletter selected, and special offers unselected. Use valid required profile fields and generated credentials.

## Steps And Expected Results

## Test Steps And Expected Results

1. Open `/`, select `Signup / Login`, and verify `New User Signup!`.
2. Enter generated name and email, select `Signup`, and verify `Enter Account Information`.
3. Fill all valid account fields.
4. Select newsletter, leave special offers unselected, and assert the two checkbox states.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Select `Continue` and verify `Logged in as <generated name>`.
7. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

The account is created successfully with only newsletter subscription selected.

## Cleanup And Failure Handling

Attempt UI deletion in `finally`; fall back to `DELETE /api/deleteAccount` with the generated credentials if required.

## Automation Notes

Parameterize subscription preferences in the account-information page object. Do not rely on default checkbox state without asserting it.

## Traceability

This case implements the valid optional-preference partition for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
