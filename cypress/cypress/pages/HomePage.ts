/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

interface LoginTestCase {
  description: string;
  username: string;
  password: string;
  expectedResult: "success" | "fail";
}

interface User {
  username: string;
  password: string;
  type: string;
}

export class HomePage {
  private baseUrl: string =
    Cypress.env("BASE_URL") || "https://www.saucedemo.com";

  // Element selectors
  private selectors = {
    usernameField: '[data-test="username"]',
    passwordField: "#password",
    loginButton: "#login-button",
    addToCartButtons: 'button:contains("Add to cart")',
    removeFromCartButtons: 'button:contains("Remove")',
    cartCounter: ".shopping_cart_badge",
    errorMessage: '[data-test="error"]',
    cartIcon: '[data-test="shopping-cart-link"]',
    productsTitle: ".title",
    menuButton: ".bm-burger-button",
    logoutLink: "#logout_sidebar_link",
    loginLogo: ".login_logo",
    loginPassword: ".login_password",
    inventoryDetailsName: ".inventory_details_name",
    checkoutButton: '[data-test="checkout"]',
    firstNameField: '[data-test="firstName"]',
    lastNameField: '[data-test="lastName"]',
    postalCodeField: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    finishButton: '[data-test="finish"]',
    completeHeader: ".complete-header",
    productImages: "img",
  };

  // Navigation methods
  goToHomePage(): void {
    cy.visit(Cypress.env("BASE_URL"));
  }

  goToProductPage(productId: string = "item-1-img-link"): void {
    cy.get(`[data-test="${productId}"]`).click();
    cy.url().should("include", "/inventory-item.html");
  }

  goToCart(): void {
    cy.get(this.selectors.cartIcon).click();
    cy.url().should("include", "/cart");
    cy.get(this.selectors.productsTitle).should("contain.text", "Your Cart");
  }

  goToCheckout(): void {
    cy.get(this.selectors.checkoutButton).click();
    cy.url().should("include", "/checkout-step-one");
  }

  // Login methods
  loginWithValidCredentials(): void {
    cy.fixture("users").then((users) => {
      const user = users.validUsers.standard_user;
      this.performLogin(user.username, user.password);
      this.verifySuccessfulLogin();
    });
  }

  loginWithCredentials(username: string, password: string): void {
    this.performLogin(username, password);
  }

  performLogin(username: string, password: string): void {
    cy.get(this.selectors.usernameField).clear().type(username);
    cy.get(this.selectors.passwordField).clear().type(password);
    cy.get(this.selectors.loginButton).click();
  }

  verifySuccessfulLogin(): void {
    cy.url().should("include", "/inventory");
    cy.get(this.selectors.productsTitle).should("contain.text", "Products");
  }

  verifyFailedLogin(): void {
    cy.get(this.selectors.errorMessage).should("be.visible");
  }

  // Test all login scenarios from fixtures
  testAllLoginScenarios(): void {
    cy.fixture("loginTestCases").then((testCases: LoginTestCase[]) => {
      testCases.forEach((testCase) => {
        cy.log(`Testing: ${testCase.description}`);

        this.performLogin(testCase.username, testCase.password);

        if (testCase.expectedResult === "success") {
          this.verifySuccessfulLogin();
          cy.url().should("include", "/inventory");
          cy.get(this.selectors.productsTitle).should(
            "contain.text",
            "Products"
          );
          console.log(`Login successful for: ${testCase.description}`);
          cy.visit(Cypress.env("BASE_URL"));
        } else if (testCase.expectedResult === "fail") {
          cy.url().should("not.include", "/inventory");
          cy.get(this.selectors.errorMessage).should("be.visible");
          // cy.visit(Cypress.env("BASE_URL"));
          console.log(`Login failed as expected for: ${testCase.description}`);
        } else {
          console.log(`Unknown expected result for: ${testCase.description}`);
          // Handle unknown expected results

          // // Optionally, you can also
          // this.verifyFailedLogin();
        }
      });
      // cy.visit(Cypress.env("BASE_URL"));
    });
  }

  // Special login methods for specific user types
  loginAsStandardUser(): void {
    cy.fixture("users").then((users) => {
      const user = users.validUsers.standard_user;
      this.performLogin(user.username, user.password);
      this.verifySuccessfulLogin();
    });
  }

  loginAsProblemUser(): void {
    cy.fixture("users").then((users) => {
      const user = users.validUsers.problem_user;
      this.performLogin(user.username, user.password);
      this.verifySuccessfulLogin();
    });
  }

  loginAsPerformanceGlitchUser(): void {
    cy.fixture("users").then((users) => {
      const user = users.validUsers.performance_glitch_user;
      this.performLogin(user.username, user.password);
      this.verifySuccessfulLogin();
    });
  }

  // Cart operations
  addSingleItemToCart(): void {
    cy.get(this.selectors.addToCartButtons).first().click();
    cy.get(this.selectors.cartCounter).should("contain.text", "1");
  }

  addMultipleItemsToCart(): void {
    cy.get(this.selectors.addToCartButtons).then(($buttons) => {
      const buttonCount = $buttons.length;
      let addedItems = 0;
      for (let i = 0; i < buttonCount; i++) {
        if (i >= 3) {
          console.log("Skipping additional items beyond 3");
          break; // Limit to 3 items
        }
        // Check if the button is visible before clicking
        cy.get(this.selectors.addToCartButtons)
          .eq(i)
          .should("be.visible")
          .invoke("show")
          .then(($button) => {
            if ($button.is(":visible")) {
              cy.wrap($button).click();
              addedItems++;
              cy.get(this.selectors.cartCounter).should(
                "contain.text",
                (i + 1).toString()
              );
            } else {
              cy.log(`Add to Cart button ${i} not visible, skipping.`);
            }
          });
      }
    });
  }

  removeItemFromCart(): void {
    cy.get(this.selectors.removeFromCartButtons).then(($buttons) => {
      const initialCount = $buttons.length;

      for (let i = initialCount; i > 0; i--) {
        cy.get(this.selectors.removeFromCartButtons)
          .first()
          .then(($button) => {
            if ($button.is(":visible")) {
              cy.wrap($button).click();

              if (i === 1) {
                cy.get(this.selectors.cartCounter).should("not.exist");
              } else {
                cy.get(this.selectors.cartCounter).should(
                  "contain.text",
                  (i - 1).toString()
                );
              }
            }
          });
      }
    });
  }

  validateCartIsEmpty(): void {
    cy.get(this.selectors.cartCounter).should("not.exist");
    cy.get(this.selectors.cartIcon).should("be.visible");
  }

  // Checkout operations
  fillCheckoutForm(
    firstName?: string,
    lastName?: string,
    postalCode?: string
  ): void {
    const resolvedFirstName = firstName || faker.person.firstName();
    const resolvedLastName = lastName || faker.person.lastName();
    const resolvedPostalCode = postalCode || faker.location.zipCode();

    cy.get(this.selectors.firstNameField).type(resolvedFirstName);
    cy.get(this.selectors.lastNameField).type(resolvedLastName);
    cy.get(this.selectors.postalCodeField).type(resolvedPostalCode);
    cy.get(this.selectors.continueButton).click();

    cy.url().should("include", "/checkout-step-two");
    cy.get(this.selectors.finishButton).click();

    cy.url().should("include", "/checkout-complete");
    cy.get(this.selectors.completeHeader).should(
      "contain.text",
      "Thank you for your order!"
    );
  }

  // Product validation
  validateTshirtProductPage(): void {
    cy.get(this.selectors.inventoryDetailsName).should(
      "contain.text",
      "Sauce Labs Bolt T-Shirt"
    );
  }

  validateBrokenImagesForProblemUser(): void {
    cy.get(this.selectors.productImages).then(($images) => {
      let brokenImageCount = 0;

      $images.each((index, img) => {
        const src = Cypress.$(img).attr("src");
        if (src && src.includes("sl-404.168b1cce.jpg")) {
          brokenImageCount++;
        }
      });

      if (brokenImageCount >= 1) {
        cy.log(
          `Bug detected: problem_user sees ${brokenImageCount} broken image(s)`
        );
      } else {
        cy.log("No broken images detected");
      }

      // Verify that images have src attributes
      cy.get(this.selectors.productImages).should("have.attr", "src");
    });
  }

  // Performance validation
  validatePageLoadTime(): void {
    cy.window().then((win) => {
      const navigation = win.performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;

      cy.log(`Page load time: ${loadTime}ms`);
      expect(loadTime).to.be.lessThan(3000); // Assert load time is less than 3 seconds
    });
  }

  // Logout operations
  logout(): void {
    cy.get(this.selectors.menuButton).click();
    cy.get(this.selectors.logoutLink).should("be.visible").click();
    cy.url().should("eq", "https://www.saucedemo.com/");
    cy.get(this.selectors.loginButton).should("be.visible");
  }

  validateLogout(): void {
    cy.get(this.selectors.loginLogo).should("be.visible");
    cy.get(this.selectors.loginPassword).should("be.visible");
    cy.get(this.selectors.loginButton).should("be.visible");
  }

  // Utility methods
  clearAndVisitHomePage(): void {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(Cypress.env("BASE_URL"), {
      timeout: 30000,
      // failOnStatusCode: false,
      // retryOnStatusCodeFailure: true,
    });
    // Wait for the page to be fully loaded
    // cy.get(this.selectors.usernameField, { timeout: 15000 }).should(
    //   "be.visible"
    // );
    // cy.get(this.selectors.passwordField, { timeout: 15000 }).should(
    //   "be.visible"
    // );
    // cy.get(this.selectors.loginButton, { timeout: 15000 }).should("be.visible");
  }
}
