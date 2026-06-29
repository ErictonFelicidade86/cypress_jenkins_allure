import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'

describe('Produtos', () => {
  it('TC21 - Adicionar avaliação em produto', { tags: ['products', 'ui'] }, () => {
    Cypress.allure.feature('Produtos')
    Cypress.allure.story('Avaliações')
    Cypress.allure.severity('minor')

    homePage.visit()
    homePage.clickProducts()
    productsPage.clickViewProduct(0)

    productsPage.verifyWriteReviewVisible()
    productsPage.submitReview('Test User', 'review@test.com', 'Ótimo produto, recomendo!')
    productsPage.verifyReviewSuccess()
  })
})
