import homePage from '../../../support/pages/HomePage'

describe('Misc', () => {
  it('TC10 - Subscrição na Home Page', { tags: ['misc', 'ui'] }, () => {
    Cypress.allure.feature('Newsletter')
    Cypress.allure.story('Subscrição Home')
    Cypress.allure.severity('normal')

    homePage.visit()
    homePage.verifyPageLoaded()
    homePage.subscribeWithEmail('subscriber@test.com')
    homePage.verifySubscriptionSuccess()
  })
})
