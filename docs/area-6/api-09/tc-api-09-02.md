# TC-API-09-02 - Duplicate Email or Missing Form-Data Should Reject Account Creation

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

Verify that creating an account with an already-registered email or with missing required form-data is rejected rather than creating a second account or accepting incomplete input.

## Preconditions

1. The SUT is available.
2. An account already exists for the duplicate-email test.
3. The API can accept a form-data payload for rejected account creation.

## Test Data

- Endpoint: `POST /api/createAccount`
- Duplicate email or incomplete payload values
- Expected behavior: validation or duplicate-account rejection

## Test Steps And Expected Results

1. Send a `POST` request to `/api/createAccount` using an email that already exists or omit required form-data.
2. Capture the HTTP status and JSON response.
3. Assert that the request is rejected as invalid or duplicate.
4. Confirm no duplicate account is created and the API does not report success.

## Expected Result

The API rejects the invalid account creation request and reports a contract-level failure instead of creating a duplicate or incomplete account.

## Cleanup And Failure Handling

1. If a duplicate account creation was mistakenly accepted, cleanup the account through teardown.
2. Record the exact payload if the API incorrectly indicates success on a rejected request.

## Automation Notes

- This is the negative companion to the standard account-creation contract.
- Keep duplicate-email and missing-field scenarios isolated so they are easy to debug.

## Traceability

This case implements the negative account-creation validation for:

> TC-API-09 - Create user account via form-data payload
