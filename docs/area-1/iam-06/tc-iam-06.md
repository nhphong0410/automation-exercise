# TC-IAM-06 - Logout Flow And Restricted-Page Access Verification

`TC-IAM-06` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case requires an active authenticated user session to verify that initiating logout terminates the session, redirects to `/login`, restores unauthenticated navigation elements, and prevents unauthorized access to protected routes or cached history.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-06-01**](tc-iam-06-01.md) | Equivalence Partitioning | Baseline logout from Home page (`/`) via the navbar `Logout` link | Session is terminated, user is redirected to `/login`, `"Signup / Login"` link reappears, and `"Logged in as"` is removed | P1 | No |
| [**TC-IAM-06-02**](tc-iam-06-02.md) | Equivalence Partitioning | Secondary page logout: Trigger `Logout` from a non-home page (e.g., `/products` or `/view_cart`) | Logout executes successfully, user is redirected to `/login`, and session cookies are cleared | P1 | No |
| [**TC-IAM-06-03**](tc-iam-06-03.md) | State Transition / Security | Browser Back navigation post-logout: Click browser `Back` button after successful logout | Cached authenticated state is not restored; protected controls remain inaccessible and subsequent actions prompt re-login | P1 | No |
| [**TC-IAM-06-04**](tc-iam-06-04.md) | Security / Access Control | Direct URL navigation to protected account deletion route (`/delete_account`) after logout | Access is blocked; user is redirected to `/login` or access is denied without triggering account deletion | P1 | No |
| [**TC-IAM-06-05**](tc-iam-06-05.md) | Security / Access Control | Direct URL navigation to checkout route (`/checkout`) post-logout | Direct access is intercepted; system redirects to `/login` or displays checkout authentication prompt modal | P2 | No |
| [**TC-IAM-06-06**](tc-iam-06-06.md) | Concurrency / State Transition | Multi-tab session invalidation: User logs out in Tab 1 $\rightarrow$ Tab 2 is refreshed | Tab 2 updates to unauthenticated state upon refresh, confirming session revocation across tabs | P2 | No |
| [**TC-IAM-06-07**](tc-iam-06-07.md) | State Transition | Full lifecycle re-authentication: Login $\rightarrow$ Logout $\rightarrow$ Re-login with the same credentials | Entire authentication cycle completes cleanly without stale session tokens, cookie lockups, or caching errors | P2 | No |

### Technique Boundaries

- Logout validation strictly applies to terminating authenticated sessions and verifying post-logout access control.
- Initial valid authentication journeys belong to `TC-IAM-04`.
- Authentication failures and negative login credentials belong to `TC-IAM-05`.
- Full account deletion via the UI belongs to `TC-IAM-07`.
- Deep session persistence across browser reload (`page.reload()`) and tab reopen without explicit logout belongs to `TC-IAM-08`.
- Guest checkout gating logic belongs to `TC-ORD-01` and `TC-CRT-05`.
- **Preconditions & Setup:**
  - In accordance with HLTD Section 3.2, test accounts must be seeded via `POST /api/createAccount` with dynamic credentials (`user_${Date.now()}@qa.test`).
  - The browser context must authenticate via the UI login form (`/login`) before executing the logout assertion.
- **Teardown & Cleanup:**
  - An `afterEach` hook must execute `DELETE /api/deleteAccount` using the seeded credentials to remove the user from the database.
  - The teardown must handle both HTTP 200 with JSON `responseCode: 200` and `responseCode: 404` safely.
- **SUT DOM Locators & Assertions:**
  - Logout trigger: `a[href="/logout"]`.
  - Upon clicking `Logout`:
    1. The URL must transition to `https://automationexercise.com/login`.
    2. Navbar must contain `"Signup / Login"` (`a[href="/login"]`).
    3. Navbar must **not** contain `"Logged in as <username>"`, `Logout` (`a[href="/logout"]`), or `Delete Account` (`a[href="/delete_account"]`).

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.