import homePage     from '../../../support/pages/HomePage'
import loginPage    from '../../../support/pages/LoginPage'
import productsPage from '../../../support/pages/ProductsPage'
import cartPage     from '../../../support/pages/CartPage'
import checkoutPage from '../../../support/pages/CheckoutPage'

describe('Checkout', () => {
  it('TC15 - Pedido: registrar antes do checkout', { tags: ['checkout', 'ui'] }, () => {
    Cypress.allure?.feature('Checkout')
    Cypress.allure?.story('Registro Antes do Checkout')
    Cypress.allure?.severity('critical')

    const email = `testuser_${Date.now()}@test.com`

    homePage.visit()
    homePage.clickSignupLogin()
    loginPage.fillSignupName('Test User')
    loginPage.fillSignupEmail(email)
    loginPage.clickSignupButton()
    loginPage.fillAccountInfo({ title: 'Mr', password: 'Test@1234', birth_date: '10', birth_month: 'May', birth_year: '1990' })
    loginPage.fillAddressInfo({ firstname: 'Test', lastname: 'User', company: 'QA', address1: '123 St', address2: '', country: 'United States', state: 'CA', city: 'LA', zipcode: '90001', mobile_number: '555123' })
    loginPage.clickCreateAccount()
    loginPage.verifyAccountCreated()
    loginPage.clickContinue()
    cy.verifyLoggedIn()

    homePage.clickProducts()
    productsPage.hoverAndAddToCart(0)
    productsPage.clickViewCart()
    cartPage.clickProceedToCheckout()
    checkoutPage.verifyAddressDetails()
    checkoutPage.fillOrderComment('Pedido teste TC15')
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
