export const validarMensagem = (mensagem) => {
  cy.get('.alert').should('be.visible').and('contain.text', mensagem)
}
