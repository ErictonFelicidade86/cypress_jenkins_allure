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

  it('TC02 - Login com email e senha corretos', { tags: ['smoke', 'auth', 'ui'] }, () => {
    Cypress.allure?.feature('Autenticação')
    Cypress.allure?.story('Login')
    Cypress.allure?.severity('critical')

    homePage.visit()
    homePage.verifyPageLoaded()
    homePage.clickSignupLogin()

    loginPage.verifyLoginFormVisible()
    loginPage.login(email, password)

    cy.verifyLoggedIn()
  })
})
