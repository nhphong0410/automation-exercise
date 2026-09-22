# TC-UTL-01-01 - Submit Contact Us Form with Valid Data and File Attachment

## Metadata

| Field | Value |
| :--- | :--- |
| Test Case ID | TC-UTL-01-01 |
| Parent Condition | TC-UTL-01 |
| Smoke Test | No |
| Design Technique | Form Submission / File Upload |
| Area | Area 5 - Interactive Utilities & Communication |
| Priority | P1 |
| Test Type | Functional / File Upload |
| Automation Level | UI end-to-end |
| Framework | Playwright with TypeScript |
| SUT | https://automationexercise.com |

## Objective

Verify that a user can submit the Contact Us form with valid details and an attached file, and that the system reports success after the submission.

## Preconditions

1. The SUT is available.
2. The browser session is fresh and no stale user state is present.
3. A valid file for upload is available locally, such as a small text or PDF file.

## Test Data

- Name: valid test name
- Email: valid email format
- Subject: sample subject text
- Message: sample support request text
- Attachment: local file with valid extension and non-empty content

## Test Steps And Expected Results

1. Navigate to `https://automationexercise.com/contact_us`.
2. Fill the contact form with valid values for name, email, subject, and message.
3. Attach a valid file to the upload input.
4. Submit the form.
5. Handle the browser confirmation dialog if it appears.
6. Verify the submission success message is displayed.
7. Confirm that the submission is accepted and no error banner is shown.

## Expected Result

The valid Contact Us submission is accepted, the file is uploaded successfully, and the user sees the success confirmation for the form submission.

## Cleanup And Failure Handling

1. Close the isolated browser context after the test.
2. If the test form submission leaves visible success state remnants, reset the browser or close the context to avoid contamination.
3. Capture whether the upload or confirmation step blocked submission for debugging.

## Automation Notes

- Use a valid attachment file and assert the upload field accepts it.
- Handle the confirm dialog before validating the final success message.
- Prefer matching the visible success banner text after submission rather than only confirming the page stayed stable.

## Traceability

This case implements the valid Contact Us submission flow for:

> TC-UTL-01 - Submit "Contact Us" form with valid data and attached file
