describe('API - Busca de Produtos', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('API05 - POST /searchProduct retorna produtos encontrados', { tags: ['smoke', 'api', 'backend'] }, () => {
    Cypress.allure.feature('API - Busca')
    Cypress.allure.story('Busca com Parâmetro')
    Cypress.allure.severity('critical')

    cy.request({
      method: 'POST',
      url: `${apiUrl}/searchProduct`,
      form: true,
      body: { search_product: 'top' },
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.responseCode).to.eq(200)
      expect(res.body).to.have.property('products')
      expect(res.body.products).to.be.an('array').and.have.length.greaterThan(0)
    })
  })

  it('API06 - POST /searchProduct sem parâmetro retorna 400', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure.feature('API - Busca')
    Cypress.allure.story('Busca sem Parâmetro')
    Cypress.allure.severity('normal')

    cy.request({
      method: 'POST',
      url: `${apiUrl}/searchProduct`,
      form: true,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.responseCode).to.eq(400)
      expect(res.body.message).to.contain('search_product parameter is missing')
    })
  })
})
