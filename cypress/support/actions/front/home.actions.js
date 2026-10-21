export const validarHomeDeAdministrador = () => {
  cy.location('pathname').should('eq', '/admin/home')
  cy.get('h1').should('be.visible').and('contain.text', 'Bem Vindo')
  cy.get('[data-testid="cadastrar-usuarios"]').should('be.visible')
  cy.get('[data-testid="listar-usuarios"]').should('be.visible')
  cy.get('[data-testid="logout"]').should('be.visible')
}
