/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with valid credentials
       * @example cy.loginWithValidCredentials()
       */
      loginWithValidCredentials(): Chainable<Element>
      
      /**
       * Custom command to login with specific credentials
       * @example cy.loginWithCredentials('standard_user', 'secret_sauce')
       */
      loginWithCredentials(username: string, password: string): Chainable<Element>
      
      /**
       * Custom command to add item to cart by index
       * @example cy.addItemToCart(0)
       */
      addItemToCart(itemIndex: number): Chainable<Element>
      
      /**
       * Custom command to remove item from cart by index
       * @example cy.removeItemFromCart(0)
       */
      removeItemFromCart(itemIndex: number): Chainable<Element>
      
      /**
       * Custom command to navigate to cart
       * @example cy.goToCart()
       */
      goToCart(): Chainable<Element>
      
      /**
       * Custom command to validate cart badge count
       * @example cy.validateCartBadge(3)
       */
      validateCartBadge(expectedCount: number): Chainable<Element>
    }
  }
}

// Login with valid credentials
Cypress.Commands.add('loginWithValidCredentials', () => {
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('#password').type('secret_sauce')
  cy.get('#login-button').click()
  cy.url().should('include', '/inventory')
})

// Login with specific credentials
Cypress.Commands.add('loginWithCredentials', (username: string, password: string) => {
  cy.get('[data-test="username"]').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

// Add item to cart
Cypress.Commands.add('addItemToCart', (itemIndex: number) => {
  cy.get('button').contains('Add to cart').eq(itemIndex).click()
})

// Remove item from cart
Cypress.Commands.add('removeItemFromCart', (itemIndex: number) => {
  cy.get('button').contains('Remove').eq(itemIndex).click()
})

// Navigate to cart
Cypress.Commands.add('goToCart', () => {
  cy.get('[data-test="shopping-cart-link"]').click()
})

// Validate cart badge count
Cypress.Commands.add('validateCartBadge', (expectedCount: number) => {
  if (expectedCount === 0) {
    cy.get('.shopping_cart_badge').should('not.exist')
  } else {
    cy.get('.shopping_cart_badge').should('contain.text', expectedCount.toString())
  }
})

export {}
