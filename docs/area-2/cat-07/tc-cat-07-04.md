# TC-CAT-07-04 - Submit Product Review with Maximum Boundary Length Text

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-07-04 |
| Parent Condition | TC-CAT-07 |
| Smoke Test | No |
| Design Technique | Boundary Value Analysis |
| Area | Area 2 - Product Catalog, Discovery & Search |
| Priority | P3 |
| Test Type | Boundary / Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that submitting a product review with an extremely long feedback string (upper length boundary) is handled correctly by the application without crashing or causing layout overflow.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Reviewer Name: `Boundary Tester`
- Reviewer Email: `boundary@qa.test`
- Review Text: A generated string of 1000+ repeated characters or a long paragraph.

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click on the `View Product` link for the first product.
3. Enter valid name and email, and populate the review textarea with a very long string (1,000+ characters).
4. Click the `Submit` button.
5. Verify the application handles the submission gracefully (either successfully displaying the confirmation banner or enforcing a character limit without unhandled exceptions).

## Expected Result

Long review text inputs are handled robustly by the application UI and backend service.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Generate long strings programmatically in the test implementation.

## Traceability

This case implements upper boundary length analysis for:

> TC-CAT-07 - Submit a product review from PDP and verify success alert
