import '@shelex/cypress-allure-plugin'
import '@cypress/grep'
import 'cypress-plugin-api'
import './commands'

// Suprimir erros de JS nao relacionados aos testes
Cypress.on('uncaught:exception', () => false)

// Ignorar status codes de erro no cy.visit() — automationexercise.com retorna 500 esporadicamente
Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  return originalFn(url, { failOnStatusCode: false, ...options })
})

beforeE