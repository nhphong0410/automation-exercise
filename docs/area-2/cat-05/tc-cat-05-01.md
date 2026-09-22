# TC-CAT-05-01 - Filter Products by Women Category and Dress Subcategory

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-CAT-05-01 |
| Parent Condition | TC-CAT-05 |
| Smoke Test | No |
| Design Technique | Equivalence Partitioning |
| Area | Area 2 - Product Catalog, Discovery & Search |
| Priority | P1 |
| Test Type | Functional / Filtering |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that selecting the `Women` main category and the `Dress` subcategory from the sidebar correctly filters the product catalog and updates the page header.

## Preconditions

1. The SUT is available.
2. The test starts with a fresh Playwright browser context.

## Test Data

- Main Category: `Women`
- Subcategory: `Dress`
- Expected Header: `WOMEN - DRESS PRODUCTS`

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com`.
2. Expand the `Women` category accordion in the left sidebar.
3. Click on the `Dress` subcategory link.
4. Verify navigation to `/category_products/1`.
5. Verify the catalog title header displays `WOMEN - DRESS PRODUCTS`.
6. Verify that displayed products belong to the selected category.

## Expected Result

The product catalog filters successfully and displays the correct category header and matching products.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.

## Automation Notes

- Target sidebar category accordions and subcategory list links.

## Traceability

This case implements the Women/Dress filter test for:

> TC-CAT-05 - Filter products by Category and Subcategory (e.g., Women > Dress)
