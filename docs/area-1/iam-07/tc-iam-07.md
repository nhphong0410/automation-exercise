# TC-IAM-07 - Delete Account Via UI

`TC-IAM-07` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case requires an active authenticated user session to verify that initiating account deletion permanently removes the user record, displays the "ACCOUNT DELETED!" confirmation screen, terminates the session, and purges credentials from the database.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-07-01**](tc-iam-07-01.md) | Equivalence Partitioning | Baseline account deletion: Authenticated user triggers `Delete Account` from Home page navbar | Account is deleted, `"ACCOUNT DELETED!"` screen is displayed, and clicking `Continue` redirects to the unauthenticated Home page | P0 | No |
| [**TC-IAM-07-02**](tc-iam-07-02.md) | Equivalence Partitioning | Secondary page deletion: Trigger `Delete Account` from a sub-page navbar (e.g., `/products` or `/view_cart`) | Deletion completes identically regardless of originating page, landing on the confirmation screen | P1 | No |
| [**TC-IAM-07-03**](tc-iam-07-03.md) | State Transition | Database purge verification via UI: Attempt login with deleted credentials immediately post-deletion | Login is rejected with `"Your email or password is incorrect!"`, confirming the credentials are no longer valid | P0 | No |
| [**TC-IAM-07-04**](tc-iam-07-04.md) | State Transition | Backend API state verification: Query deleted account via `GET /api/getUserDetailByEmail` or `POST /api/verifyLogin` | API returns HTTP 200 with JSON `responseCode: 404`, proving the account was completely purged from the data store | P1 | No |
| [**TC-IAM-07-05**](tc-iam-07-05.md) | State Transition | Post-deletion credential recycling: Register a new account using the exact email of the deleted account | Registration succeeds and advances to Step 2, confirming the unique constraint in the database is released | P1 | No |
| [**TC-IAM-07-06**](tc-iam-07-06.md) | State Transition / Navigation | Post-deletion navigation flow: Click `Continue` button on `"ACCOUNT DELETED!"` screen | User lands on `/` (Home page), navbar restores the `"Signup / Login"` link, and `"Logged in as"` is gone | P1 | No |
| [**TC-IAM-07-07**](tc-iam-07-07.md) | Security / State Transition | Browser Back navigation post-deletion: Click browser `Back` button after reaching `"ACCOUNT DELETED!"` screen | Cached authenticated state is not restored; no protected actions can be performed without re-authenticating | P2 | No |

### Technique Boundaries

- Account deletion validation strictly covers terminating the account lifecycle and purging user records via the UI.
- Initial user registration belongs to `TC-IAM-01`.
- Standard session termination without deleting the account belongs to `TC-IAM-06`.
- Direct backend API deletion (`DELETE /api/deleteAccount`) as a primary test target belongs to `TC-API-10`.
- **Preconditions & Test Setup:**
  - In accordance with HLTD Section 3.2, test accounts must be seeded before test execution via `POST /api/createAccount` with dynamic credentials (`user_${Date.now()}@qa.test`).
  - The browser context must log in via the UI (`/login`) before initiating the account deletion flow.
- **SUT DOM Locators & Confirmations:**
  - Deletion trigger: `a[href="/delete_account"]`.
  - Confirmation header: `h2[data-qa="account-deleted"]` containing text `"ACCOUNT DELETED!"`.
  - Confirmation continue button: `a[data-qa="continue-button"]`.
- **Ad & Vignette Handling (`#google_vignette`):**
  - Clicking `Continue` (`a[data-qa="continue-button"]`) on the deletion confirmation screen often injects a Google vignette ad overlay or modifies the URL hash to `#google_vignette`.
  - In addition to standard network route blocking (`context.route`), page object helpers must verify that clicking continue resolves navigation to the base URL (`/`).
- **Teardown & Cleanup Lifecycle:**
  - Because successful test execution in this condition deletes the account, an `afterEach` fallback hook calling `DELETE /api/deleteAccount` will receive JSON `responseCode: 404` ("Account not found!").
  - The teardown handler must safely accept both `200` (if UI deletion failed before teardown) and `404` (if UI deletion succeeded) without throwing unhandled test runner errors.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.