# TC-IAM-03 - Sign Up Form Validation

`TC-IAM-03` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case verifies client-side and server-side validation rules across the registration workflow (both the initial signup widget on `/login` and the multi-step account information form on `/signup`), ensuring that blank mandatory fields, malformed email syntax, and invalid inputs prevent account creation.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-03-01**](tc-iam-03-01.md) | Equivalence Partitioning | Initial signup: Blank `Name` with valid `Email Address` | Form submission is prevented by browser HTML5 validation (`valueMissing`), focus remains on `Name`, and page stays on `/login` | P1 | No |
| [**TC-IAM-03-02**](tc-iam-03-02.md) | Equivalence Partitioning | Initial signup: Valid `Name` with blank `Email Address` | Form submission is prevented by browser HTML5 validation (`valueMissing`), focus remains on `Email Address`, and page stays on `/login` | P1 | No |
| [**TC-IAM-03-03**](tc-iam-03-03.md) | Boundary Value Analysis | Initial signup: Both `Name` and `Email Address` submitted blank | Submission is immediately blocked on the first mandatory input (`Name`), no navigation occurs, and no server request is dispatched | P2 | No |
| [**TC-IAM-03-04**](tc-iam-03-04.md) | Equivalence Partitioning | Initial signup: Malformed email missing `@` symbol (e.g., `plainaddress`) | Browser blocks submission via HTML5 email syntax validation (`typeMismatch`), and user remains on `/login` | P1 | No |
| [**TC-IAM-03-05**](tc-iam-03-05.md) | Equivalence Partitioning | Initial signup: Malformed email missing domain or local part (e.g., `user@`, `@domain.com`) | Browser blocks submission due to incomplete email format, preventing transition to Step 2 | P2 | No |
| [**TC-IAM-03-06**](tc-iam-03-06.md) | Equivalence Partitioning | Step 2 (Account Information): Blank mandatory `Password` with all other required fields filled | Submission is blocked on the password input (`valueMissing`), form is not submitted, and page remains on `/signup` | P1 | No |
| [**TC-IAM-03-07**](tc-iam-03-07.md) | Equivalence Partitioning | Step 2 (Address Information): Blank mandatory name fields (`First Name` or `Last Name`) | Submission is blocked on the missing name input, form is not submitted, and page remains on `/signup` | P1 | No |
| [**TC-IAM-03-08**](tc-iam-03-08.md) | Equivalence Partitioning | Step 2 (Address Information): Blank mandatory address fields (`Address 1`, `State`, `City`, or `Zipcode`) | Submission is blocked on the respective empty mandatory field, preventing account creation | P1 | No |
| [**TC-IAM-03-09**](tc-iam-03-09.md) | Equivalence Partitioning | Step 2 (Address Information): Blank mandatory `Mobile Number` | Submission is blocked on the mobile number field, preventing account creation | P1 | No |
| [**TC-IAM-03-10**](tc-iam-03-10.md) | Boundary Value Analysis | Whitespace-only strings entered into mandatory text inputs (e.g., `Name`, `First Name`, `Address 1`) | Submission is either blocked or sanitized by the SUT, preventing the creation of blank or corrupt records | P2 | No |
| [**TC-IAM-03-11**](tc-iam-03-11.md) | State Transition | Validation recovery: Form submission blocked due to missing field $\rightarrow$ User populates field $\rightarrow$ Re-submits | Form transitions successfully to the next state (`Enter Account Information` or `ACCOUNT CREATED!`) once all required inputs satisfy constraints | P2 | No |

### Technique Boundaries

- Validation rules here focus strictly on missing mandatory data, malformed syntax, and client/server validation constraints. Fully valid registration journeys belong to `TC-IAM-01`.
- Syntactically valid emails that already exist in the database belong to `TC-IAM-02`.
- Login form credential validation (blank login fields or wrong passwords) belongs to `TC-IAM-05`.
- Backend-only missing parameter validation via direct REST calls (`POST /api/createAccount`) belongs to `TC-API-09`.
- **Preconditions for Step 2 (`/signup`):**
  - Cases `TC-IAM-03-06` through `TC-IAM-03-10` require the test runner to first submit a unique, timestamp-based name and email (`user_${Date.now()}@qa.test`) on Step 1 (`/login`) to reach the Step 2 form.
- **SUT DOM & HTML5 Constraint Handling:**
  - The SUT enforces form validation via native browser HTML5 attributes (`required`, `type="email"`), meaning custom DOM error toast elements are not rendered.
  - Automated assertions must evaluate native DOM validity properties (e.g., `await locator.evaluate((el: HTMLInputElement) => el.checkValidity()) === false` or inspecting `validity.valueMissing` / `validity.typeMismatch`) rather than searching for error banners.
- **Teardown Lifecycle:**
  - Most test cases in this condition do not complete account creation and therefore require no teardown.
  - **Exception (`TC-IAM-03-11`):** In the recovery flow, registration is successfully completed upon correcting the input. The automated test must record the generated email and password, and execute an `afterEach` teardown hook via `DELETE /api/deleteAccount` to guarantee test isolation.
- **Pipeline Optimization & SLA Protection:**
  - To respect the 12-minute regression SLA, Step 2 blank-field checks (`TC-IAM-03-06` through `TC-IAM-03-09`) should be batched or parameterized within a single browser session where possible, avoiding multiple redundant page traversals.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.