import homePage     from '../../../support/pages/HomePage'
import productsPage from '../../../support/pages/ProductsPage'
import cartPage     from '../../../support/pages/CartPage'

describe('Carrinho', () => {
  let email
  const password = 'Test@1234'

  before(() => {
    email = `testuser_${Date.now()}@test.com`
    cy.createUserViaApi(email, password)
  })

  after(() => {
    cy.deleteUserViaApi(email, password)
  })

  it('TC20 - Produtos buscados permanecem no carrinho após login', { tags: ['cart', 'ui'] }, () => {
    Cypress.allure.feature('Carrinho')
    Cypress.allure.story('Persistência após Login')
    Cypress.allure.severity('critical')

    homePage.visit()
    homePage.clickProducts()

    productsPage.searchProduct('top')
    productsPage.verifySearchResultsVisible()

    productsPage.hoverAndAddToCart(0)
    productsPage.clickViewCart()
    cartPage.verifyProductCount(1)

    homePage.clickSignupLogin()
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()

    cartPage.visit()
    cartPage.verifyProductCount(1)
  })
})
