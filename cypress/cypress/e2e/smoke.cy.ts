/// <reference types="cypress" />

describe('Smoke Test - Basic Connectivity', () => {
  it('should be able to visit the SauceDemo site', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')
    cy.title().should('contain', 'Swag Labs')
  })

  it('should be able to login with valid credentials', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory')
    cy.get('.title').should('contain', 'Products')
  })
})
