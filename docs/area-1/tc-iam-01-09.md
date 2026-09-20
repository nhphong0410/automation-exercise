# TC-IAM-01-09 - Register With Valid Calendar Boundary Dates

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-09 |
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

Verify registration accepts valid calendar boundary dates.

## Preconditions

1. The SUT is available and the date controls are populated.
2. Use a fresh context and unique generated identity.
3. Execute the case as parameterized data for `1 January`, `31 January`, and `29 February` in a leap year.

## Test Data

Use valid baseline registration data. Date parameters are `1 January 1990`, `31 January 1990`, and `29 February 1992`. If the SUT does not expose one of these years, use the nearest exposed leap-year equivalent and record it.

## Steps And Expected Results

## Test Steps And Expected Results

1. For each date parameter, open `/`, select `Signup / Login`, and verify `New User Signup!`.
2. Enter a new generated name and email, select `Signup`, and verify `Enter Account Information`.
3. Fill valid profile data and the parameterized calendar date.
4. Assert the selected day, month, and year values.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Continue, verify the authenticated username, delete the account, and verify `ACCOUNT DELETED!`.

## Expected Result

Each calendar-valid boundary date is accepted and creates an account.

## Cleanup And Failure Handling

Clean up each parameterized account in `finally`; use API deletion if UI deletion fails.

## Automation Notes

Do not include impossible dates such as `31 April`. Each parameterized iteration must generate a separate email and mobile number.

## Traceability

This case implements valid calendar boundaries for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
