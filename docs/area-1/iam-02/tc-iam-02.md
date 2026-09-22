# TC-IAM-02 - Register User With Already-Registered Email Address

`TC-IAM-02` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case uses a pre-existing registered account (seeded efficiently via API) to verify that duplicate registration attempts are blocked, the multi-step account information form is not displayed, and the application renders the expected error feedback.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-02-01**](tc-iam-02-01.md) | Equivalence Partitioning | Baseline duplicate email: Exact match of pre-existing account email with original casing and matching name | Submission is blocked, page remains on `/login`, and `"Email Address already exist!"` error banner is displayed | P1 | No |
| [**TC-IAM-02-02**](tc-iam-02-02.md) | Equivalence Partitioning | Duplicate email with an alternate/different name entered in the `Name` field | Submission is blocked, verifying uniqueness validation is enforced strictly against the email address regardless of username | P1 | No |
| [**TC-IAM-02-03**](tc-iam-02-03.md) | State Transition | Duplicate rejection recovery: Blocked attempt $\rightarrow$ User edits input to a unique email $\rightarrow$ Re-submits | System transitions successfully from the rejected state to Step 2 (`Enter Account Information`) upon receiving a unique email | P1 | No |
| [**TC-IAM-02-04**](tc-iam-02-04.md) | State Transition | Account lifecycle reuse: Seed account $\rightarrow$ Duplicate signup fails $\rightarrow$ Delete account via API $\rightarrow$ Retry signup with same email | Signup succeeds and advances to Step 2, verifying that deleted email addresses are released and reusable | P2 | No |

### Technique Boundaries

- Duplicate validation applies exclusively to emails that already exist in the database. Blank mandatory fields, malformed RFC email syntax (e.g., missing `@` or domain), and client-side HTML5 validation belong to `TC-IAM-03`.
- Valid registration journeys using fresh credentials belong to `TC-IAM-01`.
- Authentication attempts using existing credentials belong to `TC-IAM-04` (valid) or `TC-IAM-05` (invalid password).
- Backend-only contract response validation (`responseCode: 400`, `message: "Email already exists!"`) belongs to `TC-API-09`.
- **SUT DOM Error Assertion:** On `automationexercise.com`, the SUT displays duplicate email errors specifically as `<p style="color: red;">Email Address already exist!</p>` under the signup form. Assertions must target this specific locator (`.signup-form form p`) and account for the literal site text (`"exist"`).
- **Test Data Seeding & Teardown Lifecycle:**
  - Precondition accounts must be seeded via `POST /api/createAccount` during test setup to avoid incurring UI registration overhead.
  - An unconditional teardown hook (`afterEach`) must execute `DELETE /api/deleteAccount` for the seeded email to guarantee clean test state. The teardown handler must tolerate both HTTP 200 with JSON `responseCode: 200` (success) and `responseCode: 404` (already deleted by test).
  - For `TC-IAM-02-05` (Recovery), if the test proceeds through Step 2 and completes registration of the recovery email, that new email must also be tracked and deleted in teardown.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.