import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'
import cartPage     from '../../../support/pages/CartPage'

describe('Carrinho', () => {
  it('TC17 - Remover produto do carrinho', { tags: ['cart', 'ui'] }, () => {
    Cypress.allure.feature('Carrinho')
    Cypress.allure.story('Remover Produto')
    Cypress.allure.severity('critical')

    homePage.visit()
    homePage.clickProducts()

    productsPage.hoverAndAddToCart(0)
    productsPage.clickViewCart()

    cartPage.verifyProductCount(1)
    cartPage.removeProduct(0)
    cartPage.verifyCartEmpty()
  })
})
