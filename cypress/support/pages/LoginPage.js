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
    cy.get('[data-qa="account-info"]').should('contain', 'ENTER ACCOUNT INFORMATION')
  }

  fillAccountInfo({ title = 'Mr', password, birth_date, birth_month, birth_year }) {
    cy.get(`input[value="${title}"]`).check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').select(birth_date)
    cy.get('[data-qa="months"]').select(birth_month)
    cy.get('[data-qa="years"]').select(birth_year)
    cy.get('#newsletter').check()
    cy.get('#optin').check()
  }

  fillAddressInfo({ firstname, lastname, company, address1, address2, country, state, city, zipcode, mobile_number }) {
    cy.get('[data-qa="first_name"]').type(firstname)
    cy.get('[data-qa="last_name"]').type(lastname)
    cy.get('[data-qa="company"]').type(company)
    cy.get('[data-qa="address"]').type(address1)
    cy.get('[data-qa="address2"]').type(address2)
    cy.get('[data-qa="country"]').select(country)
    cy.get('[data-qa="state"]').type(state)
    cy.get('[data-qa="city"]').type(city)
    cy.get('[data-qa="zipcode"]').type(zipcode)
    cy.get('[data-qa="mobile_number"]').type(mobile_number)
  }

  clickCreateAccount() { cy.get('[data-qa="create-account"]').click() }

  verifyAccountCreated() {
    cy.get('[data-qa="account-created"]').should('contain', 'ACCOUNT CREATED!')
  }

  clickContinue() { cy.get('[data-qa="continue-button"]').click() }

  verifyAccountDeleted() {
    cy.get('[data-qa="account-deleted"]').should('contain', 'ACCOUNT DELETED!')
  }
}

module.exports = new LoginPage()
