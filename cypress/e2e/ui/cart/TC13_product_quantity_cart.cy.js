import homePage from '../../../support/pages/HomePage'
import cartPage  from '../../../support/pages/CartPage'

describe('Carrinho', () => {
  it('TC13 - Verificar quantidade do produto no carrinho', { tags: ['cart', 'ui'] }, () => {
    Cypress.allure.feature('Carrinho')
    Cypress.allure.story('Quantidade')
    Cypress.allure.severity('normal')

    homePage.visit()
    cy.get('.choose a').first().click()

    cy.get('[data-qa="quantity"]').clear().type('4')
    cy.get('button.cart').click()
    cy.get('.modal-body a[href="/view_cart"]').click()

    cartPage.verifyProductQuantity(0, '4')
  })
})
