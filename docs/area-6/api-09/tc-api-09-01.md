# TC-API-09-01 - Create Account via Form-Data Payload and Verify Success Response

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-API-09-01 |
| Parent Condition | TC-API-09 |
| Smoke Test | Yes |
| Design Technique | Account Creation |
| Area | Area 6 - Backend REST API Services |
| Priority | P0 |
| Test Type | API / Functional |
| Automation Level | API request validation |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that `POST /api/createAccount` with valid form-data creates a new account and returns the expected success contract with `responseCode: 201`.

## Preconditions

1. The SUT is available.
2. A unique email address is available for account creation.
3. The request can send form-data values to the API endpoint.

## Test Data

- Endpoint: `POST /api/createAccount`
- Payload: valid registration fields including name, email, password, and required profile data
- Expected HTTP status: `200`
- Expected JSON `responseCode`: `201`

## Test Steps And Expected Results

1. Build a valid form-data payload for account creation using a fresh unique email.
2. Send the `POST` request to `/api/createAccount`.
3. Capture the HTTP status and JSON response.
4. Assert HTTP status is `200`.
5. Assert JSON `responseCode` is `201`.
6. Confirm the response indicates successful account creation.

## Expected Result

The API creates the new account successfully and reports the creation in the contract payload using the expected `responseCode: 201` value.

## Cleanup And Failure Handling

1. If the account is created for test purposes, delete it using `DELETE /api/deleteAccount` in teardown.
2. If the call fails or returns a different response code, record the payload and request details for debugging.

## Automation Notes

- Use a unique email per run to avoid duplicate-account collisions.
- Assert both the HTTP and JSON response codes separately.
- Prefer a pre-created account cleanup hook for consistent test hygiene.

## Traceability

This case implements the API account-creation validation for:

> TC-API-09 - Create user account via form-data payload
