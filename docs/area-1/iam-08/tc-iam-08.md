# TC-IAM-08 - Session Persistence After Page Refresh And Tab Reopen

`TC-IAM-08` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case requires an active authenticated user session to verify that session tokens, cookies, and UI authentication indicators (`"Logged in as <username>"`) persist across page reloads, tab lifecycles, and direct navigations, while remaining strictly isolated across separate browser contexts.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-08-01**](tc-iam-08-01.md) | State Transition | Baseline hard page reload (`page.reload()`): Authenticated user triggers browser reload on Home page | Active session persists, navbar continues to display `"Logged in as <username>"`, and user remains on `/` | P2 | No |
| [**TC-IAM-08-02**](tc-iam-08-02.md) | State Transition | Multi-tab session sharing: Open a second tab (`context.newPage()`) within the same browser context | Tab 2 shares the authenticated cookie state, immediately rendering `"Logged in as <username>"` without re-authenticating | P2 | No |
| [**TC-IAM-08-03**](tc-iam-08-03.md) | State Transition | Tab closure and restoration: Authenticated user closes active tab, opens a new tab in the same context, and navigates to `/` | Session cookies persist across tab lifecycles; the new tab recognizes the user and renders `"Logged in as <username>"` | P2 | No |
| [**TC-IAM-08-04**](tc-iam-08-04.md) | Security / Context Isolation | Cross-context boundary isolation: Spawn a brand new browser context (`browser.newContext()`) | New context is completely unauthenticated and displays `"Signup / Login"`, proving no cookie or storage leakage across contexts | P2 | No |
| [**TC-IAM-08-05**](tc-iam-08-05.md) | State Transition | Deep-link navigation persistence: Authenticated user navigates directly to a nested URL (e.g., `/products` or `/view_cart`) | Session survives direct address bar navigation, retaining `"Logged in as <username>"` across target views | P2 | No |
| [**TC-IAM-08-06**](tc-iam-08-06.md) | State Transition | Cookie eviction response: Clear context session cookies (`context.clearCookies()`) and reload page | Authenticated session is immediately lost; user returns to guest state displaying `"Signup / Login"` | P2 | No |
| [**TC-IAM-08-07**](tc-iam-08-07.md) | State Transition / Data Integrity | Synchronized session and cart persistence: Add product to cart $\rightarrow$ Reload page $\rightarrow$ Inspect cart | Authenticated state and cart contents persist simultaneously without item loss or session invalidation | P2 | No |

### Technique Boundaries

- Session persistence validation applies strictly to verifying session continuity and cookie/storage boundary management.
- Initial valid user login authentication belongs to `TC-IAM-04`.
- Explicit user logout and post-logout session destruction belong to `TC-IAM-06`.
- Account deletion lifecycle belongs to `TC-IAM-07`.
- Standalone shopping cart operations without authentication focus belong to `TC-CRT-01` through `TC-CRT-07`.
- **Preconditions & Setup:**
  - In accordance with HLTD Section 3.2, test accounts must be seeded before test execution via `POST /api/createAccount` with dynamic credentials (`user_${Date.now()}@qa.test`).
  - The browser context must authenticate via the UI login form (`/login`) and verify the presence of `"Logged in as <username>"` before exercising session persistence checks.
- **SUT DOM Locators & Assertions:**
  - Authenticated indicator: `li:has-text("Logged in as")` containing the user's name.
  - Authenticated navbar controls: `a[href="/logout"]` and `a[href="/delete_account"]`.
  - Unauthenticated indicator: `a[href="/login"]` ("Signup / Login").
- **Browser Context Isolation (HLTD 3.4):**
  - To prevent test pollution, each test must run inside its own isolated `BrowserContext`.
  - Multi-tab scenarios (`TC-IAM-08-02`, `TC-IAM-08-03`) must create secondary `Page` instances within the *same* `BrowserContext`, whereas context isolation checks (`TC-IAM-08-04`) must instantiate a *new* `BrowserContext`.
- **Teardown Lifecycle:**
  - An unconditional `afterEach` hook must call `DELETE /api/deleteAccount` using the seeded credentials to remove the account from the database.
  - The teardown must safely tolerate both HTTP 200 with JSON `responseCode: 200` and `responseCode: 404`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.