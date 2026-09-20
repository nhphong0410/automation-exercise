# TC-IAM-01-03 - Register With Valid Alternate Country

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-03 |
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

Verify registration succeeds for a valid supported country other than the baseline country.

## Preconditions

1. The SUT is available and the country list is loaded.
2. The test uses a fresh browser context with no authenticated session.
3. The generated email and mobile number are unique.
4. Select an alternate country from the live country dropdown and prepare address data valid for that country.

## Test Data

Use timestamp-based generated identity data. Select a supported country different from `United States`; use a matching valid state, city, and postal code. Keep title `Mr`, date of birth `15 January 1990`, and both subscriptions selected.

## Steps And Expected Results

## Test Steps And Expected Results

1. Open `/`, verify the page title, and open `Signup / Login`.
2. Verify `New User Signup!`, enter generated name and email, and select `Signup`.
3. Verify `Enter Account Information`.
4. Fill valid title, password, date of birth, subscriptions, and profile data.
5. Select the alternate country from the available options and verify it remains selected.
6. Select `Create Account` and verify `ACCOUNT CREATED!`.
7. Select `Continue` and verify the generated authenticated username.
8. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

Registration succeeds and the selected alternate country is accepted and retained through account creation.

## Cleanup And Failure Handling

Use `finally` cleanup. Prefer UI deletion; if it fails after account creation, call `DELETE /api/deleteAccount` and assert HTTP `200` / JSON `responseCode` `200`.

## Automation Notes

Do not assume a country that is absent from the live dropdown. Select and record an available alternate option during test-data setup. Keep country selection and assertions in AccountInformationPage.

## Traceability

This case implements the valid alternate-country partition for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
