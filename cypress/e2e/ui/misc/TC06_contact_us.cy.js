import homePage    from '../../../support/pages/HomePage'
import contactPage from '../../../support/pages/ContactPage'

describe('Misc', () => {
  it('TC06 - Enviar formulário de contato', { tags: ['misc', 'ui'] }, () => {
    Cypress.allure?.feature('Contato')
    Cypress.allure?.story('Formulário de Contato')
    Cypress.allure?.severity('normal')

    homePage.visit()
    homePage.verifyPageLoaded()
    homePage.clickContactUs()

    contactPage.verifyGetInTouchVisible()
    contactPage.fillContactForm('Test User', 'contact@test.com', 'Dúvida sobre pedido', 'Gostaria de saber o status do meu pedido #12345.')
    contactPage.uploadFile('user.json')

    cy.on('window:confirm', () => true)
    contactPage.clickSubmit()
    contactPage.verifySuccessMessage()

    contactPage.clickHomeButton()
    homePage.verifyPageLoaded()
  })
})
