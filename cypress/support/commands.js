// ─── Custom Commands ───────────────────────────────────────────────────────────

/**
 * Gera email único com timestamp para evitar conflitos entre testes
 */
Cypress.Commands.add('generateEmail', () => {
  return `testuser_${Date.now()}@test.com`
})

/**
 * Registra um novo usuário via API (rápido — sem UI)
 * Ideal para setup de outros testes que precisam de conta criada
 */
Cypress.Commands.add('createUserViaApi', (email, password = 'Test@1234') => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/createAccount`,
    form: true,
    body: {
      name: 'Test User',
      email,
      password,
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'QA Corp',
      address1: '123 Test Street',
      address2: 'Suite 100',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobile_number: '5551234567',
    },
    failOnStatusCode: false,
  })
})

/**
 * Deleta usuário via API (limpeza pós-teste)
 */
Cypress.Commands.add('deleteUserViaApi', (email, password = 'Test@1234') => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/deleteAccount`,
    form: true,
    body: { email, password },
    failOnStatusCode: false,
  })
})

/**
 * Login via UI
 */
Cypress.Commands.add('loginViaUI', (email, password) => {
  cy.visit('/login')
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(password)
  cy.get('[data-qa="login-button"]').click()
  cy.get('li a').contains('Logged in as').should('be.visible')
})

/**
 * Adiciona produto ao carrinho pelo ID
 */
Cypress.Commands.add('addProductToCart', (productId) => {
  cy.visit(`/product_details/${productId}`)
  cy.get('[data-qa="quantity"]').clear().type('1')
  cy.get('button.cart').click()
  cy.get('.modal-footer > .btn').click() // Continue Shopping
})

/**
 * Verifica que está logado
 */
Cypress.Commands.add('verifyLoggedIn', (username) => {
  cy.get('li a').contains('Logged in as').should('be.visible')
  if (username) {
    cy.get('li a b').should('contain', username)
  }
})

/**
 * Realiza checkout completo com dados de pagamento
 */
Cypress.Commands.add('completePayment', () => {
  cy.fixture('payment').then(({ card }) => {
    cy.get('[data-qa="name-on-card"]').type(card.name)
    cy.get('[data-qa="card-number"]').type(card.number)
    cy.get('[data-qa="cvc"]').type(card.cvc)
    cy.get('[data-qa="expiry-month"]').type(card.expiry_month)
    cy.get('[data-qa="expiry-year"]').type(card.expiry_year)
    cy.get('[data-qa="pay-button"]').click()
  })
})
