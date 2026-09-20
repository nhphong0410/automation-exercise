# TC-IAM-01-08 - Register With Latest Valid Date Of Birth

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-08 |
| Parent Condition | TC-IAM-01 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify valid registration at the latest date-of-birth boundary accepted by the SUT.

## Preconditions

1. Discover the latest selectable year and valid date from the SUT contract or live controls.
2. Use a fresh browser context, unique credentials, and a calendar-valid date.

## Test Data

Use baseline valid data with title `Mr`, both subscriptions selected, and the discovered latest valid date as parameterized day, month, and year values.

## Steps And Expected Results

## Test Steps And Expected Results

1. Open `/`, select `Signup / Login`, and verify `New User Signup!`.
2. Enter generated name and email, select `Signup`, and verify `Enter Account Information`.
3. Fill all valid fields and the discovered latest valid date.
4. Assert the three date controls contain the boundary values.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Select `Continue` and verify the generated username is authenticated.
7. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

The latest valid date accepted by the SUT is accepted and registration succeeds.

## Cleanup And Failure Handling

Attempt UI cleanup in `finally`; fall back to the delete-account API when necessary and assert its response contract.

## Automation Notes

Do not substitute the current date unless the SUT explicitly defines it as the upper boundary. Use the live or documented contract value.

## Traceability

This case implements the latest-valid-date boundary for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
