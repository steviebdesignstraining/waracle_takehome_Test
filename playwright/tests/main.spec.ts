import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

let page: any;
let username: string;
let password: string;
test.describe.serial("Main Page", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    const homePage = new HomePage(page);
    await homePage.homePageLanding();
  });

  test("Login Tests", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.login();
  });

  test("Product page validation", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.tshirtProductPage();
  });

  test("Validate broken products image", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.problemAccountLogin(page);
  });

  test("Performance glitch user", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.performanceGlitchUserLogin();
    await homePage.validatePerformanceGlitchUser();
    await homePage.loadTimeValidation();
  });

  test("Add Single Item to Cart and Validate", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.addSingleItemToCart();
  });

  test("Add Multiple Items to Cart and Validate", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.addMultipleItemsToCart();
  });

  test("Remove an Item from Cart and Validate", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.addSingleItemToCart();
    await homePage.removeItemFromCart();
    await homePage.validateCartIsEmpty();
  });

  test("View cart (empty)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.viewCart();
    await homePage.validateCartIsEmpty();
    console.log("Cart is empty, as expected.");
  });

  test("Checkout with empty cart", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.viewCart();
    await homePage.fillCheckoutForm();
    await homePage.validateCartIsEmpty();
    console.log(
      "Checkout completed successfully, this is a bug as the flow should not complete with an empty cart."
    );
  });

  test("Checkout flow", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.addMultipleItemsToCart();
    await homePage.viewCart();
    await homePage.fillCheckoutForm();
  });

  test("Logout flow", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.validLogin();
    await homePage.logout();
    await homePage.validateLogout();
  });
});
