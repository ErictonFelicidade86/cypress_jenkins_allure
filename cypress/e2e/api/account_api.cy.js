describe('API - Conta de Usuário', () => {
  const apiUrl = Cypress.env('apiUrl')
  let email
  const password = 'Test@1234'
  const userData = {
    name: 'API Test User',
    password,
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'API',
    lastname: 'User',
    company: 'QA Corp',
    address1: '123 API Street',
    address2: 'Suite 99',
    country: 'United States',
    zipcode: '90001',
    state: 'California',
    city: 'Los Angeles',
    mobile_number: '5559876543',
  }

  beforeEach(() => {
    email = `api_user_${Date.now()}@test.com`
  })

  it('API11 - POST /createAccount cria usuário com sucesso (201)', { tags: ['smoke', 'api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Conta')
    Cypress.allure?.story('Criar Conta')
    Cypress.allure?.severity('critical')

    cy.api({
      method: 'POST',
      url: `${apiUrl}/createAccount`,
      form: true,
      body: { ...userData, email },
    }).then((res) => {
      const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
      expect(res.status).to.eq(200)
      expect(body.responseCode).to.eq(201)
      expect(body.message).to.eq('User created!')

      cy.deleteUserViaApi(email, password)
    })
  })

  it('API12 - DELETE /deleteAccount remove conta (200)', { tags: ['api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Conta')
    Cypress.allure?.story('Deletar Conta')
    Cypress.allure?.severity('critical')

    cy.createUserViaApi(email, password).then(() => {
      cy.api({
        method: 'DELETE',
        url: `${apiUrl}/deleteAccount`,
        form: true,
        body: { email, password },
      }).then((res) => {
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
        expect(res.status).to.eq(200)
        expect(body.responseCode).to.eq(200)
        expect(body.message).to.eq('Account deleted!')
      })
    })
  })

  it('API13 - PUT /updateAccount atualiza dados do usuário (200)', { tags: ['api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Conta')
    Cypress.allure?.story('Atualizar Conta')
    Cypress.allure?.severity('normal')

    cy.createUserViaApi(email, password).then(() => {
      cy.api({
        method: 'PUT',
        url: `${apiUrl}/updateAccount`,
        form: true,
        body: { ...userData, email, name: 'Updated User', city: 'San Francisco' },
      }).then((res) => {
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
        expect(res.status).to.eq(200)
        expect(body.responseCode).to.eq(200)
        expect(body.message).to.eq('User updated!')

        cy.deleteUserViaApi(email, password)
      })
    })
  })

  it('API14 - GET /getUserDetailByEmail retorna dados do usuário (200)', { tags: ['api', 'backend'] }, () => {
    Cypress.allure?.feature('API - Conta')
    Cypress.allure?.story('Buscar Usuário por Email')
    Cypress.allure?.severity('normal')

    cy.createUserViaApi(email, password).then(() => {
      cy.api({
        method: 'GET',
        url: `${apiUrl}/getUserDetailByEmail`,
        qs: { email },
      }).then((res) => {
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
        expect(res.status).to.eq(200)
        expect(body.responseCode).to.eq(200)
        expect(body.user).to.exist
        expect(body.user.email).to.eq(email)
        expect(body.user).to.include.keys('id', 'name', 'email')
        // Log das chaves reais retornadas pela API (útil para debug)
        cy.log('Chaves do user:', Object.keys(body.user).join(', '))

        cy.deleteUserViaApi(email, password)
      })
    })
  })
})
