# TC-ORD-08-01 - Download Invoice and Validate File Existence and Content

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-ORD-08-01 |
| Parent Condition | TC-ORD-08 |
| Smoke Test | No |
| Design Technique | File I/O / Validation |
| Area | Area 4 - Checkout & Order Fulfillment |
| Priority | P1 |
| Test Type | Functional / File I/O |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that after a successful order, the user can download the invoice file and that the saved file exists and contains non-empty content.

## Preconditions

1. The SUT is available.
2. A valid order has already been placed successfully.
3. The order confirmation page is open and includes the invoice download option.

## Test Data

- Successful order state after valid checkout and payment submission
- Download destination: browser download path or temporary local file directory

## Test Steps And Expected Results

1. Finish a valid checkout and payment flow until the order confirmation state is reached.
2. Locate the invoice download action on the confirmation page.
3. Trigger the download action.
4. Confirm the browser downloads the invoice file successfully.
5. Verify that the file exists in the destination directory.
6. Verify the file size is greater than zero bytes.
7. Optionally inspect the content type or first bytes to confirm the file is an actual invoice document and not an empty placeholder.

## Expected Result

The invoice is downloaded successfully, the file exists on disk, and it contains content rather than an empty or corrupted file.

## Cleanup And Failure Handling

1. Remove the downloaded test file after the validation if the environment is shared.
2. If the download action is missing or broken, capture the step where the order flow diverges.
3. Log file errors such as missing download, zero-byte file, or blocked browser download for later debugging.

## Automation Notes

- Use Playwright download handling to intercept the invoice file reliably.
- Assert file existence and non-zero file size separately from the UI click itself.
- Keep file cleanup consistent to avoid workspace contamination across executions.

## Traceability

This case implements the invoice download validation for:

> TC-ORD-08 - Download Invoice file and verify file existence and non-empty content
