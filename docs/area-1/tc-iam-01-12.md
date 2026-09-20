# TC-IAM-01-12 - Pairwise Valid Registration Combinations

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-12 |
| Parent Condition | TC-IAM-01 |
| Smoke Test | No |
| Design Technique | Pairwise Testing |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P1 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify valid interactions among title, country, date, and subscription values using a pairwise covering set instead of executing every Cartesian combination.

## Preconditions

1. The SUT is available and its valid dropdown options are known.
2. Use a fresh browser context for each generated covering-array row.
3. Every row receives a unique timestamp-based email and mobile number.

## Test Data

Generate rows across these valid factors:

| Factor | Values |
| :--- | :--- |
| Title | `Mr`, `Mrs` |
| Country | Baseline country, one alternate supported country |
| Date | Baseline valid date, one valid date boundary |
| Newsletter | Selected, unselected |
| Special offers | Selected, unselected |

Use a pairwise generator to produce the smallest set that covers every pair of factor values. Store the generated rows as test data so failures are reproducible.

## Steps And Expected Results

## Test Steps And Expected Results

For every generated row:

1. Open `/`, select `Signup / Login`, and verify `New User Signup!`.
2. Enter a new generated name and email, select `Signup`, and verify `Enter Account Information`.
3. Fill the row's title, country, date, subscription preferences, password, and valid profile data.
4. Assert every selected value before submission.
5. Select `Create Account` and verify `ACCOUNT CREATED!`.
6. Select `Continue` and verify `Logged in as <generated name>`.
7. Delete the account and verify `ACCOUNT DELETED!`.

## Expected Result

Every pairwise row creates a valid account, authenticates the user, and cleans up successfully.

## Cleanup And Failure Handling

Use `finally` for every row. If UI cleanup fails after account creation, call `/api/deleteAccount` with that row's credentials and assert HTTP `200` / JSON `responseCode` `200`.

## Automation Notes

Keep the pairwise data set version-controlled and deterministic. Do not use random combinations at runtime. Use the existing POM fixture and pass each row's values to a parameterized registration workflow.

## Traceability

This case implements pairwise valid-data coverage for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
