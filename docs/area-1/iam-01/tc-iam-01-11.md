# TC-IAM-01-11 - Complete Registration State Transition

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-11 |
| Parent Condition | TC-IAM-01 |
| Smoke Test | No |
| Design Technique | State Transition Testing |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P0 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify every valid state transition in the registration lifecycle.

## Preconditions

1. The SUT is available.
2. Use a fresh Playwright context with no authentication.
3. Generate a unique timestamp-based identity.

## Test Data

Use baseline valid data: title `Mr`, date `15 January 1990`, both subscriptions selected, valid address fields, `Password@123`, and generated email and mobile number.

## State Path

`Signup page -> Account information -> Account created -> Authenticated home -> Deleted account`

## Steps And Expected Results

## Test Steps And Expected Results

1. Open `/`; expected state: Signup page entry is available.
2. Select `Signup / Login`; expected state: `New User Signup!` is visible.
3. Submit generated name and email; expected state: `Enter Account Information` is visible.
4. Complete all valid fields and select `Create Account`; expected state: `ACCOUNT CREATED!` is visible.
5. Select `Continue`; expected state: home page shows `Logged in as <generated name>`.
6. Select `Delete Account`; expected state: `ACCOUNT DELETED!` is visible.
7. Verify no further authenticated account action is available after deletion.

## Expected Result

All transitions occur in order, no unexpected state is reached, and the account ends in the deleted state.

## Cleanup And Failure Handling

Use `finally`. If failure occurs after account creation and before authenticated home, call the delete-account API. If UI deletion fails, also use the API and assert HTTP `200` / JSON `responseCode` `200`.

## Automation Notes

Represent each state transition with a page-object assertion. Do not reuse storage state. Capture the URL and heading at transition failures for diagnosis.

## Traceability

This case implements the registration lifecycle state transitions for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
