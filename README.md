# 🧪 Playwright Automation Framework (JavaScript)

## 📌 Project Overview

This project is an end-to-end test automation framework built using Playwright with JavaScript.
It automates key user flows of a saucedemo application, ensuring functionality, reliability, and validation of core features.

---

## 🚀 Tech Stack

* Playwright (JavaScript)
* Node.js
* MCP Integration
* HTML Reporting

---

## Test Coverage

**Total Test Cases: 30**

### Covered Scenarios:

* 🔐 Login Scenarios (Valid & Invalid)
* 🛍️ Product Interactions
* 🛒 Cart Functionality
* 💳 Checkout Flow
* ⚠️ Edge Cases & Validations

---

## 📊 Execution Summary

* Total Tests: 30
* Passed: 30
* Failed: 0
* Status: ✅ 100% Passed

---

## 📁 Project Structure

```
project-root/
│
├── tests/                 # Test files
├── pages/                 # Page Object Model files
├── locators/              # Element locators
├── test-data/             # Test data files
├── utils/                 # Utility/helper functions
├── playwright.config.js   # Playwright configuration
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

Before setting up the project, ensure the following are installed:

* Node.js (v16 or higher)
* npm (comes with Node.js)

Verify installation:

```
node -v
npm -v
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone <YOUR_GITHUB_REPO_LINK>
cd <PROJECT_FOLDER>
```

### 2️⃣ Initialize Project (if needed)

```
npm init -y
```

### 3️⃣ Install Dependencies

```
npm install
```

### 4️⃣ Install Playwright Browsers

```
npx playwright install
```

---

## ▶️ Run Tests

### Run all tests

```
npx playwright test
```

### Run tests in headed mode

```
npx playwright test --headed
```

### Run tests in UI mode (recommended)

```
npx playwright test --ui
```

### Run a specific test file

```
npx playwright test tests/<test-file-name>.spec.js
```

---

## 📊 View Test Report

```
npx playwright show-report
```

👉 This opens the HTML report in your browser.

---

## 📸 Reports & Execution Evidence

* HTML report is generated after execution in:

```
playwright-report/
```

* Screenshots are captured for failed tests (if configured)

---

## 📦 How to Access Report

### Option 1: From Repository

The execution report is available in:

```
playwright-report/
```

### Option 2: Screenshots

Report screenshots can be found in:

```
reports/screenshots/
```

---

## 🔗 MCP Integration

MCP has been integrated into the framework to enhance execution and reporting capabilities.

---

## 💡 Key Features

* Cross-browser testing (Chromium, Firefox, WebKit)
* Parallel test execution
* Page Object Model (POM) design pattern
* Reusable and scalable framework
* Robust locator strategies
* Detailed HTML reporting

---

## 🎯 Highlights

✔️ Automated 30 real-world test cases
✔️ Covered end-to-end user flows
✔️ Implemented validations and edge cases
✔️ Achieved 100% test pass rate

---

## 📬 Author

**[Muzaffar Nafees]**

---

## 🔗 Repository Link

👉 https://github.com/muzaffar-nafees/AutomationMCP
