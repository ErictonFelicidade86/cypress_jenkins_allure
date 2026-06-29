import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'

describe('Produtos', () => {
  it('TC18 - Visualizar produtos por categoria', { tags: ['products', 'ui'] }, () => {
    Cypress.allure.feature('Produtos')
    Cypress.allure.story('Categorias')
    Cypress.allure.severity('normal')

    homePage.visit()
    cy.get('.left-sidebar').should('be.visible')

    productsPage.clickCategory('Women')
    productsPage.clickSubCategory('Dress')
    productsPage.verifyCategoryPage('Women - Dress')

    productsPage.clickCategory('Men')
    productsPage.clickSubCategory('Tshirts')
    productsPage.verifyCategoryPage('Men - Tshirts')
  })
})
