class CheckoutPage {
  verifyAddressDetails() {
    cy.get('#address_delivery').should('be.visible')
    cy.get('#address_invoice').should('be.visible')
  }

  verifyDeliveryMatchesRegistration(userData) {
    cy.get('#address_delivery').within(() => {
      cy.contains(userData.firstname).should('be.visible')
      cy.contains(userData.lastname).should('be.visible')
      cy.contains(userData.address1).should('be.visible')
      cy.contains(userData.city).should('be.visible')
    })
  }

  verifyBillingMatchesRegistration(userData) {
    cy.get('#address_invoice').within(() => {
      cy.contains(userData.firstname).should('be.visible')
      cy.contains(userData.lastname).should('be.visible')
    })
  }

  fillOrderComment(comment) {
    cy.get('.form-control').type(comment)
  }

  clickPlaceOrder() {
    cy.get('a.check_out').click()
  }

  fillPaymentDetails(card) {
    cy.get('[data-qa="name-on-card"]').type(card.name)
    cy.get('[data-qa="card-number"]').type(card.number)
    cy.get('[data-qa="cvc"]').type(card.cvc)
    cy.get('[data-qa="expiry-month"]').type(card.expiry_month)
    cy.get('[data-qa="expiry-year"]').type(card.expiry_year)
  }

  clickPayAndConfirm() {
    cy.get('[data-qa="pay-button"]').click()
  }

  verifyOrderSuccess() {
    cy.get('[data-qa="order-placed"]').should('contain', 'Your order has been placed successfully!')
  }

  clickDownloadInvoice() {
    cy.get('.btn.btn-default').contains('Download Invoice').click()
  }

  clickContinue() {
    cy.get('[data-qa="continue-button"]').click()
  }
}

module.exports = new CheckoutPage()
