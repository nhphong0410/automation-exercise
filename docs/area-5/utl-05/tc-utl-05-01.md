# TC-UTL-05-01 - Click Scroll Up Arrow and Return to Page Top

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-UTL-05-01 |
| Parent Condition | TC-UTL-05 |
| Smoke Test | No |
| Design Technique | UI Behavior / Scroll Interaction |
| Area | Area 5 - Interactive Utilities & Communication |
| Priority | P2 |
| Test Type | Functional / UI Behavior |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that clicking the bottom-right scroll-up arrow moves the page back to the top and restores the header to the top-of-page position.

## Preconditions

1. The SUT is available.
2. The page is scrolled vertically so the scroll-up control is visible and actionable.
3. The browser viewport is sufficient to observe the visual change clearly.

## Test Data

- Page content sufficient to create a scroll position below the initial top of the page

## Test Steps And Expected Results

1. Navigate to a product or page with sufficient content to scroll downward.
2. Scroll the page far enough down to make the arrow button visible.
3. Click the bottom-right `Scroll Up` arrow control.
4. Observe the page after the click.
5. Verify the viewport returns to the top of the page.
6. Confirm the header or page top section is visible again after the scroll completes.

## Expected Result

The page scrolls back to the top, and the header becomes visible as the page has returned to its default top position.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the scroll control does not appear after scrolling, capture the exact page state and why the button remained hidden.
3. Ensure no cross-test scroll state leaks into later test cases.

## Automation Notes

- Use a long page or a product listing page that produces a substantial vertical offset.
- Validate both scroll position and visible top-of-page content after the click.
- Prefer checking actual scroll position or a clearly visible top element rather than relying solely on animation timing.

## Traceability

This case implements the arrow-based scroll-up behavior for:

> TC-UTL-05 - Verify scroll up using bottom-right "Scroll Up" arrow button
