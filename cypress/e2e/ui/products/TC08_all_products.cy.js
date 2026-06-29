import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'

describe('Produtos', () => {
  it('TC08 - Verificar lista de produtos e página de detalhe', { tags: ['smoke', 'products', 'ui'] }, () => {
    Cypress.allure.feature('Produtos')
    Cypress.allure.story('Listagem e Detalhe')
    Cypress.allure.severity('critical')

    homePage.visit()
    homePage.verifyPageLoaded()
    homePage.clickProducts()

    productsPage.verifyAllProductsVisible()
    productsPage.clickViewProduct(0)

    productsPage.verifyProductDetailVisible()
  })
})
