# Automation Exercise Playwright Project Context

## 1. Purpose and scope

This repository automates the public Automation Exercise website using Playwright + TypeScript. The goal is to cover both UI journeys and API contract checks in a maintainable, data-isolated test suite.

The current implementation focuses on the IAM registration flow and a smoke API contract, with a test design set in place for broader coverage across catalog, cart, checkout, and other site features.

## 2. Technology and execution model

- Framework: Playwright with TypeScript
- Browser target: Chromium Desktop Chrome
- Test runner config: Playwright config in [playwright.config.ts](playwright.config.ts)
- Base URL: https://automationexercise.com
- Reporting: list reporter + HTML report
- Test isolation: each test gets a fresh browser context and isolated state
- Ad blocking: Google ad network traffic is intentionally blocked in shared fixtures to reduce noise and flaky UI steps

## 3. Project structure

```text
.
├── README.md
├── PROJECT_CONTEXT.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── docs/
│   ├── automation-exercise-test-design.md
│   ├── area-1/
│   │   └── iam-01/
│   │       ├── tc-iam-01.md
│   │       └── tc-iam-01-01.md ...
│   ├── area-3/
│   │   └── cart-01/ ... cart-07/ (each folder contains `tc-crt-*.md` files)
│   ├── area-4/
│   │   └── ord-01/ ... ord-08/ (each folder contains `tc-ord-*.md` files)
│   ├── area-5/
│   │   └── utl-01/ ... utl-06/ (each folder contains `tc-utl-*.md` files)
│   └── area-6/
│       └── api-01/ ... api-14/ (each folder contains `tc-api-*.md` files)
├── src/
│   ├── components/
│   ├── data/
│   │   ├── tc-iam-01.json
│   │   └── user-data.ts
│   ├── pages/
│   │   ├── account-created.page.ts
│   │   ├── account-information.page.ts
│   │   ├── account.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   └── products.page.ts
│   └── tests/
│       ├── fixtures.ts
│       ├── api/
│       │   └── api.spec.ts
│       └── e2e/
│           └── iam/
│               └── tc-iam-01.spec.ts
└── test-results/
```

## 4. Core design conventions

### Page Object Model

Functionality is separated into page objects under [src/pages](src/pages). Each page object owns selectors and interaction methods for a specific screen:

- [src/pages/home.page.ts](src/pages/home.page.ts): landing page navigation
- [src/pages/login.page.ts](src/pages/login.page.ts): signup/login form interactions
- [src/pages/account-information.page.ts](src/pages/account-information.page.ts): registration details and DOB selection
- [src/pages/account-created.page.ts](src/pages/account-created.page.ts): post-registration confirmation page
- [src/pages/account.page.ts](src/pages/account.page.ts): authenticated account state and delete flow
- [src/pages/products.page.ts](src/pages/products.page.ts): products listing checks

### Shared fixtures

The custom Playwright fixture in [src/tests/fixtures.ts](src/tests/fixtures.ts) builds the common page objects and also blocks ad-network requests that otherwise interfere with UI tests.

### Dynamic test data

Test credentials are generated in [src/data/user-data.ts](src/data/user-data.ts). The generator uses timestamp-based values so every execution gets a unique email and stable unique registration data.

### Cleanup strategy

The registered account cleanup pattern used in [src/tests/e2e/iam/tc-iam-01.spec.ts](src/tests/e2e/iam/tc-iam-01.spec.ts) is:

1. Try UI delete flow
2. If that fails, fall back to API cleanup using DELETE /api/deleteAccount
3. Assert both HTTP status and JSON responseCode where appropriate

This is important because the UI may not always be available or deterministic during teardown.

## 5. Running the suite

Commands are defined in [package.json](package.json):

- npm test: full suite
- npm run test:smoke: smoke-only tests
- npm run test:e2e: all UI tests
- npm run test:iam: IAM suite
- npm run test:api: API tests
- npm run test:headed: headed browser run
- npm run test:ui: Playwright UI mode
- npm run report: open the latest HTML report

## 6. Current automation coverage

### Implemented

- IAM registration flow for valid data
- Smoke API contract for the products list endpoint

### Intended and documented

The project includes a high-level design in [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md) and a detailed IAM design index in [docs/area-1/iam-01/tc-iam-01.md](docs/area-1/iam-01/tc-iam-01.md). The design covers the major areas beyond the current workload, including:

- Identity and Access Management
- Product catalog and search
- Cart and checkout
- API coverage across the site backend
- Utility and communication flows

## 7. Important implementation patterns for later work

- Keep page-specific logic in page objects, not in tests
- Prefer explicit waits via Playwright assertions over custom sleeps
- Reuse the shared fixture for page objects and network interception
- Use unique registration data for every test run
- Keep cleanup in finally blocks whenever a test creates a user or mutates state
- Assert both transport status and JSON responseCode for API tests when the service returns HTTP 200 with an application-level response code

## 8. Open project state

The repository is in a solid partial-implementation state:

- The framework scaffolding is already in place
- The booking of test patterns and page objects is established
- The IAM registration suite is implemented as a working example
- Additional suites are not yet present under src/tests/e2e beyond the IAM folder

This makes the project a strong base for extending into the remaining planned catalog, cart, and checkout flows.

## 9. Recommended next tasks

1. Expand the E2E folder with the remaining test conditions from the design docs
2. Add more API cases beyond the smoke test
3. Reuse the same result patterns for cleanup and validation across all new suites
4. Add specialized utility components only when several pages share the same repeated UI section

## 10. Most important files to know

- [README.md](README.md)
- [playwright.config.ts](playwright.config.ts)
- [src/tests/fixtures.ts](src/tests/fixtures.ts)
- [src/data/user-data.ts](src/data/user-data.ts)
- [src/tests/e2e/iam/tc-iam-01.spec.ts](src/tests/e2e/iam/tc-iam-01.spec.ts)
- [src/pages/account-information.page.ts](src/pages/account-information.page.ts)
- [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md)
