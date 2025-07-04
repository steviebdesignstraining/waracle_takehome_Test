/// <reference types="cypress" />

import { HomePage } from "../pages/HomePage";

describe("SauceDemo E2E Tests", () => {
  let homePage: HomePage;

  beforeEach(() => {
    homePage = new HomePage();
    // cy.visit(Cypress.env("BASE_URL"));
    homePage.clearAndVisitHomePage();
  });

  describe("Authentication Tests", () => {
    it("should test all login scenarios from fixtures", () => {
      homePage.testAllLoginScenarios();
    });

    it("should login with valid standard user credentials", () => {
      homePage.loginAsStandardUser();
    });

    it("should handle problem user login and detect broken images", () => {
      homePage.loginAsProblemUser();
      homePage.validateBrokenImagesForProblemUser();
    });

    it("should handle performance glitch user login", () => {
      homePage.loginAsPerformanceGlitchUser();
      homePage.validatePageLoadTime();
    });
  });

  describe("Product and Navigation Tests", () => {
    beforeEach(() => {
      homePage.loginAsStandardUser();
    });

    it("should validate product page navigation", () => {
      homePage.goToProductPage();
      homePage.validateTshirtProductPage();
    });

    it("should navigate to cart and validate empty state", () => {
      homePage.goToCart();
      homePage.validateCartIsEmpty();
    });
  });

  describe("Shopping Cart Tests", () => {
    beforeEach(() => {
      homePage.loginAsStandardUser();
    });

    it("should add single item to cart and validate", () => {
      homePage.addSingleItemToCart();
    });

    it("should add multiple items to cart and validate", () => {
      homePage.addMultipleItemsToCart();
    });

    it("should remove item from cart and validate empty state", () => {
      homePage.addSingleItemToCart();
      homePage.removeItemFromCart();
      homePage.validateCartIsEmpty();
    });

    it("should complete checkout flow with items in cart", () => {
      homePage.addMultipleItemsToCart();
      homePage.goToCart();
      homePage.goToCheckout();
      homePage.fillCheckoutForm();
    });

    it("should attempt checkout with empty cart (bug detection)", () => {
      homePage.goToCart();
      homePage.goToCheckout();
      homePage.fillCheckoutForm();
      cy.log("Bug detected: Checkout completed with empty cart");
    });
  });

  describe("User Session Tests", () => {
    it("should complete full user journey with logout", () => {
      homePage.loginAsStandardUser();
      homePage.addMultipleItemsToCart();
      homePage.goToCart();
      homePage.goToCheckout();
      homePage.fillCheckoutForm();

      // Navigate back to inventory for logout
      // cy.visit("/inventory");
      homePage.logout();
      homePage.validateLogout();
    });

    it("should logout successfully and validate login page", () => {
      homePage.loginAsStandardUser();
      homePage.logout();
      homePage.validateLogout();
    });
  });

  describe("Performance Tests", () => {
    it("should validate page load performance", () => {
      homePage.loginAsStandardUser();
      homePage.validatePageLoadTime();
    });
  });

  describe("Error Handling Tests", () => {
    it("should handle invalid login attempts", () => {
      cy.fixture("users").then((users) => {
        const invalidUser = users.invalidUsers.invalid_user;
        homePage.loginWithCredentials(
          invalidUser.username,
          invalidUser.password
        );
        homePage.verifyFailedLogin();
      });
    });

    it("should handle locked out user", () => {
      cy.fixture("users").then((users) => {
        const lockedUser = users.invalidUsers.locked_out_user;
        homePage.loginWithCredentials(lockedUser.username, lockedUser.password);
        homePage.verifyFailedLogin();
      });
    });

    it("should handle empty credentials", () => {
      homePage.loginWithCredentials(" ", " ");
      homePage.verifyFailedLogin();
    });
  });

  describe("Data-Driven Tests", () => {
    it("should run checkout with random generated data", () => {
      homePage.loginAsStandardUser();
      homePage.addSingleItemToCart();
      homePage.goToCart();
      homePage.goToCheckout();

      // Use faker for random data generation
      homePage.fillCheckoutForm();
    });

    it("should run checkout with specific test data", () => {
      homePage.loginAsStandardUser();
      homePage.addSingleItemToCart();
      homePage.goToCart();
      homePage.goToCheckout();

      // Use specific test data
      homePage.fillCheckoutForm("John", "Doe", "12345");
    });
  });
});
