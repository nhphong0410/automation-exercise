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
│   │   └── iam-01/ ... iam-08/
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
│   │   ├── tc-iam-03.ts
│   │   └── user-data.ts
│   ├── helpers/
│   │   ├── account-api.ts
│   │   ├── account-lifecycle.ts
│   │   ├── login-validation.ts
│   │   └── session.ts
│   ├── pages/
│   │   ├── account-created.page.ts
│   │   ├── account-information.page.ts
│   │   ├── account.page.ts
│   │   ├── cart.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   ├── product-details.page.ts
│   │   └── products.page.ts
│   └── tests/
│       ├── fixtures.ts
│       ├── api/
│       │   └── api.spec.ts
│       └── e2e/
│           ├── cat/
│           │   └── tc-cat-01.spec.ts ... tc-cat-07.spec.ts
│           └── iam/
│               └── tc-iam-01.spec.ts ... tc-iam-08.spec.ts
├── test-results/
└── playwright-report/
```

## Implemented automation coverage

The executable suite currently covers:

- **IAM:** registration, duplicate email, signup and account validation, login, logout, account deletion, and session persistence (`TC-IAM-01` through `TC-IAM-08`).
- **Catalog and cart:** adding and removing products, cart quantities and totals, cart persistence across authentication, product filtering, and product reviews (`TC-CAT-01` through `TC-CAT-07`).
- **API smoke:** product-list contract validation through `/api/productsList`.
- **Design coverage:** detailed plans for IAM, catalog, cart, checkout, utilities, and REST API areas remain in `docs/`.

Tests tagged with `@smoke` can be run separately with `npm run test:smoke`.

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

The Playwright config uses:

- Chromium desktop browser only
- Fresh browser context per test
- One worker locally and serially by default
- CI retries: 2 retries when `CI` is set
- HTML and list reporters
- Trace on first retry
- Screenshot and video only/retained on failure
- `--disable-blink-features=AutomationControlled` during Chromium launch
- The shared fixture to block DoubleClick, Google Ad Services, and Google Syndication traffic

Test isolation is important because the SUT depends on cookies and cart state. Account and cart setup/cleanup are handled in the relevant tests and helpers.

## Architecture

- **Page Object Model:** page-specific selectors and actions live in [src/pages](src/pages).
- **Shared fixture:** [src/tests/fixtures.ts](src/tests/fixtures.ts) exposes reusable page objects and applies ad-network blocking.
- **Test data:** [src/data/user-data.ts](src/data/user-data.ts) creates unique registration identities for each worker/run.
- **API helpers:** [src/helpers/account-api.ts](src/helpers/account-api.ts) supports account seeding and cleanup through the REST API.
- **Lifecycle helpers:** [src/helpers/account-lifecycle.ts](src/helpers/account-lifecycle.ts) provides UI/API teardown and guest-state handling.
- **Session helpers:** [src/helpers/session.ts](src/helpers/session.ts) supports login, logout, and authenticated session setup.

The project separates UI tests under [src/tests/e2e](src/tests/e2e) and API tests under [src/tests/api](src/tests/api).

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
- Keep browser authentication in browser contexts and API setup/cleanup in request contexts.

## Current repo state

The project is in an incremental implementation state:

- IAM registration and account/session flows are implemented across `TC-IAM-01` to `TC-IAM-08`.
- Catalog and cart flows are implemented across `TC-CAT-01` to `TC-CAT-07`.
- The API smoke flow is implemented in [src/tests/api/api.spec.ts](src/tests/api/api.spec.ts).
- The detailed design set for checkout, utilities, and remaining API scenarios is created under the `docs/area-*` folders.
- The executable suite is less extensive than the full documentation, so the design documents are intended to guide subsequent implementation.

## Helpful references

- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)
- [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md)
- [src/tests/fixtures.ts](src/tests/fixtures.ts)
- [src/data/user-data.ts](src/data/user-data.ts)
- [src/pages/login.page.ts](src/pages/login.page.ts)
- [src/pages/products.page.ts](src/pages/products.page.ts)
