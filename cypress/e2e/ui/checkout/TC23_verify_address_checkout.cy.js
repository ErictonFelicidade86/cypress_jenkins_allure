import homePage     from '../../../support/pages/HomePage'
import loginPage    from '../../../support/pages/LoginPage'
import productsPage from '../../../support/pages/ProductsPage'
import cartPage     from '../../../support/pages/CartPage'
import checkoutPage from '../../../support/pages/CheckoutPage'

describe('Checkout', () => {
  it('TC23 - Endereço de entrega igual ao cadastrado', { tags: ['checkout', 'ui'] }, () => {
    Cypress.allure?.feature('Checkout')
    Cypress.allure?.story('Verificação de Endereço')
    Cypress.allure?.severity('normal')

    const email = `testuser_${Date.now()}@test.com`
    const userData = { firstname: 'Test', lastname: 'User', company: 'QA Corp', address1: '123 Test Street', address2: '', country: 'United States', state: 'California', city: 'Los Angeles', zipcode: '90001', mobile_number: '5551234567' }

    homePage.visit()
    homePage.clickSignupLogin()
    loginPage.fillSignupName('Test User')
    loginPage.fillSignupEmail(email)
    loginPage.clickSignupButton()
    loginPage.fillAccountInfo({ title: 'Mr', password: 'Test@1234', birth_date: '10', birth_month: 'May', birth_year: '1990' })
    loginPage.fillAddressInfo(userData)
    loginPage.clickCreateAccount()
    loginPage.verifyAccountCreated()
    loginPage.clickContinue()

    homePage.clickProducts()
    productsPage.hoverAndAddToCart(0)
    productsPage.clickViewCart()
    cartPage.clickProceedToCheckout()

    checkoutPage.verifyDeliveryMatchesRegistration(userData)
    checkoutPage.verifyBillingMatchesRegistration(userData)

    homePage.clickDeleteAccount()
    loginPage.verifyAccountDeleted()
  })
})
