import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'

describe('Produtos', () => {
  it('TC09 - Buscar produto por nome', { tags: ['smoke', 'products', 'ui'] }, () => {
    Cypress.allure?.feature('Produtos')
    Cypress.allure?.story('Busca')
    Cypress.allure?.severity('critical')

    homePage.visit()
    homePage.clickProducts()

    productsPage.verifyAllProductsVisible()
    productsPage.searchProduct('top')
    productsPage.verifySearchResultsVisible()
  })
})
