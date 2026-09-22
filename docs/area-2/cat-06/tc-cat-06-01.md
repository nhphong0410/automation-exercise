# TC-CAT-06-01 - Filter Products by Polo Brand

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-06-01 |
| Parent Condition | TC-CAT-06 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Product Catalog, Discovery & Search |
| Priority | P1 |
| Test Type | Functional / Filtering |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that selecting a specific brand (e.g., `Polo`) from the brands sidebar correctly filters the product catalog and updates the page header.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Target Brand: `Polo`
- Expected Header: `BRAND - POLO PRODUCTS`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/products`.
2. Locate the `Brands` sidebar section on the left.
3. Click on the `Polo` brand link.
4. Verify navigation to `/brand_products/Polo`.
5. Verify the catalog title header displays `BRAND - POLO PRODUCTS`.
6. Verify that displayed products belong to the selected brand.

## Expected Result

The product catalog filters successfully and displays the correct brand header and matching products.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target sidebar brand menu links under `.brands_products`.

## Traceability

This case implements the Polo brand filter test for:

> TC-CAT-06 - Filter products by Brand (e.g., Polo, H&M, Madame)
