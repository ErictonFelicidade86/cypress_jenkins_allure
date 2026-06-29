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

  it('TC05 - Registro com email já cadastrado', { tags: ['auth', 'ui', 'negative'] }, () => {
    Cypress.allure?.feature('Autenticação')
    Cypress.allure?.story('Registro com Email Duplicado')
    Cypress.allure?.severity('normal')

    homePage.visit()
    homePage.clickSignupLogin()

    loginPage.verifySignupFormVisible()
    loginPage.fillSignupName('Outro User')
    loginPage.fillSignupEmail(email)
    loginPage.clickSignupButton()

    loginPage.verifyEmailExistsError()
  })
})
