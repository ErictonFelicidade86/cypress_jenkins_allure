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

// Prevenir redirect loop em CI (GitHub Actions IPs são bloqueados pelo site)
Cypress.Commands.overwrite('request', (originalFn, ...args) => {
  const opts = typeof args[0] === 'object' ? args[0] : { url: args[0] }
  return originalFn({ failOnStatusCode: false, ...opts })
})

beforeEach(() => {
  if (Cypress.env('allure') && Cypress.allure) {
    Cypress.allure.startStep(`Acessando: ${Cypress.currentTest.title}`)
  }
})

afterEach(() => {
  if (Cypress.env('allure') && Cypress.allure) {
    Cypress.allure.endStep()
  }
})
