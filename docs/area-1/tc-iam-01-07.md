# TC-IAM-01-07 - Register With Earliest Valid Date Of Birth

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-07 |
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

Verify valid registration at the earliest date-of-birth boundary accepted by the SUT.

## Preconditions

1. Discover the earliest selectable year and valid date from the SUT contract or live controls before execution.
2. Use a fresh browser context and unique generated identity.
3. Confirm the selected boundary date is calendar-valid.

## Test Data

Use baseline valid data with title `Mr`, both subscriptions selected, and the earliest valid date represented as `day`, `month`, and `year` test parameters. Do not assume a year range not exposed by the SUT.

## Steps And Expected Results

## Test Steps And Expected Results

1. Open the home page, select `Signup / Login`, and verify `New User Signup!`.
2. Enter generated name and email, select `Signup`, and verify `Enter Account Information`.
3. Fill valid title, password, all profile fields, and the discovered earliest valid date.
4. Verify the day, month, and year controls contain the configured boundary values.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Select `Continue` and verify the generated authenticated username.
7. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

The earliest valid date accepted by the SUT is accepted and the account is created.

## Cleanup And Failure Handling

Use UI deletion in `finally`; if unavailable, call `/api/deleteAccount` and assert HTTP `200` / JSON `responseCode` `200`.

## Automation Notes

Parameterize the boundary date. Capture the discovered contract value in test output so a changed SUT boundary is diagnosable.

## Traceability

This case implements the earliest-valid-date boundary for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
