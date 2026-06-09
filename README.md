# 🧪 Playwright AutomationExercise E2E Framework

![Playwright Tests](https://github.com/Amine1n1/playwright-automationexercise-ui-api-framework/actions/workflows/playwright.yml/badge.svg)
![Browsers](https://img.shields.io/badge/browsers-Chrome%20%7C%20Firefox-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A professional end-to-end test automation framework for [automationexercise.com](https://automationexercise.com), built with **Playwright** and **TypeScript**. Covers UI testing, API testing, and combined UI+API scenarios using the Page Object Model pattern.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | E2E & API Testing Framework |
| TypeScript | Type-safe test code |
| Allure | Test reporting |
| dotenv | Environment variable management |
| GitHub Actions | CI/CD pipeline |

---

## 📁 Project Structure

```
playwright-automationexercise-ui-api-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
│
├── auth/
│   └── user.json                   # Saved browser session (gitignored)
│
├── fixtures/
│   └── pom.fixture.ts              # Custom Playwright fixtures (pm, userApi, productApi)
│
├── helpers/
│   ├── UserApi.ts                  # User API helper (create, login, update, delete)
│   └── ProductApi.ts               # Product API helper (list, brands, search)
│
├── pages/
│   ├── BasePage.ts                 # Abstract base class with reusable helpers
│   ├── ManagePage.ts               # Central hub for all page objects (lazy getters)
│   ├── LoginPage.ts                # Login page interactions
│   ├── SignupPage.ts               # Registration page interactions
│   ├── HomePage.ts                 # Home page interactions
│   ├── ProductPage.ts              # Products page interactions
│   └── CartPage.ts                 # Cart page interactions
│
├── test-data/
│   ├── userData.ts                 # User test data (newUser, updatedUser)
│   ├── validUser.ts                # Valid credentials from .env
│   ├── invalidUser.ts              # Invalid credentials from .env
│   ├── productList.json            # Expected product list for API assertions
│   └── brandList.json              # Expected brand list for API assertions
│
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts           # Login tests
│   │   ├── signup.spec.ts          # Registration tests
│   │   ├── product.spec.ts         # Product search, add to cart, filter by brand
│   │   ├── cart.spec.ts            # Cart management tests
│   │   └── subscribe.spec.ts       # Newsletter subscription tests
│   ├── api/
│   │   ├── user.api.spec.ts        # User API CRUD tests
│   │   └── products.api.spec.ts    # Product & Brand API tests
│   └── combined/
│       ├── user.combined.spec.ts   # UI + API user flow tests
│       └── product.combined.spec.ts # UI + API product search tests
│
├── types/
│   └── user.types.ts               # User interface / TypeScript types
│
├── global.setup.ts                 # Global login + session setup
├── playwright.config.ts            # Playwright configuration
├── .env.example                    # Environment variables template
└── .gitignore
```

---

## 🧪 Test Coverage

### 🖥️ UI Tests

| File | Test Cases |
|---|---|
| `login.spec.ts` | Successful login, failed login with invalid credentials |
| `signup.spec.ts` | Successful registration, failed signup (user already exists) |
| `product.spec.ts` | Search products, add to cart, view details, filter by brand |
| `cart.spec.ts` | Delete from cart, set quantity from product details (single & multiple products) |
| `subscribe.spec.ts` | Newsletter subscription from home page |

### 🔌 API Tests

| File | Endpoint | Test Cases |
|---|---|---|
| `user.api.spec.ts` | `/api/verifyLogin` | Valid credentials, invalid credentials |
| | `/api/createAccount` | Create new user |
| | `/api/getUserDetailByEmail` | Get user details, verify all fields |
| | `/api/updateAccount` | Update user, verify changes via GET |
| | `/api/deleteAccount` | Delete user, verify 404 after deletion |
| `products.api.spec.ts` | `/api/productsList` | Get all products, match against snapshot |
| | `/api/brandsList` | Get all brands, match against snapshot |
| | `/api/searchProduct` | Search by keyword, missing parameter → 400 |

### 🔗 Combined UI + API Tests

| File | Scenario |
|---|---|
| `user.combined.spec.ts` | **Create user via API → Login via UI** |
| | **Delete account via UI → Verify deletion via API** |
| | **Register via UI → Verify user data via API** |
| `product.combined.spec.ts` | **Search via API → Verify results match UI** |

---

## 💡 Key Features

- **Page Object Model** — all selectors and actions encapsulated in page classes with a central `ManagePage` hub using lazy getters
- **BasePage** — reusable helpers (`BasePageFill`, `BasePageClick`, `BasePageCheck`, `BasePageSelectOption`) used consistently across all page objects
- **API Helper Classes** — `UserApi` and `ProductApi` mirror the POM pattern for the API layer
- **Combined UI + API Tests** — API used to set up/verify state, UI used to interact — real-world testing pattern
- **Custom Fixtures** — clean test code via `pm`, `validUser`, `invalidUser`, `userApi`, `productApi` fixtures
- **Global Setup + storageState** — login once, session reused across all tests — no repeated login
- **Multi-browser** — tests run on Chrome and Firefox in parallel
- **Dynamic test data** — timestamp-based emails prevent conflicts between runs
- **Allure Reporting** — rich HTML reports with test history and steps
- **CI/CD** — runs automatically on every push via GitHub Actions

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amine1n1/playwright-automationexercise-ui-api-framework.git
cd playwright-automationexercise-ui-api-framework
```

### 2. Install dependencies

```bash
npm install
npx playwright install chromium firefox
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
BASE_URL=https://automationexercise.com
VALID_USERNAME=your-registered-email@example.com
VALID_PASSWORD=yourpassword
INVALID_USERNAME=invalid@example.com
INVALID_PASSWORD=wrongpassword
```

### 4. Run tests

```bash
# Run all tests (Chrome + Firefox)
npx playwright test

# Run specific test suite
npx playwright test tests/ui/login.spec.ts
npx playwright test tests/api/
npx playwright test tests/combined/

# Run with UI mode (visual runner)
npx playwright test --ui

# Run headed (visible browser)
npx playwright test --headed

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### 5. Generate and open Allure report

```bash
# Run tests + generate + open report
npm run test:report

# Or step by step
npx playwright test
npx allure generate allure-results --output allure-report --clean --open
```

---

## 📊 Test Architecture

### Session Management

```
global.setup.ts
    │
    └── Login once → save session to auth/user.json
              │
    ┌─────────┴─────────┐
    ↓                   ↓
 chromium            firefox
 (reuses session)    (reuses session)
    │
    ├── UI tests       → use storageState (already logged in)
    ├── API tests      → no browser session needed
    └── Combined tests → override storageState per describe block
```

### Combined Test Pattern

```
User Combined Tests:
  API: createUser()         → set up test data
    ↓
  UI:  login()              → interact via browser
    ↓
  UI:  deleteAccount()      → perform action
    ↓
  API: verifyLogin()        → verify state changed

Product Combined Tests:
  API: searchProduct('top') → get expected results
    ↓
  UI:  searchForProduct()   → search in browser
    ↓
  Assert: UI names === API names
```

---

## 🔐 Authentication

The framework uses `storageState` to persist the browser session across tests:

```ts
// global.setup.ts — runs once before all tests
setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  // ... login steps
  await page.context().storageState({ path: 'auth/user.json' });
});

// Tests that need fresh session override storageState:
test.use({ storageState: { cookies: [], origins: [] } });
```

---

## 📝 API Documentation

Full API docs: [automationexercise.com/api_list](https://automationexercise.com/api_list)

> **Note:** All API endpoints use `application/x-www-form-urlencoded` (form data), not JSON. The HTTP status is always `200` — check `responseBody.responseCode` for the actual result code.

---

## 🗂️ Environment Variables

| Variable | Description | Example |
|---|---|---|
| `BASE_URL` | Application base URL | `https://automationexercise.com` |
| `VALID_USERNAME` | Valid login email | `user@example.com` |
| `VALID_PASSWORD` | Valid login password | `password123` |
| `INVALID_USERNAME` | Invalid login email | `invalid@example.com` |
| `INVALID_PASSWORD` | Invalid login password | `wrongpassword` |