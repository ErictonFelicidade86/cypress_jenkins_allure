import '@shelex/cypress-allure-plugin'
import './commands'

// Suprimir erros de JS não relacionados aos testes
Cypress.on('uncaught:exception', () => false)

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
