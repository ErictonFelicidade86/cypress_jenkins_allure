describe('API - Busca de Produtos', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('API05 - POST /searchProduct retorna produtos encontrados', { tags: ['smoke', 'api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Busca')
    Cypress.allure?.story('Busca com Parâmetro')
    Cypress.allure?.severity('critical')

    cy.api({
      method: 'POST',
      url: `${apiUrl}/searchProduct`,
      form: true,
      body: { search_product: 'dress' },
      failOnStatusCode: false,
    }).then((res) => {
      const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
      expect(res.status).to.eq(200)
      expect(body.responseCode).to.eq(200)
      expect(body).to.have.property('products')
      expect(body.products).to.be.an('array').and.have.length.greaterThan(0)
    })
  })

  it('API06 - POST /searchProduct sem parâmetro retorna 400', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure?.feature('API - Busca')
    Cypress.allure?.story('Busca sem Parâmetro')
    Cypress.allure?.severity('normal')

    cy.api({
      method: 'POST',
      url: `${apiUrl}/searchProduct`,
      form: true,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
      expect(body.responseCode).to.eq(400)
      expect(body.message).to.contain('search_product param