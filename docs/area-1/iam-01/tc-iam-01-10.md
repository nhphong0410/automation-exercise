# TC-IAM-01-10 - Register With Mobile Number Length Boundaries

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-10 |
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

Verify registration accepts the minimum and maximum mobile-number lengths supported by the SUT.

## Preconditions

1. Determine accepted mobile-number length boundaries from the SUT contract or validation behavior before implementation.
2. Use a fresh context and unique generated identity for each boundary iteration.

## Test Data

Use baseline valid registration data and two parameterized mobile values: the discovered minimum accepted length and maximum accepted length. Keep country and address valid. Do not invent limits when the SUT does not define them.

## Steps And Expected Results

## Test Steps And Expected Results

1. For each mobile boundary, open `/`, select `Signup / Login`, and verify `New User Signup!`.
2. Enter generated name and email, select `Signup`, and verify `Enter Account Information`.
3. Fill valid title, password, date, subscriptions, and profile fields.
4. Fill the parameterized mobile number and verify the field value and length.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Continue, verify the authenticated username, delete the account, and verify `ACCOUNT DELETED!`.

## Expected Result

Both supported mobile-number boundary values are accepted and registration succeeds.

## Observed SUT Behavior

The SUT does not expose `minlength` or `maxlength` on the mobile-number input, so no
enforced valid length boundaries are available for this case. Invalid-length checks
should be covered under TC-IAM-03.

## Cleanup And Failure Handling

Clean up every account in `finally`; fall back to `/api/deleteAccount` and assert HTTP `200` / JSON `responseCode` `200` if required.

## Automation Notes

Keep boundary discovery separate from the registration assertion. If the SUT has no enforced length constraint, document that result and move invalid-length checks to TC-IAM-03.

## Traceability

This case implements valid mobile-number length boundaries for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
