# TC-API-09-02 - Duplicate Email and Missing Form-Data Should Reject Account Creation

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-09-02 |
| Parent Condition | TC-API-09 |
| Smoke Test | No |
| Design Technique | Account Creation / Negative |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify deterministic rejection contracts for two separate negative variants: duplicate email and missing required form-data.

## Preconditions

1. The SUT is available.
2. An account already exists for the duplicate-email variant.
3. The API can accept a form-data payload for negative account-creation requests.

## Test Data

- Endpoint: `POST /api/createAccount`
- Variant A (duplicate email): use an already-registered email → Expected HTTP `200`, JSON `responseCode: 400`, message indicates duplicate email rejection
- Variant B (missing required field): omit at least one required form-data field (for example `email`) → Expected HTTP `200`, JSON `responseCode: 400`, message indicates bad request/missing parameter

## Test Steps And Expected Results

1. Execute Variant A by sending `POST /api/createAccount` with an already-registered email; assert HTTP `200` and JSON `responseCode: 400`.
2. Execute Variant B by sending `POST /api/createAccount` with missing required form-data; assert HTTP `200` and JSON `responseCode: 400`.
3. For both variants, capture and assert the failure message matches the variant contract (duplicate-account rejection for Variant A, missing-parameter/bad-request rejection for Variant B).
4. Confirm no new account is created for either variant.

## Expected Result

Both negative variants are rejected with their defined failure contracts, and the API does not create duplicate or incomplete accounts.

## Cleanup And Failure Handling

1. If a duplicate account creation was mistakenly accepted, cleanup the account through teardown.
2. Record the exact payload if the API incorrectly indicates success on a rejected request.

## Automation Notes

- This is the negative companion to the standard account-creation contract.
- Keep duplicate-email and missing-field scenarios isolated so they are easy to debug.

## Traceability

This case implements the negative account-creation validation for:

> TC-API-09 - Create user account via form-data payload
