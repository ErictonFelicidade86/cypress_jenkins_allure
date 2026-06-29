class CartPage {
  visit() { cy.visit('/view_cart') }

  verifyCartPageVisible() {
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
  }

  verifyProductInCart(productName) {
    cy.get('.cart_description').contains(productName).should('be.visible')
  }

  verifyProductCount(count) {
    cy.get('tbody tr').should('have.length', count)
  }

  verifyProductQuantity(row, qty) {
    cy.get('tbody tr').eq(row).find('.cart_quantity button').should('contain', qty)
  }

  verifyPriceAndTotal() {
    cy.get('tbody tr').each(($row) => {
      const price = parseFloat(cy.wrap($row).find('.cart_price p').text().replace('Rs. ', ''))
      const qty   = parseFloat(cy.wrap($row).find('.cart_quantity button').text())
      const total = parseFloat(cy.wrap($row).find('.cart_total p').text().replace('Rs. ', ''))
      expect(price * qty).to.eq(total)
    })
  }

  removeProduct(index = 0) {
    cy.get('.cart_quantity_delete').eq(index).click()
  }

  verifyCartEmpty() {
    cy.get('#empty_cart').should('be.visible')
  }

  clickProceedToCheckout() {
    cy.get('.btn.btn-default.check_out').click()
  }

  clickRegisterLoginFromModal() {
    cy.get('.modal-body a[href="/login"]').click()
  }

  subscribeWithEmail(email) {
    cy.scrollTo('bottom', { ensureScrollable: false })
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
  }
}

module.exports = new CartPage()
