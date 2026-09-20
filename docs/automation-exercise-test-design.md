# HIGH-LEVEL TEST DESIGN (HLTD) — AUTOMATION EXERCISE

| Document Property | Details |
| :--- | :--- |
| **System Under Test (SUT)** | Automation Exercise (https://automationexercise.com) |
| **Author** | Senior Automation QA Engineer |
| **Document Version** | 1.0.0 |
| **Target Platforms** | Web (Desktop / Mobile Responsive) & REST APIs |

---

## 1. Executive Summary & Scope

This High-Level Test Design outlines the core test areas, test conditions, priorities, and automation considerations for the Automation Exercise platform. The objective is to provide coverage across both the UI end-to-end customer journey and backend REST services. Detailed step-by-step test cases, test data, assertions, and implementation tasks will be created separately during the automation implementation phase.

---

## 2. Test Areas & Test Conditions

### Area 1: Identity & Access Management (IAM)
*Focus: User registration, authentication, profile integrity, and test cleanup.*

| Ref ID | Test Condition | Test Type | Priority |
| :--- | :--- | :--- | :--- |
| **TC-IAM-01** | Register new user with valid data (Full 2-step profile creation) | Functional / Positive | P0 |
| **TC-IAM-02** | Register user with already-registered email address (Verify error banner) | Negative | P1 |
| **TC-IAM-03** | Sign up form validation (Blank mandatory fields, invalid email syntax) | Boundary / Negative | P2 |
| **TC-IAM-04** | Login with valid credentials and verify "Logged in as <username>" | Functional / Positive | P0 |
| **TC-IAM-05** | Login with incorrect email or password (Verify rejection message) | Negative | P1 |
| **TC-IAM-06** | Logout flow and subsequent restricted-page access verification | Security / Positive | P1 |
| **TC-IAM-07** | Delete account via UI and verify "ACCOUNT DELETED!" confirmation | Lifecycle / Teardown | P0 |
| **TC-IAM-08** | Session persistence after hard page refresh and tab reopen | Session State | P2 |

---

### Area 2: Product Catalog, Discovery & Search
*Focus: Browsing, category filters, product details, and keyword search.*

| Ref ID | Test Condition | Test Type | Priority |
| :--- | :--- | :--- | :--- |
| **TC-CAT-01** | Verify all products catalog display and product card integrity (Image, Title, Price) | UI Validation | P1 |
| **TC-CAT-02** | Verify Product Detail Page (PDP) content (Price, Availability, Condition, Brand) | Functional | P0 |
| **TC-CAT-03** | Search products with valid exact and partial matching keywords | Search / Positive | P0 |
| **TC-CAT-04** | Search products with non-existent keywords (Zero-state verification) | Search / Negative | P2 |
| **TC-CAT-05** | Filter products by Category and Subcategory (e.g., Women > Dress) | Filtering | P1 |
| **TC-CAT-06** | Filter products by Brand (e.g., Polo, H&M, Madame) | Filtering | P1 |
| **TC-CAT-07** | Submit a product review from PDP and verify success alert | Functional | P2 |
| **TC-CAT-08** | Verify "Recommended Items" carousel rendering and interaction | UI / Component | P2 |

---

### Area 3: Shopping Cart Management
*Focus: Item addition, quantity calculations, modals, and state management.*

| Ref ID | Test Condition | Test Type | Priority |
| :--- | :--- | :--- | :--- |
| **TC-CRT-01** | Add single & multiple products to cart from listing page via modal | Functional | P0 |
| **TC-CRT-02** | Add product with custom quantity (>1) from Product Detail Page | Functional | P0 |
| **TC-CRT-03** | Validate mathematical accuracy: Unit Price * Quantity = Item Total | Calculation | P0 |
| **TC-CRT-04** | Remove item from cart and verify DOM removal and cart recalculation | Functional | P1 |
| **TC-CRT-05** | Add items as Guest, log in, and verify cart contents persist | Session / State | P1 |
| **TC-CRT-06** | Verify cart modal actions ("Continue Shopping" vs "View Cart") | UI / Modal | P1 |
| **TC-CRT-07** | Verify empty cart state message when all items are removed | Boundary | P2 |

---

### Area 4: Checkout & Order Fulfillment (E2E Critical Path)
*Focus: End-to-end transactional pipeline from cart to payment and invoice.*

| Ref ID | Test Condition | Test Type | Priority |
| :--- | :--- | :--- | :--- |
| **TC-ORD-01** | E2E: Register while checkout flow | E2E Flow | P0 |
| **TC-ORD-02** | E2E: Register before checkout flow | E2E Flow | P0 |
| **TC-ORD-03** | E2E: Login before checkout flow | E2E Flow | P0 |
| **TC-ORD-04** | Verify Delivery Address and Billing Address match user registration data | Data Integrity | P0 |
| **TC-ORD-05** | Enter order comments in Checkout review step | Functional | P2 |
| **TC-ORD-06** | Enter payment details (Name, Card Number, CVC, Expiration) and submit | Payment | P0 |
| **TC-ORD-07** | Verify "ORDER PLACED!" success screen rendering | Order State | P0 |
| **TC-ORD-08** | Download Invoice file and verify file existence and non-empty content | File I/O | P1 |

---

### Area 5: Interactive Utilities & Communication
*Focus: Forms, file uploads, dialogs, and UI controls.*

| Ref ID | Test Condition | Test Type | Priority |
| :--- | :--- | :--- | :--- |
| **TC-UTL-01** | Submit "Contact Us" form with valid data and attached file | File Upload | P1 |
| **TC-UTL-02** | Handle browser dialog (JavaScript `window.confirm`) on Contact Us submit | Dialog Handling | P1 |
| **TC-UTL-03** | Subscribe to Newsletter in Home page footer and verify AJAX success alert | AJAX Validation | P2 |
| **TC-UTL-04** | Subscribe to Newsletter in Cart page footer | AJAX Validation | P2 |
| **TC-UTL-05** | Verify scroll up using bottom-right "Scroll Up" arrow button | UI Behavior | P2 |
| **TC-UTL-06** | Verify scroll up without arrow and header visibility | UI Behavior | P2 |

---

### Area 6: Backend REST API Services
*Focus: API endpoints, transport status, application response codes, schemas, and payload integrity. The SUT commonly returns HTTP 200 while reporting the scenario result in the JSON `responseCode`; both values must be asserted separately.*

| Ref ID | Endpoint & Method | Test Condition | Expected HTTP / JSON `responseCode` | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **TC-API-01** | `GET /api/productsList` | Fetch all products, validate JSON schema | HTTP 200 / JSON 200 | P0 |
| **TC-API-02** | `POST /api/productsList` | Attempt POST to read-only products list | HTTP 200 / JSON 405 | P1 |
| **TC-API-03** | `GET /api/brandsList` | Fetch all brands and validate array size | HTTP 200 / JSON 200 | P1 |
| **TC-API-04** | `PUT /api/brandsList` | Attempt PUT to brands list | HTTP 200 / JSON 405 | P2 |
| **TC-API-05** | `POST /api/searchProduct` | Search with valid `search_product` param | HTTP 200 / JSON 200 | P0 |
| **TC-API-06** | `POST /api/searchProduct` | Search without search_product parameter | HTTP 200 / JSON 400 | P1 |
| **TC-API-07** | `POST /api/verifyLogin` | Login with valid credentials | HTTP 200 / JSON 200 | P0 |
| **TC-API-08** | `POST /api/verifyLogin` | Login without email parameter | HTTP 200 / JSON 400 | P1 |
| **TC-API-09** | `POST /api/createAccount` | Create user account via form-data payload | HTTP 200 / JSON 201 | P0 |
| **TC-API-10** | `DELETE /api/deleteAccount` | Delete existing user account (Teardown) | HTTP 200 / JSON 200 | P0 |
| **TC-API-11** | `GET /api/getUserDetailByEmail` | Query user data by email | HTTP 200 / JSON 200 | P1 |
| **TC-API-12** | `POST /api/verifyLogin` | Login with invalid email or password | HTTP 200 / JSON 404 | P1 |
| **TC-API-13** | `DELETE /api/verifyLogin` | Attempt to delete login verification with unsupported method | HTTP 200 / JSON 405 | P2 |
| **TC-API-14** | `PUT /api/updateAccount` | Update an existing user account and validate the response | HTTP 200 / JSON 200 | P1 |

---

## 3. Automation Framework & Execution Strategy

### 3.1 Architecture & Design Pattern
* **Pattern:** Page Object Model (POM) paired with Single Responsibility Components (Navbar, CartModal, Footer).
* **Framework:** **Playwright with TypeScript** — Native support for route blocking (blocking Google Ads), built-in API request contexts, auto-waiting, and fast parallel workers.

### 3.2 Handling Known SUT Nuances
1. **Third-Party Ad Interference:**
  *Automation Exercise injects Google Vignette ads between routes.*
  * *Solution:* Block ad network traffic at the network level in Playwright fixtures:
    ```typescript
    await context.route(/(.doubleclick.net|googleadservices.com|googlesyndication.com)/, route => route.abort());
    ```
2. **Test Data Isolation:**
  * Never hardcode emails or reuse stale test identities.
  * Generate dynamic credentials using `user_${Date.now()}@qa.test`.
  * Pair registration tests with an API teardown hook (`DELETE /api/deleteAccount`) in `afterEach`.
3. **Hybrid Data Seeding for E2E Tests:**
  * Do not execute the entire 14-field UI registration form for checkout tests.
  * Seed users instantly via the API (`POST /api/createAccount`), then log in through the UI in the browser context before testing checkout behavior.
4. **Authentication Session Handling:**
  * Use a fresh Playwright browser context for each test by default so cookies, local storage, and cart state cannot leak between tests or workers.
  * Establish authenticated sessions through the UI login flow and verify the authenticated state using the visible `Logged in as <username>` indicator before exercising protected journeys.
  * For suites that require repeated authenticated access, create a dedicated authenticated setup project and reuse its Playwright `storageState` only for read-safe setup; use separate contexts for tests that mutate accounts, carts, or orders.
  * Keep API request contexts separate from browser contexts. API account creation or deletion must not be treated as browser authentication; the browser must still perform UI login when the test validates an authenticated UI journey.
  * Validate logout by confirming the authenticated indicator is removed and that a newly loaded protected journey requires authentication. Store credentials in environment or CI secrets and never persist them in the saved session state.

---

## 4. Execution Matrix & CI/CD Grouping

| Suite | Test Conditions Included | Trigger | Target SLA |
| :--- | :--- | :--- | :--- |
| **Smoke Suite** | Test cases identified as smoke in their test-condition and detailed test-case documents | On every Pull Request | < 3 mins |
| **API Suite** | TC-API-01 through TC-API-14 | On PR & Hourly Healthcheck | < 1 min |
| **Regression Suite** | All P0 + P1 + P2 test conditions across all modules | Nightly Scheduled Run | < 12 mins |