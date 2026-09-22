# TC-CAT-07-03 - Submit Product Review with Malformed Email Syntax

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-07-03 |
| Parent Condition | TC-CAT-07 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning / Negative Testing |
| Area | Area 2 - Product Catalog, Discovery & Search |
| Priority | P2 |
| Test Type | Negative / Form Validation |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting the product review form with malformed email syntax (e.g., missing `@` symbol or domain) is rejected by email validation.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Reviewer Name: `QA Reviewer`
- Reviewer Email: `invalid-email-syntax`
- Review Text: `Great product!`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click on the `View Product` link for the first product.
3. Enter valid name and review text, but enter `invalid-email-syntax` into the `Email Address` field.
4. Click the `Submit` button.
5. Verify that the browser's email input validation prevents submission or that the success alert is not displayed.

## Expected Result

Invalid email formatting triggers validation checks and prevents successful review submission.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Assert HTML5 input validity state (`input.checkValidity() === false`) or verify absence of success banner.

## Traceability

This case implements negative email validation for:

> TC-CAT-07 - Submit a product review from PDP and verify success alert
