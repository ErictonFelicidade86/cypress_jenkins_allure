describe('API - Marcas', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('API03 - GET /brandsList retorna 200 com lista de marcas', { tags: ['smoke', 'api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Marcas')
    Cypress.allure?.story('Listar Marcas')
    Cypress.allure?.severity('critical')

    cy.request({ method: 'GET', url: `${apiUrl}/brandsList` }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('brands')
      expect(res.body.brands).to.be.an('array').and.have.length.greaterThan(0)
      expect(res.body.brands[0]).to.include.keys('id', 'brand')
    })
  })

  it('API04 - PUT /brandsList retorna 405 (método não suportado)', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure?.feature('API - Marcas')
    Cypress.allure?.story('Método Não Suportado')
    Cypress.allure?.severity('normal')

    cy.request({ method: 'PUT', url: `${apiUrl}/brandsList`, failOnStatusCode: false }).then((res) => {
      expect(res.body.responseCode).to.eq(405)
      expect(res.body.message).to.contain('This request method is not supported')
    })
  })
})
