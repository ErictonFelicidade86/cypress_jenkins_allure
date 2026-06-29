import homePage from '../../../support/pages/HomePage'

describe('Misc', () => {
  it('TC26 - Scroll Up manual (sem Arrow button)', { tags: ['misc', 'ui'] }, () => {
    Cypress.allure?.feature('Navegação')
    Cypress.allure?.story('Scroll Up Manual')
    Cypress.allure?.severity('minor')

    homePage.visit()
    homePage.scrollToBottom()
    homePage.verifySubscriptionSectionVisible()

    homePage.scrollToTop()
    homePage.verifyHeroText()
  })
})
