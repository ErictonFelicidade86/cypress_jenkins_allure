import '@shelex/cypress-allure-plugin'
import './commands'

// Suprimir erros de JS não relacionados aos testes
Cypress.on('uncaught:exception', () => false)

beforeEach(() => {
  Cypress.allure.startStep(`Acessando: ${Cypress.currentTest.title}`)
})

afterEach(() => {
  Cypress.allure.endStep()
})
