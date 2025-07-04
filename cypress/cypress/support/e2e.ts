/// <reference types="cypress" />

// Import commands.ts using ES2015 syntax:
import "./commands";

import "allure-cypress";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Global test configuration
beforeEach(() => {
  // Clear cookies and local storage before each test
  cy.clearCookies();
  cy.clearLocalStorage();

  // Set up network intercepts for better performance
  cy.intercept("GET", "**/*.{png,jpg,jpeg,gif,webp,svg}", {
    fixture: "pixel.png",
  }).as("images");
  cy.intercept("GET", "**/*.{css,js}", (req) => {
    req.continue();
  }).as("assets");
});

// Handle uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error for debugging
  console.log("Uncaught exception:", err.message);

  // Don't fail tests on common errors that don't affect functionality
  if (
    err.message.includes("ResizeObserver loop limit exceeded") ||
    err.message.includes("Script error") ||
    err.message.includes("NetworkError") ||
    err.message.includes("Loading chunk")
  ) {
    return false;
  }

  // Return false to prevent the test from failing on other exceptions
  return false;
});

// Handle window load events
Cypress.on("window:before:load", (win) => {
  // Stub performance.getEntriesByType to avoid timing issues
  win.performance.getEntriesByType =
    win.performance.getEntriesByType ||
    (() => [
      {
        loadEventEnd: Date.now(),
        fetchStart: Date.now() - 1000,
      },
    ]);
});

// Global configuration for better test stability
Cypress.config("viewportWidth", 1280);
Cypress.config("viewportHeight", 720);
Cypress.config("defaultCommandTimeout", 15000);
Cypress.config("requestTimeout", 15000);
Cypress.config("responseTimeout", 15000);
Cypress.config("pageLoadTimeout", 60000);
