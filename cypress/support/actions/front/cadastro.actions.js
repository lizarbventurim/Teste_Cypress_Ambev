export const acessarPaginaDeCadastro = () => {
  cy.visit('/cadastrarusuarios')
}

export const preencherCadastro = ({ nome, email, senha, administrador }) => {
  cy.get('[data-testid="nome"]').type(nome)
  cy.get('[data-testid="email"]').type(email)
  cy.get('[data-testid="password"]').type(senha, { log: false })
  if (administrador) {
    cy.get('[data-testid="checkbox"]').check()
  }
}

export const submeterCadastro = () => {
  cy.get('[data-testid="cadastrar"]').click()
}

export const cadastrarUsuario = (usuario) => {
  acessarPaginaDeCadastro()
  preencherCadastro(usuario)
  submeterCadastro()
}

export const validarCamposDeCadastro = () => {
  cy.get('[data-testid="nome"]').should('be.visible')
  cy.get('[data-testid="email"]').should('be.visible')
  cy.get('[data-testid="password"]').should('be.visible')
  cy.get('[data-testid="checkbox"]').should('be.visible')
  cy.get('[data-testid="cadastrar"]').should('be.visible')
  cy.get('[data-testid="entrar"]').should('be.visible')
}
