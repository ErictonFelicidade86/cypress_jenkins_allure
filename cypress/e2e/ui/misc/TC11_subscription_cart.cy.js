import homePage from '../../../support/pages/HomePage'
import cartPage  from '../../../support/pages/CartPage'

describe('Misc', () => {
  it('TC11 - Subscrição na página do Carrinho', { tags: ['misc', 'ui'] }, () => {
    Cypress.allure?.feature('Newsletter')
    Cypress.allure?.story('Subscrição Cart')
    Cypress.allure?.severity('minor')

    homePage.visit()
    homePage.clickCart()
    cartPage.subscribeWithEmail('sub_cart@test.com')
  })
})
