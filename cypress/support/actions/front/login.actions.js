// App Actions do front: ações de negócio do ponto de vista do usuário,
// sem Page Objects e sem seletores espalhados pelos testes.

export const acessarPaginaDeLogin = () => {
  cy.visit('/login')
}

export const preencherLogin = ({ email, senha }) => {
  cy.get('[data-testid="email"]').type(email)
  cy.get('[data-testid="senha"]').type(senha, { log: false })
}

export const submeterLogin = () => {
  cy.get('[data-testid="entrar"]').click()
}

export const realizarLogin = (credenciais) => {
  acessarPaginaDeLogin()
  preencherLogin(credenciais)
  submeterLogin()
}
