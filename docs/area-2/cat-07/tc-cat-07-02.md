# TC-CAT-07-02 - Submit Product Review with Blank Mandatory Fields

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-07-02 |
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

Verify that submitting the product review form with blank mandatory fields (Name, Email, or Review text) is blocked by validation and does not show the success confirmation message.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Reviewer Name: `` (empty)
- Reviewer Email: `` (empty)
- Review Text: `` (empty)

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click on the `View Product` link for the first product.
3. Leave one or all review input fields (`Your Name`, `Email Address`, `Add Review Here!`) blank.
4. Click the `Submit` button.
5. Verify that the success alert element (`Thank you for your review.`) is not displayed and submission is prevented.

## Expected Result

Form validation blocks submission when mandatory fields are blank, retaining the user on the PDP review form.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Verify HTML5 validation tooltips or check that `.alert-success` is absent.

## Traceability

This case implements negative validation for:

> TC-CAT-07 - Submit a product review from PDP and verify success alert
