import loginPage from '../../../support/pages/LoginPage'
import homePage  from '../../../support/pages/HomePage'

describe('Autenticação', () => {
  let email

  beforeEach(() => {
    email = `testuser_${Date.now()}@test.com`
    homePage.visit()
  })

  it('TC01 - Registrar novo usuário com sucesso', { tags: ['smoke', 'auth', 'ui'] }, () => {
    Cypress.allure?.feature('Autenticação')
    Cypress.allure?.story('Registro de Usuário')
    Cypress.allure?.severity('critical')

    homePage.verifyPageLoaded()
    homePage.clickSignupLogin()

    loginPage.verifySignupFormVisible()
    loginPage.fillSignupName('Test User')
    loginPage.fillSignupEmail(email)
    loginPage.clickSignupButton()

    loginPage.verifyAccountInfoVisible()
    loginPage.fillAccountInfo({
      title: 'Mr',
      password: 'Test@1234',
      birth_date: '10',
      birth_month: 'May',
      birth_year: '1990',
    })
    loginPage.fillAddressInfo({
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
    })
    loginPage.clickCreateAccount()
    loginPage.verifyAccountCreated()
    loginPage.clickContinue()

    homePage.verifyLoggedIn ? cy.get('li a').contains('Logged in as').should('be.visible') : null
    cy.verifyLoggedIn()

    homePage.clickDeleteAccount()
    loginPage.verifyAccountDeleted()
  })
})
