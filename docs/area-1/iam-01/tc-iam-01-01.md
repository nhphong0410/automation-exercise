# TC-IAM-01-01 - Register New User With Valid Data

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-IAM-01-01 |
| Parent Condition | TC-IAM-01 |
| Smoke Test | Yes |
| Design Technique | Equivalence Partitioning - baseline valid partition |
| Area | Area 1 - Identity & Access Management (IAM) |
| Priority | P0 |
| Test Type | Functional / Positive |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a new user can complete the two-step registration flow with valid data, becomes authenticated, and can be removed successfully during cleanup.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context and no authenticated session.
3. The generated email address does not already exist in the SUT.
4. Ad-network blocking is enabled through the shared Playwright fixture.

## Test Data

Generate a new data set for every run using the current UTC timestamp and Playwright worker index. Use the format `yyyyMMdd_HHmmss_SSS`.

Use the following valid baseline values:

- Name: `QA User <timestamp>`
- Email: `user_<yyyyMMdd_HHmmss_SSS>_<workerIndex>@qa.test`
- Password: `Password@123`
- Title: `Mr`
- Date of birth: `15 January 1990`
- Newsletter: selected
- Special offers: selected
- First name: `QA`
- Last name: `User`
- Company: `QA Example Ltd`
- Address: `100 Test Street`
- Address 2: `Suite 10`
- Country: `United States`
- State: `California`
- City: `San Francisco`
- Zipcode: `94105`
- Mobile number: timestamp-based unique value

Retain the generated name, email, password, and mobile number for assertions and cleanup. Never commit generated credentials or persist them in `storageState`.

## Test Steps And Expected Results

1. Open the SUT home page. Verify the page loads and the `Signup / Login` link is visible.
2. Select `Signup / Login`. Verify `New User Signup!` is visible.
3. Enter the generated name and unique email. Verify both values are accepted.
4. Select `Signup`. Verify `Enter Account Information` is visible.
5. Select title `Mr`. Verify the `Mr` radio button is selected.
6. Enter the generated password. Verify the password field contains the expected value.
7. Select day `15`, month `January`, and year `1990`. Verify the date controls contain the expected values.
8. Select newsletter and special-offers preferences. Verify both checkboxes are selected.
9. Enter all remaining valid profile and address data. Verify each field contains the expected value.
10. Select `Create Account`. Verify the account-created page is displayed.
11. Verify `ACCOUNT CREATED!` is visible.
12. Select `Continue`. Verify the user returns to the home page.
13. Verify `Logged in as <generated name>` is visible.
14. Select `Delete Account`. Verify account deletion is submitted.
15. Verify `ACCOUNT DELETED!` is visible.

## Expected Result

The complete valid registration flow succeeds, the user is authenticated after creation, and the generated account is deleted successfully during teardown.

## Cleanup And Failure Handling

1. Attempt UI account deletion in a `finally` block whenever the account is authenticated.
2. Verify `ACCOUNT DELETED!` after UI deletion.
3. If UI cleanup is unavailable after account creation, call `DELETE /api/deleteAccount` with the generated email and password.
4. Assert the fallback response is HTTP `200` with JSON `responseCode` `200`.
5. Close the isolated browser context after the test.

## Automation Notes

- Use the POM fixtures from `src/tests/fixtures.ts`.
- Use `HomePage`, `LoginPage`, `AccountInformationPage`, `AccountCreatedPage`, and `AccountPage`.
- Generate identity data through `createRegistrationData(workerIndex)`.
- Use role-, label-, and stable `data-qa` locators through the page objects.
- Do not reuse authenticated storage state because this test mutates account data.

## Traceability

This case implements the baseline valid equivalence partition for:

> TC-IAM-01 - Register new user with valid data (Full 2-step profile creation)
