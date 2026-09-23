# Automation Exercise Playwright Project Context

## 1. Purpose and scope

This repository automates the public Automation Exercise website using Playwright and TypeScript. The project is designed as a structured quality engineering repo: it combines a reusable browser automation layer, page-object APIs for site flows, and detailed test-case documentation for functional and API validation.

The codebase currently contains a working IAM example and a smoke API test, while the broader design set covers catalog, cart, checkout, utilities, and API scenarios across the site.

## 2. Technology and execution model

- Framework: Playwright with TypeScript
- Browser target: Chromium desktop browser
- Test runner configuration: [playwright.config.ts](playwright.config.ts)
- Base URL: https://automationexercise.com
- Reporting: HTML report and Playwright test output
- Test isolation: fresh browser context per test by default
- Ad blocking: known ad-network traffic is blocked by the shared fixture to reduce flaky UI behavior

## 3. Repository structure

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
│   │   ├── iam-01/
│   │   ├── iam-02/
│   │   └── iam-05/
│   ├── area-2/
│   │   └── cat-*/
│   ├── area-3/
│   │   └── cart-*/
│   ├── area-4/
│   │   └── ord-*/
│   ├── area-5/
│   │   └── utl-*/
│   └── area-6/
│       └── api-*/
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
├── test-results/
├── playwright-report/
└── .gitignore
```

## 4. Core design conventions

### Page Object Model

Functionality is separated into page objects under [src/pages](src/pages). Each page object owns selectors and interaction methods for a specific screen:

- [src/pages/home.page.ts](src/pages/home.page.ts): landing page navigation
- [src/pages/login.page.ts](src/pages/login.page.ts): signup and login form interactions
- [src/pages/account-information.page.ts](src/pages/account-information.page.ts): account creation details and DOB selection
- [src/pages/account-created.page.ts](src/pages/account-created.page.ts): confirmation page after successful registration
- [src/pages/account.page.ts](src/pages/account.page.ts): account state and delete flow
- [src/pages/products.page.ts](src/pages/products.page.ts): catalog page validation logic

### Shared fixtures

The fixture in [src/tests/fixtures.ts](src/tests/fixtures.ts) centralizes the page objects and blocks known ad-network requests that interfere with UI validation.

### Dynamic test data

Unique test identities are generated in [src/data/user-data.ts](src/data/user-data.ts). The generator uses timestamps so every run gets a fresh record and avoids cross-test leakage.

### Cleanup strategy

The IAM flow in [src/tests/e2e/iam/tc-iam-01.spec.ts](src/tests/e2e/iam/tc-iam-01.spec.ts) uses a cleanup pattern that ensures a created user is removed during teardown when necessary.

This project also follows an API caution that is important for later work: when the SUT responds with HTTP 200 but includes the actual status in the JSON `responseCode`, both values must be asserted separately.

## 5. Running the suite

Commands are defined in [package.json](package.json):

- `npm test`: full suite
- `npm run test:smoke`: smoke-only tests
- `npm run test:e2e`: all E2E tests
- `npm run test:iam`: IAM-focused E2E tests
- `npm run test:api`: API tests
- `npm run test:headed`: run Playwright in headed mode
- `npm run test:ui`: launch Playwright UI mode
- `npm run report`: open the latest HTML report

## 6. Current automation coverage

### Implemented

- IAM registration flow and basic registration cleanup pattern
- Smoke API validation for the product list endpoint

### Documented and planned

The project includes a high-level design in [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md) and a structured set of area-level docs under [docs](docs). These cover the main business domains:

- Identity and access management
- Product catalog and discovery
- Cart management
- Checkout and order flow
- Utility interactions
- REST API surfaces

## 7. Important implementation patterns for later work

- Keep page-specific logic in page objects instead of tests
- Prefer explicit Playwright assertions over custom sleep loops
- Reuse the shared fixture for page objects and network interception
- Generate unique registration data for every run
- Keep teardown in `try/finally` blocks whenever a test creates users or changes state
- Assert both transport status and JSON `responseCode` for API tests where the service returns application-level results in the payload

## 8. Open project state

The repository is in a design-first, partially implemented stage:

- The framework and project scaffolding are already established
- The page objects and shared fixtures are in place
- The IAM registration flow is the clearest working example
- Additional E2E areas are represented as design docs and planned automation work, not yet fully implemented as executable Playwright tests

This means the repo is a strong base for expanding into the remaining catalog, cart, checkout, utility, and API scenarios described in the design docs.

## 9. Recommended next tasks

1. Implement additional E2E suites from the design docs in a consistent POM pattern
2. Expand API coverage beyond the smoke contract
3. Reuse the same cleanup and validation patterns across new suites
4. Add only the extra utility components needed for repeated UI sections

## 10. Key files to know

- [README.md](README.md)
- [playwright.config.ts](playwright.config.ts)
- [src/tests/fixtures.ts](src/tests/fixtures.ts)
- [src/data/user-data.ts](src/data/user-data.ts)
- [src/tests/e2e/iam/tc-iam-01.spec.ts](src/tests/e2e/iam/tc-iam-01.spec.ts)
- [src/tests/api/api.spec.ts](src/tests/api/api.spec.ts)
- [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md)
