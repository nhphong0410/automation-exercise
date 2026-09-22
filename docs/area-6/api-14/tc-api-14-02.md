# TC-API-14-02 - Missing Fields, Malformed Identifier, and Unknown Account Variants Should Reject Update

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

Verify deterministic rejection contracts for three distinct update-failure variants: missing required fields, malformed identifier, and unknown account.

## Preconditions

1. The SUT is available.
2. The update endpoint is reachable.
3. Test payloads are prepared for missing-field, malformed-identifier, and unknown-account variants.

## Test Data

- Endpoint: `PUT /api/updateAccount`
- Variant A (missing required field) → Expected HTTP `200`, JSON `responseCode: 400`
- Variant B (malformed identifier, e.g., invalid email format) → Expected HTTP `200`, JSON `responseCode: 400`
- Variant C (unknown account with valid payload format) → Expected HTTP `200`, JSON `responseCode: 404`

## Test Steps And Expected Results

1. Execute Variant A by sending `PUT /api/updateAccount` with missing required field(s); assert HTTP `200` and JSON `responseCode: 400`.
2. Execute Variant B by sending `PUT /api/updateAccount` with a malformed identifier; assert HTTP `200` and JSON `responseCode: 400`.
3. Execute Variant C by sending `PUT /api/updateAccount` with a valid-format payload for an unknown account; assert HTTP `200` and JSON `responseCode: 404`.
4. For all variants, confirm no account record is created or modified.

## Expected Result

All three negative variants return their expected deterministic failure codes, and no account mutation occurs.

## Cleanup And Failure Handling

1. If the update unexpectedly mutates the account, restore or delete the account in post-test cleanup.
2. Record the payload and request context if the contract fails to reject the invalid mutation.

## Automation Notes

- This is the clear negative counterpart to the successful account-update contract.
- Keep identifier validity and field completeness separate to isolate the exact validation failure.

## Traceability

This case implements the negative update validation for:

> TC-API-14 - Update an existing user account and validate the response
