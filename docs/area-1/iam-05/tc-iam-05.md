# TC-IAM-05 - Login With Incorrect Email Or Password

`TC-IAM-05` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case verifies that authentication attempts with invalid credentials, non-existent accounts, blank inputs, or malformed formats are rejected, the user remains unauthenticated, and the expected error feedback is displayed.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-05-01**](tc-iam-05-01.md) | Equivalence Partitioning | Registered email with an incorrect/wrong password | Login fails, page remains on `/login`, displays `"Your email or password is incorrect!"`, and user remains unauthenticated | P1 | No |
| [**TC-IAM-05-02**](tc-iam-05-02.md) | Equivalence Partitioning | Unregistered / non-existent email with arbitrary password | Login fails, page remains on `/login`, displays `"Your email or password is incorrect!"`, and no account session is created | P1 | No |
| [**TC-IAM-05-03**](tc-iam-05-03.md) | Equivalence Partitioning | Blank `Email Address` with populated password | HTML5 constraint validation blocks submission (`valueMissing`), focus remains on email input, and no HTTP request is dispatched | P1 | No |
| [**TC-IAM-05-04**](tc-iam-05-04.md) | Equivalence Partitioning | Registered email with blank `Password` field | HTML5 constraint validation blocks submission (`valueMissing`), focus remains on password input, and no HTTP request is dispatched | P1 | No |
| [**TC-IAM-05-05**](tc-iam-05-05.md) | Boundary Value Analysis | Both `Email Address` and `Password` submitted blank | Form submission is immediately blocked on the first mandatory input (`Email Address`), and page remains on `/login` | P2 | No |
| [**TC-IAM-05-06**](tc-iam-05-06.md) | Equivalence Partitioning | Malformed email syntax in login input (e.g., `plainaddress`, `user@`, `@domain.com`) | Browser blocks submission via HTML5 email syntax validation (`typeMismatch`), and user remains on `/login` | P2 | No |
| [**TC-IAM-05-07**](tc-iam-05-07.md) | State Transition | Authentication recovery: Rejected login attempt $\rightarrow$ User corrects credentials to valid account $\rightarrow$ Re-submits | System transitions from rejected state to authenticated home page, displaying `"Logged in as <username>"` | P2 | No |

### Technique Boundaries

- Authentication rejections and error assertions here apply exclusively to login form interactions.
- Valid authentication using correct credentials belongs to `TC-IAM-04`.
- Registration validation (blank fields, malformed syntax during signup, duplicate email checks) belongs to `TC-IAM-01`, `TC-IAM-02`, and `TC-IAM-03`.
- Explicit logout and session destruction validation belong to `TC-IAM-06`.
- Direct backend API login verification with invalid credentials (`POST /api/verifyLogin` returning JSON `responseCode: 404`) belongs to `TC-API-12`, and missing parameters (`responseCode: 400`) belong to `TC-API-08`.
- **SUT DOM Error Locators & Text:**
  - On `automationexercise.com`, server-side authentication rejections display an error banner within the login form: `<p style="color: red;">Your email or password is incorrect!</p>`.
  - Assertions for server-side rejections (`TC-IAM-05-01`, `TC-IAM-05-02`, `TC-IAM-05-07`) must target `.login-form form p` and verify this exact text.
  - Client-side validation checks (`TC-IAM-05-03`, `TC-IAM-05-04`, `TC-IAM-05-05`, `TC-IAM-05-06`) rely on native HTML5 attributes (`required`, `type="email"`) and must evaluate DOM validity properties (`checkValidity() === false`, `validity.valueMissing`, `validity.typeMismatch`).
- **Unauthenticated State Verification:**
  - For all negative cases, assert that:
    1. The URL remains `/login`.
    2. Navbar retains the `"Signup / Login"` link (`a[href="/login"]`).
    3. Navbar does **not** contain `"Logged in as"`, `Logout`, or `Delete Account`.
- **Preconditions & Teardown Lifecycle:**
  - For `TC-IAM-05-01` and `TC-IAM-05-08`, seed the valid test account beforehand via `POST /api/createAccount` using dynamic credentials (`user_${Date.now()}@qa.test`).
  - An `afterEach` teardown hook must invoke `DELETE /api/deleteAccount` for any seeded account to preserve test isolation.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.