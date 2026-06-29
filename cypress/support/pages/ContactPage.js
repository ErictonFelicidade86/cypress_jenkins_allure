class ContactPage {
  visit() { cy.visit('/contact_us') }

  verifyGetInTouchVisible() {
    cy.get('.contact-form h2').should('contain', 'Get In Touch')
  }

  fillContactForm(name, email, subject, message) {
    cy.get('[data-qa="name"]').type(name)
    cy.get('[data-qa="email"]').type(email)
    cy.get('[data-qa="subject"]').type(subject)
    cy.get('[data-qa="message"]').type(message)
  }

  uploadFile(fileName) {
    cy.get('input[name="upload_file"]').selectFile(`cypress/fixtures/${fileName}`, { force: true })
  }

  clickSubmit() {
    cy.get('[data-qa="submit-button"]').click()
  }

  confirmAlert() {
    cy.on('window:confirm', () => true)
  }

  verifySuccessMessage() {
    cy.get('.status.alert-success').should('contain', 'Success! Your details have been submitted successfully.')
  }

  clickHomeButton() {
    cy.get('a').contains('Home').click()
  }
}

module.exports = new ContactPage()
