import homePage from '../../../support/pages/HomePage'
import cartPage  from '../../../support/pages/CartPage'

describe('Carrinho', () => {
  it('TC22 - Adicionar item recomendado ao carrinho', { tags: ['cart', 'ui'] }, () => {
    Cypress.allure?.feature('Carrinho')
    Cypress.allure?.story('Itens Recomendados')
    Cypress.allure?.severity('minor')

    homePage.visit()
    homePage.scrollToBottom()

    cy.get('#recommended-item-carousel').should('be.visible')
    homePage.addRecommendedItemToCart()
    cy.get('.modal-body a[href="/view_cart"]').click()

    cartPage.verifyCartPageVisible()
    cartPage.verifyProductCount(1)
  })
})
