import loginPage from '../../../support/pages/LoginPage'
import homePage  from '../../../support/pages/HomePage'

describe('Autenticação', () => {
  it('TC03 - Login com credenciais incorretas', { tags: ['auth', 'ui', 'negative'] }, () => {
    Cypress.allure.feature('Autenticação')
    Cypress.allure.story('Login Inválido')
    Cypress.allure.severity('normal')

    homePage.visit()
    homePage.clickSignupLogin()

    loginPage.verifyLoginFormVisible()
    loginPage.login('invalid@notexist.com', 'WrongPass123')

    loginPage.verifyLoginError()
  })
})
