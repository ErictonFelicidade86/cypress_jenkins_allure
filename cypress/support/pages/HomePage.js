class HomePage {
  visit() { cy.visit('/') }

  verifyPageLoaded() {
    cy.url().should('include', 'automationexercise.com')
    cy.get('img[alt="Website for automation practice"]').should('be.visible')
  }

  clickSignupLogin() { cy.get('a[href="/login"]').first().click() }
  clickCart()        { cy.get('a[href="/view_cart"]').first().click() }
  clickProducts() {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
  }
  clickTestCases()    { cy.get('a[href="/test_cases"]').first().click() }
  clickContactUs()    { cy.get('a[href="/contact_us"]').first().click() }
  clickLogout()       { cy.get('a[href="/logout"]').first().click() }
  clickDeleteAccount(){ cy.get('a[href="/delete_account"]').first().click() }

  subscribeWithEmail(email) {
    cy.scrollTo('bottom', { ensureScrollable: false })
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }

  verifySubscriptionSuccess() {
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
  }

  scrollToBottom() { cy.scrollTo('bottom') }
  scrollToTop()    { cy.scrollTo('top') }

  clickScrollUpArrow() {
    cy.get('#scrollUp').click()
  }

  verifyHeroText() {
    cy.get('.active h2').should('contain', 'Full-Fledged practice website for Automation Engineers')
  }

  verifySubscriptionSectionVisible() {
    cy.get('h2').contains('Subscription').should('be.visible')
  }

  addRecommendedItemToCart() 