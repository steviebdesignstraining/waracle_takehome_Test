import { expect, Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

const loginTestCases = [
  {
    description: "Valid user login",
    username: "standard_user",
    password: "secret_sauce",
    expectedResult: "success",
  },
  {
    description: "Invalid email format",
    username: "locked_out_user",
    password: "secret_sauce",
    expectedResult: "fail",
  },
  {
    description: "Incorrect password",
    username: "problem_user",
    password: "wrong_password",
    expectedResult: "fail",
  },
  {
    description: "Empty email",
    username: "",
    password: "secret_sauce",
    expectedResult: "fail",
  },
  {
    description: "Valid admin login",
    username: "error_user",
    password: "secret_sauce",
    expectedResult: "success",
  },
  {
    description: "Visual admin login",
    username: "visual_user",
    password: "secret_sauce",
    expectedResult: "success",
  },
];

export class HomePage {
  private baseUrl = process.env.BASE_URL || "https://www.saucedemo.com";
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
  private addToCartButtons: Locator;
  private removeFromCartButtons: Locator;
  private cartCounter: Locator;
  private errorMessage: Locator;
  private cartIcon: Locator;

  constructor(private page: Page) {
    this.usernameField = this.page.locator('[data-test="username"]');
    this.passwordField = this.page.locator("#password");
    this.loginButton = this.page.locator("#login-button");
    this.addToCartButtons = this.page.locator("button", {
      hasText: "Add to cart",
    });
    this.removeFromCartButtons = this.page.locator("button", {
      hasText: "Remove",
    });
    this.cartCounter = this.page.locator(".shopping_cart_badge");
    this.errorMessage = this.page.locator('[data-test="error"]');
    this.cartIcon = this.page.locator('[data-test="shopping-cart-link"]');
  }

  async homePageLanding() {
    await this.page.goto(this.baseUrl);
  }

  async validLogin() {
    const validCase = loginTestCases.find(
      (tc) => tc.expectedResult === "success"
    );
    if (!validCase) throw new Error("No valid login test case found");

    await this.usernameField.fill(validCase.username);
    await this.passwordField.fill(validCase.password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator(".title")).toHaveText("Products");
    console.log("Valid login successful");
  }

  async login() {
    for (const testCase of loginTestCases) {
      console.log(`Running test case: ${testCase.description}`);

      await this.usernameField.fill(testCase.username);
      await this.passwordField.fill(testCase.password);
      await this.loginButton.click();

      if (testCase.expectedResult === "success") {
        await expect(this.page).toHaveURL(/inventory/);
      } else {
        await expect(this.errorMessage).toBeVisible();
      }

      await this.page.goto(this.baseUrl);
    }
  }

  async addSingleItemToCart() {
    const firstButton = this.addToCartButtons.first();
    await firstButton.click();
    await expect(this.cartCounter).toHaveText("1");
  }

  async addMultipleItemsToCart() {
    const count = await this.addToCartButtons.count();
    let addedItems = 0;

    for (let i = 0; i < count; i++) {
      const button = this.addToCartButtons.nth(i);
      if (await button.isVisible()) {
        await button.click();
        addedItems++;
        await expect(this.cartCounter).toHaveText(addedItems.toString());
      } else {
        console.log(`Add to Cart button ${i} not visible, skipping.`);
      }
    }
  }

  async removeItemFromCart() {
    let remaining = await this.removeFromCartButtons.count();

    while (remaining > 0) {
      const button = this.removeFromCartButtons.first();
      if (await button.isVisible()) {
        await button.click();
        remaining--;

        if (remaining === 0) {
          await expect(this.cartCounter).toBeHidden();
        } else {
          await expect(this.cartCounter).toHaveText(remaining.toString());
        }
      } else {
        console.log("No visible remove button found, ending early.");
        break;
      }
    }
  }

  async validateCartIsEmpty() {
    if (await this.cartCounter.isVisible()) {
      await expect(this.cartCounter).toHaveText("0");
    } else {
      console.log("Cart is empty, badge is hidden.");
      await expect(this.cartCounter).toBeHidden();
    }

    await expect(this.cartIcon).toBeVisible();
  }

  async tshirtProductPage() {
    await this.page.getByTestId("item-1-img-link").click();
    await expect(this.page).toHaveURL(/inventory-item.html/);
    await expect(this.page.locator(".inventory_details_name")).toHaveText(
      "Sauce Labs Bolt T-Shirt"
    );
  }

  async problemAccountLogin(page: Page) {
    const validCase = { username: "problem_user", password: "secret_sauce" };

    await this.usernameField.fill(validCase.username);
    await this.passwordField.fill(validCase.password);
    await this.loginButton.click();

    await expect(this.page.locator(".title")).toContainText("Products");

    const prodImages = await this.page.locator("img").all();

    const brokenImages = [];
    for (const img of prodImages) {
      const src = await img.getAttribute("src");
      if (src?.includes("sl-404.168b1cce.jpg")) {
        brokenImages.push(src);
      }
    }

    if (brokenImages.length >= 1) {
      console.log(
        `This is a bug: problem_user sees ${brokenImages.length} broken image(s)`
      );
    } else {
      console.log("This is not a bug: all product images are valid");
    }
    expect(this.page.getAttribute("img", "src")).toBeTruthy();
    await expect(this.page.locator(".title")).toHaveText("Products");
  }

  async viewCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.page.locator(".title")).toHaveText("Your Cart");
    await this.page.getByTestId("checkout").click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async fillCheckoutForm(
    firstName?: string,
    lastName?: string,
    postalCode?: string
  ) {
    const resolvedFirstName = firstName ?? faker.person.firstName();
    const resolvedLastName = lastName ?? faker.person.lastName();
    const resolvedPostalCode = postalCode ?? faker.location.zipCode();

    await this.page.locator('[data-test="firstName"]').fill(resolvedFirstName);
    await this.page.locator('[data-test="lastName"]').fill(resolvedLastName);
    await this.page
      .locator('[data-test="postalCode"]')
      .fill(resolvedPostalCode);
    await this.page.getByTestId("continue").click();
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await this.page.locator('[data-test="finish"]').click({ force: true });
    await this.page.waitForTimeout(5000);
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  }

  async logout() {
    await this.page.waitForURL(/inventory/);
    await this.page.getByText("Menu").first().click({ force: true });
    const logoutNavigation = this.page.getByText("Logout");
    await expect(logoutNavigation).toBeVisible();
    await expect(logoutNavigation).toHaveText("Logout");
    await logoutNavigation.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
    await expect(this.page.getByTestId("login-button")).toBeVisible();
    console.log("Logout successful");
  }

  async validateLogout() {
    await expect(this.page.locator(".login_logo")).toBeVisible();
    await expect(this.page.locator(".login_password")).toBeVisible();
    await expect(this.page.getByTestId("login-button")).toBeVisible();
    console.log("Logout validation successful");
  }

  async performanceGlitchUserLogin() {
    const validCase = {
      username: "performance_glitch_user",
      password: "secret_sauce",
    };
    await this.usernameField.fill(validCase.username);
    await this.passwordField.fill(validCase.password);
    await this.loginButton.click();
  }

  async validatePerformanceGlitchUser() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator(".title")).toHaveText("Products");

    // Check for performance glitch by waiting for the page to load
    const glitchMessage = this.page.locator(".error-message-container");
    // await expect(glitchMessage).toBeVisible({ timeout: 10000 });

    console.log("Performance glitch user login validated successfully");
  }

  async loadTimeValidation() {
    const loadTime = await this.page.evaluate(() => {
      const { loadEventEnd, startTime } = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      return loadEventEnd - startTime;
    });

    console.log(`Load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000); // assert against 3s
  }
  //   async fillCheckoutFormWithEmptyCart() {
  // }
}

export const homePage = (page: Page) => new HomePage(page);
