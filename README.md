# 🚀 Stephen Bennett's QA Automation Project

[](https://github.com/steviebdesignstraining/waracle_takehome_Test/actions/workflows/main.yml/badge.svg)

## 👋 Introduction

![Stephen_.png](https://github.com/steviebdesignstraining/waracle_takehome_Test/raw/main/Stephen_.png)

Hi there\! Before we blast off into the code-verse, I want to introduce myself. My name is **Stephen Bennett**, and I've been immersed in the world of testing for over **12 years**. I genuinely enjoy the development space and bringing a positive, optimistic, and adaptable spirit to any team. I'm sociable and thrive in diverse environments, working well with all personalities.

First off, I absolutely **loved** completing this take-home test\! I got a bit carried away and ended up building **two** automation frameworks: one with **Cypress** and another with **Playwright**. I even considered a third in Python and Selenium, but decided to channel that energy into comprehensive manual test plans to guide my scripting.

Let's dive into what I've accomplished\!

-----

## 🎯 Project Overview

This project showcases automated browser tests for a simple MVP online shop provided by Waracle. The primary goal is to **validate core functionality** and **instill confidence** in ongoing development by thoroughly covering key user flows such as login, product display, cart actions, and robust error handling.

### 🔍 Scope of Automation

My automated tests cover core user scenarios using multiple test accounts to ensure comprehensive coverage:

  * **✅ `standard_user`**: Validates expected normal behavior.
  * **❌ `locked_out_user`**: Confirms proper login failure and error messages.
  * **⚠️ `problem_user`**: Identifies issues with image loading.
  * **🐢 `performance_glitch_user`**: Assesses system resilience under simulated load delays.

The tests are meticulously implemented using both **Cypress** and **Playwright**, adhering to best practices in automation and QA. I've prioritized functionality, maintainability, and completeness, delivering a project with a production-level structure and detailed documentation.

🔗 **Waracle QA Challenge Application**: [https://qa-challenge.codesubmit.io](https://qa-challenge.codesubmit.io)

-----

## 📋 Manual Test Plan

As mentioned, I've created a detailed **manual test plan** that outlines the key user flows, cases, and scenarios that have been automated. This plan ensures that all critical functionalities of the online shop are thoroughly tested and serves as a blueprint for the automated scripts.

📖 **View the Test Plan**: [https://continuous-place-db3.notion.site/Waracle-s-Test-22440221abc080999c27cd86186c22a2?source=copy\_link](https://continuous-place-db3.notion.site/Waracle-s-Test-22440221abc080999c27cd86186c22a2?source=copy_link)

-----

## 🛠️ Setup Instructions

Getting these frameworks up and running is straightforward. Please ensure you are in the correct directory for either Cypress or Playwright when executing commands.

1.  **Clone the repository**:

    ```bash
    git clone http://waracle-1-xqmgza@git.codesubmit.io/waracle-1/qa-hiring-iliptv
    ```

2.  **Navigate to the framework directory**:

    ```bash | Cypress
    cd qa-hiring-iliptv/cypress
    ```

    ```bash | Playwright
    cd qa-hiring-iliptv/playwright
    ```

3.  **Install dependencies**:

    ```bash
    npm install
    ```

### Running Tests

Choose your preferred framework and execution method:

| Command                   | Description                                             |
| :------------------------ | :------------------------------------------------------ |
| `npx playwright test --ui` | **Open Playwright GUI** for interactive debugging.      |
| `npm run cypress:open`    | **Open Cypress GUI** for interactive test development.  |
| `npx playwright test`     | **Run Playwright** tests in headless mode.              |
| `npm run test`            | **Run Cypress** tests in headless mode.                 |
| `allure serve allure-results` | **Generate & Serve Allure Report** (for Playwright). |

-----

## ✨ Features & Best Practices

Both frameworks are built with modern web testing principles in mind, focusing on maintainability, scalability, and robust reporting.

  * **TypeScript Support**: Full TypeScript implementation with robust type checking.
  * **Page Object Model (POM)**: A maintainable and scalable test architecture.
  * **Fixtures**: Efficient test data management using JSON fixtures.
  * **Environment Configuration**: Flexible test environments via `.env` files.
  * **Custom Commands**: Reusable Cypress commands for common actions.
  * **Fake Data Generation**: Utilizes `@faker-js/faker` for dynamic test data.
  * **Multiple Test Scenarios**: Comprehensive coverage including login, cart operations, checkout, and error handling.
  * **Cross-browser Testing**: Support for Chrome, Firefox, and Edge browsers.
  * **Retry Logic**: Automatic test retries for improved reliability.
  * **Allure Reports**: Detailed and interactive test reports for Playwright.

-----

## 📂 Project Structure

### Cypress (`cypress/`)

```
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   └── main.cy.ts          # Main test suite
│   ├── fixtures/               # Test data files
│   │   ├── loginTestCases.json # Login test scenarios
│   │   └── users.json          # User credentials
│   ├── pages/                  # Page Object Models
│   │   └── HomePage.ts         # Home page class
│   ├── support/                # Support files
│   │   ├── commands.ts         # Custom Cypress commands
│   │   └── e2e.ts              # Global test configuration
│   ├── screenshots/            # Test failure screenshots
│   └── videos/                 # Test execution videos
├── .env                        # Environment variables
├── cypress.config.ts           # Cypress configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md
```

### Playwright (`playwright/`)

```
├── playwright/
│   ├── pages/                   # Page Object Models
│   │   └── home.page.ts         # Home page class
│   ├── tests/                   # Test specifications
│   │   └── main.spec.ts         # Main test suite
│   ├── tests-examples/          # Example/spec tests
│   │   └── demo-todo-app.spec.ts# Example Playwright test
│   ├── allure-results/          # Allure test results
│   ├── playwright-report/       # Playwright HTML reports
│   ├── test-results/            # Raw test results
│   ├── .github/                 # GitHub Actions workflows
│   │   └── workflows/
│   │       └── playwright.yml   # CI workflow
│   ├── package.json             # Dependencies and scripts
│   ├── tsconfig.json            # TypeScript configuration
│   ├── playwright.config.ts     # Playwright configuration
│   └── READMEASSESSMENT.md      # Project/assessment documentation
```

-----

## 🏃 Test Execution Modes (Cypress)

### Interactive Mode (Cypress GUI)

```bash
npm run cypress:open
```

### Headless Mode (CI/CD Ready)

```bash
npm test                    # Run all tests
npm run test:main           # Run the main test suite
npm run test:headed         # Run with browser visible (headless but visual)
```

### Browser-specific Tests

```bash
npm run test:chrome         # Run tests in Chrome
npm run test:firefox        # Run tests in Firefox
npm run test:edge           # Run tests in Edge
```

### Test Categories

```bash
npm run test:auth           # Run authentication tests only
npm run test:cart           # Run shopping cart tests only
npm run test:performance    # Run performance tests only
npm run test:smoke          # Run smoke tests only
```

### Utility Commands

```bash
npm run validate:types      # Perform TypeScript type checking
npm run clean               # Clean up screenshots and videos
```

-----

## 📝 Key Test Scenarios Covered

The test suites comprehensively validate critical aspects of the online shop:

### Authentication Tests

  * ✅ Multiple login scenarios (valid/invalid users).
  * ✅ Standard user login.
  * ✅ Problem user login with robust broken image detection.
  * ✅ Performance glitch user login with load time validation.
  * ✅ Thorough error handling for locked-out users.

### Shopping Cart Tests

  * ✅ Adding single and multiple items to the cart.
  * ✅ Removing items from the cart.
  * ✅ Comprehensive cart validation and empty state checks.

### Checkout Tests

  * ✅ Complete checkout flow utilizing faker data for dynamic inputs.
  * ✅ Checkout with specific test data.
  * ✅ Detection of the "empty cart checkout" bug.

### Navigation Tests

  * ✅ Seamless product page navigation.
  * ✅ Accurate cart page navigation.
  * ✅ Robust user session management.
  * ✅ Reliable logout functionality.

### Performance Tests

  * ✅ Critical page load time validation.
  * ✅ Dedicated performance glitch user testing.

-----

## 🎯 Page Object Model (POM) Implementation

The `HomePage` class (e.g., `cypress/pages/HomePage.ts` and `playwright/pages/home.page.ts`) is a cornerstone of this project's maintainability. It provides:

  * **Element Selectors**: Centralized and organized element identification.
  * **Action Methods**: Reusable methods for common user interactions.
  * **Validation Methods**: Dedicated assertion methods for precise test verification.
  * **Data-driven Testing**: Seamless integration with fixtures and faker for dynamic test scenarios.

-----

## 📊 Robust Test Data Management

### Fixtures

  * `loginTestCases.json`: A comprehensive set of login scenarios.
  * `users.json`: User credentials, meticulously organized by type.

### Dynamic Data

Leveraging `@faker-js/faker` for:

  * Random first and last names.
  * Random postal codes.
  * Dynamic form data generation, making tests more flexible.

### Environment Variables

Configurable through the `.env` file, enabling easy adjustment of:

  * Base URL.
  * Timeouts.
  * Performance thresholds.

-----

## 🔧 Custom Commands (Cypress Example)

The `cypress/support/commands.ts` file includes a suite of reusable custom commands that streamline test writing:

```typescript
cy.loginWithValidCredentials()       // Quick valid login
cy.loginWithCredentials(user, pass) // Login with specific credentials
cy.addItemToCart(index)             // Add item by index
cy.removeItemFromCart(index)        // Remove item by index
cy.goToCart()                       // Navigate to the cart
cy.validateCartBadge(count)         // Validate cart item count
```

-----

## 🎨 TypeScript Configuration

Both projects are configured with robust TypeScript settings:

  * **Strict Mode**: Enabled for superior type safety and fewer runtime errors.
  * **Path Mapping**: Simplified imports with aliases for cleaner code.
  * **Type Checking**: Full TypeScript support, enhancing IDE experience and code quality.
  * **ES Modules**: Modern JavaScript module support for better organization.

### Debugging & Reporting

  * **Screenshots**: Automatic screenshots are captured on test failures and saved in `cypress/screenshots/`.
  * **Videos**: Test execution videos are saved in `cypress/videos/` for detailed analysis.
  * **Debug Mode**:
    ```bash
    npm run test:debug         # Run tests with debugging enabled (Cypress)
    ```
  * **Browser DevTools**: Accessible in interactive mode for deep debugging sessions.

-----

## 🚦 CI/CD Integration

### Playwright workflow 
  * Please review Playwright CI/CD pipeline; this was only created for Playwright only but the same principles would be replicated for Cypress. https://github.com/steviebdesignstraining/waracle_takehome_Test/actions

  * Please see status of workflow run [![Playwright + GitHub Pages Deployment](https://github.com/steviebdesignstraining/waracle_takehome_Test/actions/workflows/main.yml/badge.svg)](https://github.com/steviebdesignstraining/waracle_takehome_Test/actions/workflows/main.yml)
  * [![Playwright + GitHub Pages Deployment](https://github.com/steviebdesignstraining/waracle_takehome_Test/actions/workflows/main.yml/badge.svg?event=workflow_run)](https://github.com/steviebdesignstraining/waracle_takehome_Test/actions/workflows/main.yml)

### Parallel Execution (Cypress)

```bash
npm run test:parallel      # Run tests in parallel (requires Cypress Dashboard)
```

### Retry Configuration

  * **Run Mode**: Configured for 2 retries to handle flaky tests.
  * **Open Mode**: Set to 0 retries for focused development.

### Environment Configuration

Tests can be easily configured for different environments by simply updating the `.env` file.

-----

## 📈 Best Practices Implemented

This project is a testament to applying industry-standard best practices in test automation:

1.  **Page Object Model**: For a highly maintainable and scalable test structure.
2.  **TypeScript**: Ensures type safety and provides a superior developer experience.
3.  **Fixtures**: Centralizes and manages test data effectively.
4.  **Custom Commands/Helpers**: Promotes reusability and reduces code duplication.
5.  **Environment Configuration**: Offers flexibility for different testing environments.
6.  **Comprehensive Error Handling**: Robust management of test failures.
7.  **Performance Testing**: Includes critical page load time validation.
8.  **Cross-browser Testing**: Ensures broad compatibility.
9.  **Retry Logic**: Enhances test reliability by mitigating flakiness.
10. **Thorough Documentation**: Provides clear setup and usage guides.

-----

## 🐛 Known Issues & Troubleshooting

While robust, here are a few considerations:

1.  **Page Load Timeout**: Increased to 120 seconds to enhance reliability on slower connections.
2.  **Network Dependencies**: Tests require a stable internet connection as they interact with an external service.
3.  **SauceDemo Availability**: Test execution is dependent on the availability of the external SauceDemo application.

### Troubleshooting Steps:

For any issues or questions during execution:

1.  Always **check the test execution videos and screenshots** first.
2.  **Review the console output** for detailed error messages.
3.  **Validate your environment configuration** in the `.env` file.
4.  **Ensure all dependencies are properly installed** (`npm install`).

-----

## 💡 Potential Enhancements

I believe in continuous improvement, and here are a few ideas for future enhancements:

  * **API Testing Integration**: Complementing UI tests with direct API validations.
  * **Visual Regression Testing**: Integrating tools like Percy or Applitools to detect visual changes.
  * **Mobile Responsive Testing**: Ensuring optimal display and functionality across various devices.
  * **Docker Containerization**: Packaging the test environments for consistent execution.
  * **Advanced Reporting with Allure**: Further customization and richer data in reports.
  * **Database Validation**: Incorporating checks against the backend database.
  * **Email Testing Scenarios**: Automating tests for email notifications.

-----
