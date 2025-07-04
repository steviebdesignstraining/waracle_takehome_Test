### Introduction
Hi there! Before we have lift-off into the code-verse, I would like to take the time to introduce myself to you!! 


<img src="Stephen_.png"alt="Stephen Bennett" width="150" height="150">
My name is Stephen Bennett and I want to thank you for taking the time the time to consider me for the QA role that your team is hiring for. 

I have been testing for over 12 years and I enjoy working in the development space. I am a bit of a LoonieToons, ambivert, friendly, positive and optimistic. I am sociable and I can work well with different personalities and can adapt in different environments. 

First off I really enjoyed completing the takehome test, that I kind of got carried away into the code-vers and I created two automation framework in Cypress and Playwright. I was close to starting a third framework in Python and Selenium, but maybe that would be pushing it, so I created manual test plans to guide me with planning and writing my scripts. 

So lets get into what I have done!  

### Overview
This project contains automated browser tests for a simple MVP online shop built by Waracle. The goal is to validate the core functionality of the site and provide confidence in ongoing development by covering key user flows such as login, product display, cart actions, and error handling.

🔍 Scope
Automated testing of core user scenarios using multiple test accounts:

✅ standard_user: Expected normal behavior

❌ locked_out_user: Should fail to log in

⚠️ problem_user: Images fail to load

🐢 performance_glitch_user: Tests resilience under load delays

Tests are implemented using [your chosen testing framework] and follow best practices in automation and QA.

Focused on functionality, maintainability, and completeness, with production-level structure and documentation.

🔗 (https://qa-challenge.codesubmit.io)

### Brief Overview
As mentioned in my introduction, I have created a manual test plan, outlining the key user flows, cases, and scenarios that I have automated. The test plan is designed to cover the most fundamental features of the online shop, ensuring that critical functionalities are thoroughly tested. Test plan - [https://continuous-place-db3.notion.site/Waracle-s-Test-22440221abc080999c27cd86186c22a2?source=copy_link]


### Setup instructions
1. **Clone the repository** Repo [git clone http://waracle-1-xqmgza@git.codesubmit.io/waracle-1/qa-hiring-iliptv] 

(if not already done):
   ```bash | Cypress
   cd /Users/stephenbennett/Documents/WaracleTest/qa-hiring-iliptv/cypress
   ```
   ```bash | Playwright
   cd /Users/stephenbennett/Documents/WaracleTest/qa-hiring-iliptv/playwright
   ```
**Install dependencies:**: npm install

**Open Playwright GUI**: npx playwright test --ui

**Open Cypress GUI:**: npm run cypress:open

**Run Playwright**: npx playwright test

**Run Cypress**: npm run test

**Run Report:**  allure serve allure-results 

> (Both Cypress and playwright: *Please insure that you are in the correct directory*)
>

## 🚀 Features

- **TypeScript Support**: Full TypeScript implementation with proper type checking
- **Page Object Model**: Maintainable and scalable test architecture
- **Fixtures**: Test data management using JSON fixtures
- **Environment Configuration**: Configurable test environment using .env files
- **Custom Commands**: Reusable Cypress commands for common actions
- **Fake Data Generation**: Using @faker-js/faker for dynamic test data
- **Multiple Test Scenarios**: Comprehensive test coverage including login, cart operations, checkout, and error handling
- **Cross-browser Testing**: Support for Chrome, Firefox, and Edge browsers
- **Retry Logic**: Automatic test retries for improved reliability


## Project Structure
### cypress
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
│   │   └── e2e.ts             # Global test configuration
│   ├── screenshots/            # Test failure screenshots
│   └── videos/                 # Test execution videos
├── .env                        # Environment variables
├── cypress.config.ts           # Cypress configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md     

### playwright
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

### Interactive Mode (Cypress GUI)
```bash
npm run cypress:open
```

### Headless Mode (CI/CD)
```bash
npm test                    # Run all tests
npm run test:main          # Run main test suite
npm run test:headed        # Run with browser visible
```

### Browser-specific Tests
```bash
npm run test:chrome        # Run in Chrome
npm run test:firefox       # Run in Firefox
npm run test:edge          # Run in Edge
```

### Test Categories
```bash
npm run test:auth          # Authentication tests only
npm run test:cart          # Shopping cart tests only
npm run test:performance   # Performance tests only
npm run test:smoke         # Smoke tests only
```

### Utility Commands
```bash
npm run validate:types     # TypeScript type checking
npm run clean             # Clean screenshots/videos


### Headless Mode (CI/CD)


## 📝 Test Scenarios
### Authentication Tests
- ✅ Multiple login scenarios (valid/invalid users)
- ✅ Standard user login
- ✅ Problem user login with broken image detection
- ✅ Performance glitch user with load time validation
- ✅ Error handling for locked out users

### Shopping Cart Tests
- ✅ Add single item to cart
- ✅ Add multiple items to cart
- ✅ Remove items from cart
- ✅ Cart validation and empty state checks

### Checkout Tests
- ✅ Complete checkout flow with faker data
- ✅ Checkout with specific test data
- ✅ Empty cart checkout (bug detection)

### Navigation Tests
- ✅ Product page navigation
- ✅ Cart page navigation
- ✅ User session management
- ✅ Logout functionality

### Mocking API Responses
- ✅ Mocked API responses for stable tests
- ✅ Integration with `cypress-mock-server` for dynamic data

### Performance Tests
- ✅ Page load time validation
- ✅ Performance glitch user testing

## Page Object Model

The `HomePage` class (`cypress/pages/HomePage.ts`) provides:

- **Element Selectors**: Centralized element identification
- **Action Methods**: Reusable methods for user interactions
- **Validation Methods**: Assertion methods for test verification
- **Data-driven Testing**: Integration with fixtures and faker
### Authentication Tests
- ✅ Multiple login scenarios (valid/invalid users)
- ✅ Standard user login
- ✅ Problem user login with broken image detection
- ✅ Performance glitch user with load time validation
- ✅ Error handling for locked out users

### Shopping Cart Tests
- ✅ Add single item to cart
- ✅ Add multiple items to cart
- ✅ Remove items from cart
- ✅ Cart validation and empty state checks

### Checkout Tests
- ✅ Complete checkout flow with faker data
- ✅ Checkout with specific test data
- ✅ Empty cart checkout (bug detection)

### Navigation Tests
- ✅ Product page navigation
- ✅ Cart page navigation
- ✅ User session management
- ✅ Logout functionality

### Performance Tests
- ✅ Page load time validation
- ✅ Performance glitch user testing

## 🎯 Page Object Model

The `HomePage` class (`cypress/pages/HomePage.ts`) provides:

- **Element Selectors**: Centralized element identification
- **Action Methods**: Reusable methods for user interactions
- **Validation Methods**: Assertion methods for test verification
- **Data-driven Testing**: Integration with fixtures and faker

## 📊 Test Data Management

### Fixtures
- `loginTestCases.json`: Various login scenarios
- `users.json`: User credentials organized by type

### Dynamic Data
Using `@faker-js/faker` for:
- Random first/last names
- Random postal codes
- Dynamic form data

### Environment Variables
Configurable through `.env`:
- Base URL
- Timeouts
- Performance thresholds

## 🔧 Custom Commands

Available custom commands (`cypress/support/commands.ts`):

```typescript
cy.loginWithValidCredentials()           // Quick valid login
cy.loginWithCredentials(user, pass)     // Login with specific credentials
cy.addItemToCart(index)                 // Add item by index
cy.removeItemFromCart(index)            // Remove item by index
cy.goToCart()                           // Navigate to cart
cy.validateCartBadge(count)             // Validate cart item count
```

## 🎨 TypeScript Configuration

- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: Simplified imports with aliases
- **Type Checking**: Full TypeScript support for Cypress
- **ES Modules**: Modern JavaScript module support

### Screenshots
Automatic screenshots on test failure saved in `cypress/screenshots/`

### Videos
Test execution videos saved in `cypress/videos/`

### Debug Mode
```bash
npm run test:debug         # Run with debugging enabled
```

### Browser DevTools
Access browser developer tools in interactive mode for debugging

## 🚦 CI/CD Integration

### Parallel Execution
```bash
npm run test:parallel      # Run tests in parallel (requires Cypress Dashboard)
```

### Retry Configuration
- **Run Mode**: 2 retries for flaky tests
- **Open Mode**: 0 retries for development

### Environment Configuration
Tests can be configured for different environments by updating the `.env` file.

## 📈 Best Practices Implemented

1. **Page Object Model**: Maintainable test structure
2. **TypeScript**: Type safety and better IDE support
3. **Fixtures**: Centralized test data management
4. **Custom Commands**: Reusable test actions
5. **Environment Configuration**: Flexible test setup
6. **Error Handling**: Comprehensive test failure management
7. **Performance Testing**: Load time validation
8. **Cross-browser Testing**: Multiple browser support
9. **Retry Logic**: Improved test reliability
10. **Documentation**: Comprehensive setup and usage guides

## 🐛 Known Issues

1. **Page Load Timeout**: Increased to 120 seconds for better reliability
2. **Network Dependencies**: Tests require stable internet connection
3. **SauceDemo Availability**: Tests depend on external service availability

##  Troubleshooting

For issues or questions:
1. Check the test execution videos and screenshots
2. Review the console output for detailed error messages
3. Validate environment configuration in `.env`
4. Ensure all dependencies are properly installed

## 🎯 Potential Enhancements

- API testing integration
- Visual regression testing
- Mobile responsive testing
- Docker containerization
- Advanced reporting with Allure
- Database validation
- Email testing scenarios