import homePage     from '../../../support/pages/HomePage'
import loginPage    from '../../../support/pages/LoginPage'
import productsPage from '../../../support/pages/ProductsPage'
import cartPage     from '../../../support/pages/CartPage'
import checkoutPage from '../../../support/pages/CheckoutPage'

describe('Checkout', () => {
  it('TC24 - Download de fatura após compra', { tags: ['checkout', 'ui'] }, () => {
    Cypress.allure?.feature('Checkout')
    Cypress.allure?.story('Download de Fatura')
    Cypress.allure?.severity('normal')

    const email = `testuser_${Date.now()}@test.com`

    homePage.visit()
    homePage.clickProducts()
    productsPage.hoverAndAddToCart(0)
    productsPage.clickViewCart()
    cartPage.clickProceedToCheckout()
    cartPage.clickRegisterLoginFromModal()

    loginPage.fillSignupName('Test User')
    loginPage.fillSignupEmail(email)
    loginPage.clickSignupButton()
    loginPage.fillAccountInfo({ title: 'Mr', password: 'Test@1234', birth_date: '10', birth_month: 'May', birth_year: '1990' })
    loginPage.fillAddressInfo({ firstname: 'Test', lastname: 'User', company: 'QA', address1: '123 St', address2: '', country: 'United States', state: 'CA', city: 'LA', zipcode: '90001', mobile_number: '555123' })
    loginPage.clickCreateAccount()
    loginPage.verifyAccountCreated()
    loginPage.clickContinue()

    cartPage.visit()
    cartPage.clickProceedToCheckout()
    checkoutPage.fillOrderComment('TC24 - Invoice test')
    checkoutPage.clickPlaceOrder()

    cy.fixture('payment').then(({ card }) => {
      checkoutPage.fillPaymentDetails(card)
      checkoutPage.clickPayAndConfirm()
    })

    checkoutPage.verifyOrderSuccess()
    checkoutPage.clickDownloadInvoice()

    cy.readFile('cypress/downloads/invoice.txt').should('exist')

    checkoutPage.clickContinue()
    homePage.clickDeleteAccount()
    loginPage.verifyAccountDeleted()
  })
})
