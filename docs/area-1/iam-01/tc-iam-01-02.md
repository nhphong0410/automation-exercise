# TC-IAM-01-02 - Register With Valid Alternate Title

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-02 |
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

Verify registration succeeds when the valid alternate title `Mrs` is selected.

## Preconditions

1. The SUT is available.
2. The test uses a fresh Playwright browser context.
3. The generated email is unique for this run.
4. Ad-network blocking is enabled.

## Test Data

Use the baseline registration data from TC-IAM-01. Generate the name, email, mobile number, and password from the current UTC timestamp and worker index. Set title to `Mrs`; use `15 January 1990`, valid profile data, and select both subscription checkboxes.

## Test Steps And Expected Results

1. Open `/` and verify the home page title and `Signup / Login` link.
2. Open `Signup / Login` and verify `New User Signup!`.
3. Enter the generated name and email, then select `Signup`. Verify `Enter Account Information`.
4. Select `Mrs` and verify the title radio button is checked.
5. Fill password, `15 January 1990`, both subscriptions, and all valid profile fields.
6. Select `Create Account` and verify `ACCOUNT CREATED!`.
7. Select `Continue` and verify `Logged in as <generated name>`.
8. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

The account is created with the valid alternate title, the user is authenticated, and cleanup succeeds.

## Cleanup And Failure Handling

Always attempt UI deletion in `finally`. If the account was created and UI deletion fails, call `DELETE /api/deleteAccount` with the generated email and password. Assert HTTP `200` and JSON `responseCode` `200`.

## Automation Notes

Use the existing LoginPage, AccountInformationPage, AccountCreatedPage, and AccountPage objects. Parameterize title rather than duplicating the registration workflow. Keep credentials in test scope and do not persist storage state.

## Traceability

This case implements the valid alternate-title partition for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
