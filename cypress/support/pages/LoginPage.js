class LoginPage {
  visit() { cy.visit('/login') }

  // ─── Login ───────────────────────────────────────────
  verifyLoginFormVisible() {
    cy.get('.login-form h2').should('contain', 'Login to your account')
  }

  fillLoginEmail(email)       { cy.get('[data-qa="login-email"]').type(email) }
  fillLoginPassword(password) { cy.get('[data-qa="login-password"]').type(password) }
  clickLoginButton()          { cy.get('[data-qa="login-button"]').click() }

  login(email, password) {
    this.fillLoginEmail(email)
    this.fillLoginPassword(password)
    this.clickLoginButton()
  }

  verifyLoginError() {
    cy.get('.login-form p').should('contain', 'Your email or password is incorrect!')
  }

  // ─── Signup ──────────────────────────────────────────
  verifySignupFormVisible() {
    cy.get('.signup-form h2').should('contain', 'New User Signup!')
  }

  fillSignupName(name)   { cy.get('[data-qa="signup-name"]').type(name) }
  fillSignupEmail(email) { cy.get('[data-qa="signup-email"]').type(email) }
  clickSignupButton()    { cy.get('[data-qa="signup-button"]').click() }

  verifyEmailExistsError() {
    cy.get('.signup-form p').should('contain', 'Email Address already exist!')
  }

  // ─── Account Info ────────────────────────────────────
  verifyAccountInfoVisible() {
    cy.contains('b', 'Enter Account Information').should('be.visible')
  }

  fillAccountInfo({ title = 'Mr', password, birth_date, birth_month, birth_year }) {
    cy.get(`input[value="${title}"]`).check()
    if (password)    cy.get('[data-qa="password"]').type(password)
    if (birth_date)  cy.get('[data-qa="days"]').select(birth_date)
    if (birth_month) cy.get('[data-qa="months"]').select(birth_month)
    if (birth_year)  cy.get('[data-qa="years"]').select(birth_year)
    cy.get('#newsletter').check()
    cy.get('#optin').check()
  }

  fillAddressInfo({ firstname, lastname, company, address1, address2, country, state, city, zipcode, mobile_number }) {
    if (firstname)      cy.get('[data-qa="first_name"]').type(firstname)
    if (lastname)       cy.get('[data-qa="last_name"]').type(lastname)
    if (company)        cy.get('[data-qa="company"]').type(company)
    if (address1)       cy.get('[data-qa="address"]').type(address1)
    if (address2)       cy.get('[data-qa="address2"]').type(address2)
    if (country)        cy.get('[data-qa="country"]').select(country)
    if (state)          cy.get('[data-qa="state"]').type(state)
    if (city)           cy.get('[data-qa="city"]').type(city)
    if (zipcode)        cy.get('[data-qa="zipcode"]').type(zipcode)
    if (mobile_number)  cy.get('[data-qa="mobile_number"]').type(mobile_number)
  }

  clickCreateAccount() { cy.get('[data-qa="create-account"]').click() }

  verifyAccountCreated() {
    cy.contains('b', 'Account Created!').should('be.visible')
  }

  clickContinue() { cy.get('[data-qa="continue-button"]').click() }

  verifyAccountDeleted() {
    cy.contains('b', 'Account Deleted!').should('be.visible')
  }
}

module.exports = new LoginPage()
