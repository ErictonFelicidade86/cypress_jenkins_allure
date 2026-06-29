describe('API - Autenticação', () => {
  const apiUrl = Cypress.env('apiUrl')
  let email
  const password = 'Test@1234'

  before(() => {
    email = `testuser_${Date.now()}@test.com`
    cy.createUserViaApi(email, password)
  })

  after(() => {
    cy.deleteUserViaApi(email, password)
  })

  it('API07 - POST /verifyLogin com credenciais válidas retorna 200', { tags: ['smoke', 'api', 'backend'] }, () => {
    Cypress.allure.feature('API - Autenticação')
    Cypress.allure.story('Login Válido')
    Cypress.allure.severity('critical')

    cy.request({
      method: 'POST',
      url: `${apiUrl}/verifyLogin`,
      form: true,
      body: { email, password },
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.responseCode).to.eq(200)
      expect(res.body.message).to.eq('User exists!')
    })
  })

  it('API08 - POST /verifyLogin sem email retorna 400', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure.feature('API - Autenticação')
    Cypress.allure.story('Login sem Email')
    Cypress.allure.severity('normal')

    cy.request({
      method: 'POST',
      url: `${apiUrl}/verifyLogin`,
      form: true,
      body: { password },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.responseCode).to.eq(400)
      expect(res.body.message).to.contain('email or password parameter is missing')
    })
  })

  it('API09 - DELETE /verifyLogin retorna 405', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure.feature('API - Autenticação')
    Cypress.allure.story('Método DELETE Não Suportado')
    Cypress.allure.severity('minor')

    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/verifyLogin`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.responseCode).to.eq(405)
      expect(res.body.message).to.contain('This request method is not supported')
    })
  })

  it('API10 - POST /verifyLogin com credenciais inválidas retorna 404', { tags: ['api', 'backend', 'negative'] }, () => {
    Cypress.allure.feature('API - Autenticação')
    Cypress.allure.story('Login Inválido')
    Cypress.allure.severity('normal')

    cy.request({
      method: 'POST',
      url: `${apiUrl}/verifyLogin`,
      form: true,
      body: { email: 'fake@notexist.com', password: 'wrongpass' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.body.responseCode).to.eq(404)
      expect(res.body.message).to.eq('User not found!')
    })
  })
})
