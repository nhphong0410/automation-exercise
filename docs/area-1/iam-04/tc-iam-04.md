# TC-IAM-04 - Login With Valid Credentials

`TC-IAM-04` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case requires a pre-existing registered user account (seeded efficiently via API) and is expected to authenticate successfully, establish an active session, and verify visible logged-in indicators.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-04-01**](tc-iam-04-01.md) | Equivalence Partitioning | Baseline valid login: Standard valid email and password submitted via "Login" button click | User authenticates successfully, lands on home page, and navbar displays `"Logged in as <username>"`, `Logout`, and `Delete Account` | P0 | Yes |
| [**TC-IAM-04-02**](tc-iam-04-02.md) | Equivalence Partitioning | Keyboard submission: Valid credentials submitted by pressing the `Enter` key inside the password input | Form submits without clicking the button; user authenticates and navbar renders `"Logged in as <username>"` | P1 | No |
| [**TC-IAM-04-03**](tc-iam-04-03.md) | Equivalence Partitioning | Case-insensitive email handling: Registered email submitted with uppercase or mixed-case casing | Authentication succeeds regardless of email case formatting; user is authenticated with `"Logged in as <username>"` | P1 | No |
| [**TC-IAM-04-04**](tc-iam-04-04.md) | Equivalence Partitioning | Complex password authentication: Account registered with special characters, numbers, and mixed case | Credentials are parsed without character encoding or truncation issues; authentication succeeds | P1 | No |
| [**TC-IAM-04-05**](tc-iam-04-05.md) | Boundary Value Analysis | Email input whitespace sanitization: Valid registered email entered with leading and/or trailing whitespace | Input is sanitized/trimmed by the client or server, and user logs in successfully | P2 | No |
| [**TC-IAM-04-06**](tc-iam-04-06.md) | State Transition | Authenticated navigation continuity: User logs in $\rightarrow$ Browses across `/products`, `/view_cart`, and `/contact_us` | Authenticated session (`"Logged in as <username>"`) remains active and persistent across all internal route transitions | P1 | No |
| [**TC-IAM-04-07**](tc-iam-04-07.md) | State Transition | Re-authentication flow: User logs in $\rightarrow$ Logs out via navbar $\rightarrow$ Immediately re-logs in with same credentials | Re-authentication completes successfully without session stale-cache errors or login lockouts | P2 | No |

### Technique Boundaries

- Valid authentication journeys here apply exclusively to accounts that already exist in the database and supply correct credentials.
- Registration of new users belongs to `TC-IAM-01`.
- Authentication failures (wrong password, non-existent email, blank login fields) belong to `TC-IAM-05`.
- Explicit logout validation and post-logout protected route restrictions belong to `TC-IAM-06`.
- Deep session persistence across browser reload (`page.reload()`) and multi-tab isolation belongs to `TC-IAM-08`.
- Direct backend API login verification (`POST /api/verifyLogin`) belongs to `TC-API-07`.
- **Precondition Seeding & Test Isolation:**
  - In accordance with HLTD Section 3.2, test accounts must be seeded before test execution via `POST /api/createAccount` with a unique timestamped identity (`user_${Date.now()}@qa.test`).
  - An `afterEach` hook must invoke `DELETE /api/deleteAccount` to remove the seeded account from the database.
- **SUT DOM Locators & Assertions:**
  - Login form fields: Email (`input[data-qa="login-email"]`), Password (`input[data-qa="login-password"]`), Login button (`button[data-qa="login-button"]`).
  - Upon successful authentication, assert that:
    1. The URL navigates to `/` (home page).
    2. Navbar contains `"Logged in as <username>"` (`li:has-text("Logged in as")`).
    3. Navbar contains `Logout` (`a[href="/logout"]`) and `Delete Account` (`a[href="/delete_account"]`).
    4. The unauthenticated `"Signup / Login"` link (`a[href="/login"]`) is detached/hidden.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.