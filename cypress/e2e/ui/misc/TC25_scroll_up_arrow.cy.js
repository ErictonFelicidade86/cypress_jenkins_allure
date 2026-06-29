import homePage from '../../../support/pages/HomePage'

describe('Misc', () => {
  it('TC25 - Scroll Up via botão Arrow', { tags: ['misc', 'ui'] }, () => {
    Cypress.allure?.feature('Navegação')
    Cypress.allure?.story('Scroll Up Arrow')
    Cypress.allure?.severity('minor')

    homePage.visit()
    homePage.scrollToBottom()
    homePage.verifySubscriptionSectionVisible()

    homePage.clickScrollUpArrow()
    homePage.verifyHeroText()
  })
})
