# TC-UTL-06-01 - Scroll Back to Top Without Arrow and Confirm Header Visibility

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-UTL-06-01 |
| Parent Condition | TC-UTL-06 |
| Smoke Test | No |
| Design Technique | UI Behavior / Scroll Interaction |
| Area | Area 5 - Interactive Utilities & Communication |
| Priority | P2 |
| Test Type | Functional / UI Behavior |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that the page can be returned to the top without needing the dedicated arrow button, and that the header is visible again after the scroll state resets.

## Preconditions

1. The SUT is available.
2. A page with enough content to scroll vertically is open.
3. The browser is able to scroll the page naturally without relying on the special arrow button.

## Test Data

- Page content sufficient to generate a scroll position below the top of the page

## Test Steps And Expected Results

1. Navigate to a content-rich page such as the catalog or another long-form page.
2. Scroll down to a lower point in the page.
3. Press the `Home` key (without clicking the arrow button) to return to the top of the page.
4. Observe the page after the scroll action.
5. Verify the page has returned to the top (`window.scrollY` equals `0` or near `0`).
6. Confirm the header is visible and the page is no longer positioned away from the top.

## Expected Result

The page returns to the top without the arrow control, and the header becomes clearly visible again as part of the default page state.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the page does not return to the top, capture the exact state and scroll position for debugging.
3. Reset the context to avoid scroll-position leakage into subsequent tests.

## Automation Notes

- Use a page that naturally produces vertical motion and a visible top anchor.
- Validate both the scroll state and the presence of the page header after the scroll action.
- Avoid depending on a specific animation timing if the page uses CSS transitions or JS smooth scroll.

## Traceability

This case implements the no-arrow scroll-up behavior for:

> TC-UTL-06 - Verify scroll up without arrow and header visibility
