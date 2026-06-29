import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'

describe('Produtos', () => {
  it('TC19 - Visualizar produtos por marca', { tags: ['products', 'ui'] }, () => {
    Cypress.allure?.feature('Produtos')
    Cypress.allure?.story('Marcas')
    Cypress.allure?.severity('normal')

    homePage.visit()
    homePage.clickProducts()

    cy.get('.brands-name').should('be.visible')
    productsPage.clickBrand('Polo')
    productsPage.verifyBrandPage('Polo')

    productsPage.clickBrand('H&M')
    productsPage.verifyBrandPage('H&M')
  })
})
