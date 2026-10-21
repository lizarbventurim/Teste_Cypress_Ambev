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
