# TC-CAT-07-01 - Submit Valid Product Review from Product Detail Page

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-07-01 |
| Parent Condition | TC-CAT-07 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Product Catalog, Discovery & Search |
| Priority | P2 |
| Test Type | Functional |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can successfully submit a product review from the Product Detail Page (PDP) and receive confirmation of a successful submission.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Reviewer Name: `QA Reviewer`
- Reviewer Email: `reviewer@qa.test`
- Review Text: `Excellent quality product, highly recommended!`
- Expected Success Banner: `Thank you for your review.`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Click on the `View Product` link for the first product.
3. Verify navigation to `/product_details/1` and check that the `Write Your Review` header is visible.
4. Enter the reviewer name into the `Your Name` field.
5. Enter the reviewer email into the `Email Address` field.
6. Enter the review text into the `Add Review Here!` text area.
7. Click the `Submit` button.
8. Verify that the success alert element contains the exact text `Thank you for your review.`.

## Expected Result

The review is submitted successfully and the application displays the confirmation message `"Thank you for your review."`.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target review fields using attributes or CSS selectors (e.g., `#name`, `#email`, `#review`, and button `#button-review`).
- Target the success message wrapper element `.alert-success` or alert box style selectors.

## Traceability

This case implements the product review submission test for:

> TC-CAT-07 - Submit a product review from PDP and verify success alert
