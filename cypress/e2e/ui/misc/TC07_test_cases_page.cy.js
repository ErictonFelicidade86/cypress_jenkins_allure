import homePage from '../../../support/pages/HomePage'

describe('Misc', () => {
  it('TC07 - Verificar página de Test Cases', { tags: ['misc', 'ui'] }, () => {
    Cypress.allure.feature('Navegação')
    Cypress.allure.story('Página Test Cases')
    Cypress.allure.severity('minor')

    homePage.visit()
    homePage.clickTestCases()

    cy.url().should('include', '/test_cases')
    cy.get('h2.title').should('contain', 'Test Cases')
  })
})
