# Automation Exercise Playwright Tests

Playwright and TypeScript automation for [Automation Exercise](https://automationexercise.com). The repository is organized as a design-driven automation project: it combines a reusable Playwright fixture, page objects for core site flows, and structured test-case documentation under the `docs/` tree.

## Project structure

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
│   │   └── cat-01/ ... cat-07/
│   ├── area-3/
│   │   └── cart-01/ ... cart-07/
│   ├── area-4/
│   │   └── ord-01/ ... ord-08/
│   ├── area-5/
│   │   └── utl-01/ ... utl-06/
│   └── area-6/
│       └── api-01/ ... api-14/
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
└── playwright-report/
```

## Setup

```bash
npm install
npx playwright install chromium
```

## Test commands

```bash
npm test                 # Run the full Playwright suite
npm run test:smoke       # Run tests tagged with @smoke
npm run test:e2e         # Run all E2E tests under src/tests/e2e
npm run test:iam         # Run IAM-focused E2E tests
npm run test:api         # Run API tests
npm run test:headed      # Open a headed browser session
npm run test:ui          # Launch the Playwright UI mode
npm run report           # Open the last HTML report
```

## Configuration

The default base URL is `https://automationexercise.com`. Override it with `BASE_URL` when testing another environment.

PowerShell example:

```powershell
$env:BASE_URL = 'https://automationexercise.com'
npm test
```

The Playwright config also uses a shared fixture to block known ad-network traffic, isolates browser contexts, and stores screenshots, traces, and videos on failure.

## Design and documentation model

The repo is intentionally documentation-first:

- [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md) contains the high-level strategy, risk-based priorities, and design rules.
- Each area under [docs](docs) contains a condition-level summary and one or more detailed test-case documents.
- The names follow the pattern used across the project, such as `TC-IAM-*`, `TC-CAT-*`, `TC-CRT-*`, `TC-ORD-*`, `TC-UTL-*`, and `TC-API-*`.

## Engineering conventions

- Keep page-specific behavior in [src/pages](src/pages).
- Keep reusable setup and browser configuration in [src/tests/fixtures.ts](src/tests/fixtures.ts).
- Generate dynamic registration data in [src/data/user-data.ts](src/data/user-data.ts).
- Keep UI and API tests in separate folders under [src/tests](src/tests).
- Prefer explicit assertions and `try/finally` cleanup when tests create accounts or mutate cart state.
- For API checks, assert both the HTTP status and the JSON `responseCode` where the SUT returns application-level result codes in the body.

## Current repo state

The project is currently in a partial implementation state:

- The working example for the UI flow is the IAM registration implementation in [src/tests/e2e/iam/tc-iam-01.spec.ts](src/tests/e2e/iam/tc-iam-01.spec.ts).
- The API smoke flow is implemented in [src/tests/api/api.spec.ts](src/tests/api/api.spec.ts).
- The detailed design set for catalog, cart, checkout, utilities, and API scenarios is created under the `docs/area-*` folders.
- The automation scope is broader than the currently implemented code, and the docs are intended to guide subsequent test implementation.

## Helpful references

- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)
- [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md)
- [src/tests/fixtures.ts](src/tests/fixtures.ts)
- [src/data/user-data.ts](src/data/user-data.ts)
- [src/pages/login.page.ts](src/pages/login.page.ts)
- [src/pages/products.page.ts](src/pages/products.page.ts)
