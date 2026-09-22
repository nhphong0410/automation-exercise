# TC-CAT-03 - Cart Persistence Across Authentication Sessions

`TC-CAT-03` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case verifies how shopping cart items behave during user login, logout, and registration state transitions, ensuring cart contents are preserved or synchronized correctly.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-CAT-03-01**](tc-cat-03-01.md) | State Transition | Guest cart retention post-login: Add items as guest $\rightarrow$ Log in to an existing user account $\rightarrow$ Inspect cart | Guest cart items are successfully retained and synchronized into the authenticated user session | P1 | No |
| [**TC-CAT-03-02**](tc-cat-03-02.md) | State Transition | Authenticated cart persistence post-logout: Add items while logged in $\rightarrow$ Log out $\rightarrow$ Inspect guest cart | Cart items persist or clear according to SUT specification upon session termination | P2 | No |
| [**TC-CAT-03-03**](tc-cat-03-03.md) | State Transition | Cart preservation during registration: Add items as guest $\rightarrow$ Proceed to register a new account $\rightarrow$ Inspect cart post-registration | Cart items remain intact through the registration workflow | P2 | No |

### Technique Boundaries

- Cart persistence across session transitions strictly covers login/logout/registration coupling with shopping cart data.
- Basic cart additions belong to `TC-CAT-01`.
- Basic cart removals belong to `TC-CAT-02`.
- User authentication and registration workflows belong to `TC-IAM-01` through `TC-IAM-05`.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
