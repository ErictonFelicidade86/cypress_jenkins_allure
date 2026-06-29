describe('API - Produtos', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('API01 - GET /productsList retorna 200 com lista de produtos', { tags: ['smoke', 'api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Produtos')
    Cypress.allure?.story('Listar Produtos')
    Cypress.allure?.severity('critical')

    cy.api({ method: 'GET', url: `${apiUrl}/productsList` }).then((res) => {
      const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
      expect(res.status).to.eq(200)
      expect(body).to.have.property('products')
      expect(body.products).to.be.an('array').and.have.length.greaterThan(0)
      expect(body.products[0]).to.include.keys('id', 'name', 'price', 'brand', 'category')
    })
  })

  it('API02 - POST /productsList retorna 405 (método não suportado)', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure?.feature('API - Produtos')
    Cypress.allure?.story('Método Não Suportado')
    Cypress.allure?.severity('normal')

    cy.api({ method: 'POST', url: `${apiUrl}/productsList`, failOnStatusCode: false }).then((res) => {
      const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
      expect(res.status).to.eq(200)
      expect(body.responseCode).to.eq(405)
      expect(body.message).to.contain('This request method is not supported')
    })
  })
})
