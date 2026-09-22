# TC-API-14-01 - Update Existing User Account and Validate Success Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-14-01 |
| Parent Condition | TC-API-14 |
| Smoke Test | No |
| Design Technique | Account Update |
| Area | Area 6 - Backend REST API Services |
| Priority | P1 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `PUT /api/updateAccount` accepts valid account update data and returns a successful JSON response indicating the record was updated.

## Preconditions

1. The SUT is available.
2. An existing account is already registered and known to the test.
3. Valid update data is prepared for the account record.

## Test Data

- Endpoint: `PUT /api/updateAccount`
- Valid account update payload with new or modified fields
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `200`

## Test Steps And Expected Results

1. Prepare a valid account update payload.
2. Send a `PUT` request to `/api/updateAccount` for the known account.
3. Capture the HTTP response and JSON body.
4. Assert the HTTP status is `200`.
5. Assert the JSON `responseCode` is `200`.
6. Confirm the response indicates that the account data was updated successfully.

## Expected Result

The account is updated successfully and the API reports the update via the expected success contract.

## Cleanup And Failure Handling

1. If the update test intentionally modifies required account data, restore the original state in teardown if necessary.
2. If the API returns a different response code, record the full payload for debugging.

## Automation Notes

- Use a stable account and known update payload so the result is deterministic.
- Validate the transport and application-level response separately, as the platform commonly reports success in JSON even alongside HTTP 200.

## Traceability

This case implements the account-update validation for:

> TC-API-14 - Update an existing user account and validate the response
