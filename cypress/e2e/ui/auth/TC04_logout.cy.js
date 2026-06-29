import loginPage from '../../../support/pages/LoginPage'
import homePage  from '../../../support/pages/HomePage'

describe('Autenticação', () => {
  let email
  const password = 'Test@1234'

  before(() => {
    email = `testuser_${Date.now()}@test.com`
    cy.createUserViaApi(email, password)
  })

  after(() => {
    cy.deleteUserViaApi(email, password)
  })

  it('TC04 - Logout do usuário autenticado', { tags: ['auth', 'ui'] }, () => {
    Cypress.allure.feature('Autenticação')
    Cypress.allure.story('Logout')
    Cypress.allure.severity('normal')

    cy.loginViaUI(email, password)
    cy.verifyLoggedIn()

    homePage.clickLogout()

    cy.url().should('include', '/login')
    loginPage.verifyLoginFormVisible()
  })
})
