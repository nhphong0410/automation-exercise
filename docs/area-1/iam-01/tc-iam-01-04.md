# TC-IAM-01-04 - Register Without Optional Subscriptions

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-04 |
| Parent Condition | TC-IAM-01 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify optional newsletter and special-offers preferences are not required for valid registration.

## Preconditions

1. The SUT is available.
2. Use a fresh browser context and a unique timestamp-based identity.
3. The newsletter and special-offers controls are available on the account-information page.

## Test Data

Use valid baseline registration data, title `Mr`, date `15 January 1990`, and set both optional preferences to unselected. Use `Password@123` and unique generated email and mobile number.

## Steps And Expected Results

## Test Steps And Expected Results

1. Open the home page and select `Signup / Login`.
2. Verify `New User Signup!`, enter generated name and email, and select `Signup`.
3. Verify `Enter Account Information`.
4. Fill all required fields. Leave newsletter and special-offers unchecked and verify both are unselected.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Select `Continue` and verify the generated username is logged in.
7. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

The account is created successfully without selecting either optional subscription.

## Cleanup And Failure Handling

Use `finally` cleanup. If UI deletion is unavailable, delete through `/api/deleteAccount` and assert HTTP `200` / JSON `responseCode` `200`.

## Automation Notes

Explicitly uncheck controls only when selected by default; otherwise assert their unselected state. Use AccountInformationPage properties for both checkboxes.

## Traceability

This case implements the valid optional-preference partition for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
