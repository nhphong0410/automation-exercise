# Automation Exercise Playwright Tests

Playwright and TypeScript automation for [Automation Exercise](https://automationexercise.com). The project covers web UI journeys and REST API contracts using Page Object Model, shared Playwright fixtures, isolated browser contexts, and predictable test data.

## Project Structure

```text
docs/
	automation-exercise-test-design.md  High-level test design
	area-1/                             IAM condition and detailed cases
src/
	components/                         Shared UI component objects
	data/                               Test-data factories
	pages/                              Page objects
	tests/
		fixtures.ts                       Shared Playwright fixtures
		e2e/                              UI and workflow tests
			iam/                            Identity and access suites
		api/                              REST API tests
playwright.config.ts                  Playwright configuration
```

## Setup

```bash
npm install
npx playwright install chromium
```

## Test Commands

```bash
npm test                 # Run the complete suite
npm run test:smoke       # Run tests tagged @smoke
npm run test:e2e         # Run all UI tests
npm run test:iam         # Run the TC-IAM-01 suite
npm run test:api         # Run API tests
npm run test:headed      # Run tests with a visible browser
npm run test:ui          # Open Playwright UI mode
npm run report           # Open the latest HTML report
```

Smoke tests must opt in with the Playwright `@smoke` tag:

```typescript
test('checks a core feature', { tag: '@smoke' }, async ({ page }) => {
	// Test implementation
});
```

## Configuration

The default base URL is `https://automationexercise.com`. Override it with `BASE_URL` when testing another environment.

PowerShell:

```powershell
$env:BASE_URL = 'https://automationexercise.com'
npm test
```

The Playwright configuration also enables ad-network blocking through the shared fixture, isolated test contexts, retries in CI, traces on first retry, screenshots on failure, and videos on failure.

## Design Conventions

- Keep page-specific behavior in `src/pages/`.
- Keep reusable UI pieces in `src/components/`.
- Use `src/tests/fixtures.ts` for shared fixtures and POM construction.
- Generate unique registration data through `src/data/user-data.ts`.
- Keep UI and API tests in separate folders.
- Add detailed test-case documentation under the matching `docs/area-*` folder.
- Use `try/finally` cleanup for tests that create accounts, carts, or orders.

## Documentation

The high-level strategy is documented in [docs/automation-exercise-test-design.md](docs/automation-exercise-test-design.md). Area 1 has a condition index at [docs/area-1/tc-iam-01.md](docs/area-1/tc-iam-01.md), with one detailed Markdown file for each derived registration test case.

## CI/CD

GitHub Actions is configured in `.github/workflows/playwright.yml`:

- Pull requests targeting `main` run the `@smoke` test suite.
- Pushes to `main` run the complete Playwright suite.
- Playwright reports and test results are uploaded as workflow artifacts, including when tests fail.
