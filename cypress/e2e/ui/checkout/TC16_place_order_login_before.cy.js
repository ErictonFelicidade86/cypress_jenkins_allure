import homePage     from '../../../support/pages/HomePage'
import loginPage    from '../../../support/pages/LoginPage'
import productsPage from '../../../support/pages/ProductsPage'
import cartPage     from '../../../support/pages/CartPage'
import checkoutPage from '../../../support/pages/CheckoutPage'

describe('Checkout', () => {
  let email
  const password = 'Test@1234'

  before(() => {
    email = `testuser_${Date.now()}@test.com`
    cy.createUserViaApi(email, password)
  })

  it('TC16 - Pedido: login antes do checkout', { tags: ['checkout', 'ui'] }, () => {
    Cypress.allure?.feature('Checkout')
    Cypress.allure?.story('Login Antes do Checkout')
    Cypress.allure?.severity('critical')

    cy.loginViaUI(email, password)

    homePage.clickProducts()
    productsPage.hoverAndAddToCart(0)
    productsPage.clickViewCart()
    cartPage.clickProceedToCheckout()
    checkoutPage.verifyAddressDetails()
    checkoutPage.fillOrderComment('Pedido teste TC16')
    checkoutPage.clickPlaceOrder()

    cy.fixture('payment').then(({ card }) => {
      checkoutPage.fillPaymentDetails(card)
      checkoutPage.clickPayAndConfirm()
    })

    checkoutPage.verifyOrderSuccess()
    homePage.clickDeleteAccount()
    loginPage.verifyAccountDeleted()
  })
})
