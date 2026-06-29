class ProductsPage {
  visit() { cy.visit('/products') }

  verifyAllProductsVisible() {
    cy.get('.features_items').should('be.visible')
    cy.get('h2.title').should('contain', 'All Products')
  }

  searchProduct(term) {
    cy.get('#search_product').type(term)
    cy.get('#submit_search').click()
  }

  verifySearchResultsVisible() {
    cy.get('h2.title').should('contain', 'Searched Products')
    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0)
  }

  clickViewProduct(index = 0) {
    cy.get('.choose a').eq(index).click()
  }

  verifyProductDetailVisible() {
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible')           // name
      cy.get('p').contains('Category').should('be.visible')
      cy.get('span').contains('Rs.').should('be.visible') // price
      cy.get('p').contains('Availability').should('be.visible')
      cy.get('p').contains('Condition').should('be.visible')
      cy.get('p').contains('Brand').should('be.visible')
    })
  }

  hoverAndAddToCart(index = 0) {
    cy.get('.productinfo').eq(index).trigger('mouseover')
    cy.get('.product-overlay .add-to-cart').eq(index).click({ force: true })
  }

  clickContinueShopping() {
    cy.get('.modal-footer').find('button').contains('Continue Shopping').click()
  }

  clickViewCart() {
    cy.get('.modal-body a[href="/view_cart"]').click()
  }

  // Categories
  clickCategory(category) {
    cy.get('.left-sidebar').contains(category).click()
  }

  clickSubCategory(subCategory) {
    cy.get('.panel-body').contains(subCategory).click()
  }

  verifyCategoryPage(text) {
    // Página mostra ex: "WOMEN - DRESS PRODUCTS" — usamos cy.contains para match parcial
    const keyword = text.split(' - ').pop() // ex: 'Dress'
    cy.get('.features_items').contains('h2', keyword, { matchCase: false }).should('be.visible')
  }

  // Brands
  clickBrand(brand) {
    cy.get('.brands-name').contains(brand).click()
  }

  verifyBrandPage(brand) {
    cy.get('.features_items').contains('h2', brand, { matchCase: false }).should('be.visible')
    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0)
  }

  // Review
  verifyWriteReviewVisible() {
    cy.contains('Write Your Review').should('be.visible')
    cy.get('#review-form').should('exist')
  }

  submitReview(name, email, review) {
    cy.get('#name').type(name)
    cy.get('#email').type(email)
    cy.get('#review').type(review)
    cy.get('#button-review').click()
  }

  verifyReviewSuccess() {
    cy.get('.alert-success').should('contain', 'Thank you for your review.')
  }
}

module.exports = new ProductsPage()
