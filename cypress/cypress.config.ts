import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import { allureCypress } from "allure-cypress/reporter";

// Load environment variables
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 60000,
    watchForFileChanges: false,
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    fixturesFolder: "cypress/fixtures",
    supportFile: "cypress/support/e2e.ts",
    projectId: "wixjju",
    // ...rest of the Cypress project config
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    retries: {
      runMode: 2,
      openMode: 1,
    },
    experimentalStudio: false,
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      // Handle uncaught exceptions should be placed in support/e2e.ts, not here.

      // Clear downloads folder before each run
      on("before:run", (details) => {
        console.log("Starting test run");
      });

      // Register Allure reporter
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      return config;
    },
    env: {
      BASE_URL: process.env.BASE_URL || "https://www.saucedemo.com",
      DEFAULT_TIMEOUT: process.env.DEFAULT_TIMEOUT || "10000",
      MAX_LOAD_TIME: process.env.MAX_LOAD_TIME || "3000",
    },
  },
});
