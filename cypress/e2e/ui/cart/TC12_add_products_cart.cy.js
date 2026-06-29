import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'
import cartPage     from '../../../support/pages/CartPage'

describe('Carrinho', () => {
  it('TC12 - Adicionar múltiplos produtos ao carrinho', { tags: ['smoke', 'cart', 'ui'] }, () => {
    Cypress.allure?.feature('Carrinho')
    Cypress.allure?.story('Adicionar Produtos')
    Cypress.allure?.severity('critical')

    homePage.visit()
    homePage.clickProducts()

    productsPage.hoverAndAddToCart(0)
    productsPage.clickContinueShopping()

    productsPage.hoverAndAddToCart(1)
    productsPage.clickViewCart()

    cartPage.verifyProductCount(2)
  })
})
