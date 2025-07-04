import { expect, request, test } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const API_TOKEN = process.env.API_TOKEN;

let apiContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: API_TOKEN,
    extraHTTPHeaders: {
      accept: "application/json",
      apikey: API_TOKEN!,
    },
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test("Mock login API", async ({ page }) => {
  await page.route("**/login", async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    if (
      postData.username === "standard_user" &&
      postData.password === "secret_sauce"
    ) {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ token: API_TOKEN }),
      });
    } else {
      route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Unauthorized" }),
      });
    }
  });
});

test("Mock products list API", async ({ page }) => {
  await page.route("**/products", async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    if (
      postData.username === "standard_user" &&
      postData.password === "secret_sauce"
    ) {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ token: API_TOKEN }),
      });
      const res = await apiContext.get(API_TOKEN + "/products");
      expect(res.status()).toBe(200);
      const body = await res.text();
      console.log("Homepage Response:", res.status(), body.substring(0, 100));
    } else {
      route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Unauthorized" }),
      });
    }
  });
});
