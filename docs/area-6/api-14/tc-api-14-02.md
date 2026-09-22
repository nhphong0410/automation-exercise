# TC-API-14-02 - Missing Fields, Invalid Identifiers, or Unknown Account Should Reject the Account Update

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-14-02 |
| Parent Condition | TC-API-14 |
| Smoke Test | No |
| Design Technique | Account Update / Negative |
| Area | Area 6 - Backend REST API Services |
| Priority | P2 |
| Test Type | API / Negative |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that updating an account with missing required fields, malformed identifiers, or an unknown account is rejected and does not silently alter the stored account data.

## Preconditions

1. The SUT is available.
2. The update endpoint is reachable.
3. A malformed update payload or unknown account identifier is prepared.

## Test Data

- Endpoint: `PUT /api/updateAccount`
- Invalid payload: missing required field, malformed identifier, or unknown account
- Expected result: validation or not-found failure with no account mutation

## Test Steps And Expected Results

1. Send a `PUT` request to `/api/updateAccount` with a missing field or malformed identifier.
2. Capture the HTTP status and JSON payload.
3. Assert the request is rejected rather than treated as a successful update.
4. Confirm that stored account data is not modified by the failed request.

## Expected Result

The API rejects the invalid update request, reports the contract-level failure, and does not mutate the account data when the data is incomplete or the account is unknown.

## Cleanup And Failure Handling

1. If the update unexpectedly mutates the account, restore or delete the account in post-test cleanup.
2. Record the payload and request context if the contract fails to reject the invalid mutation.

## Automation Notes

- This is the clear negative counterpart to the successful account-update contract.
- Keep identifier validity and field completeness separate to isolate the exact validation failure.

## Traceability

This case implements the negative update validation for:

> TC-API-14 - Update an existing user account and validate the response
