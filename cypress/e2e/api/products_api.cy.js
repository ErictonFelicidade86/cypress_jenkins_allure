describe('API - Produtos', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('API01 - GET /productsList retorna 200 com lista de produtos', { tags: ['smoke', 'api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Produtos')
    Cypress.allure?.story('Listar Produtos')
    Cypress.allure?.severity('critical')

    cy.request({ method: 'GET', url: `${apiUrl}/productsList` }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('products')
      expect(res.body.products).to.be.an('array').and.have.length.greaterThan(0)
      expect(res.body.products[0]).to.include.keys('id', 'name', 'price', 'brand', 'category')
    })
  })

  it('API02 - POST /productsList retorna 405 (método não suportado)', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure?.feature('API - Produtos')
    Cypress.allure?.story('Método Não Suportado')
    Cypress.allure?.severity('normal')

    cy.request({ method: 'POST', url: `${apiUrl}/productsList`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200) // API retorna 200 com mensagem de erro
      expect(res.body.responseCode).to.eq(405)
      expect(res.body.message).to.contain('This request method is not supported')
    })
  })
})
