import { gerarSenha } from '../../data/usuario.factory'

// App Actions da API: o corpo das requisições vem das fixtures.

const apiUrl = () => Cypress.expose('apiUrl')

export const gerarUsuarioDaFixture = (fixture = 'api/usuario') =>
  cy.fixture(fixture).then((usuario) => ({
    ...usuario,
    email: `qa_${Date.now()}_${usuario.email}`
  }))

export const listarUsuarios = () =>
  cy.request({ method: 'GET', url: `${apiUrl()}/usuarios`, failOnStatusCode: false })

export const cadastrarUsuario = (usuario) =>
  cy.request({
    method: 'POST',
    url: `${apiUrl()}/usuarios`,
    body: usuario,
    failOnStatusCode: false
  })

export const excluirUsuario = (id) =>
  cy.request({ method: 'DELETE', url: `${apiUrl()}/usuarios/${id}`, failOnStatusCode: false })

export const buscarUsuarioPorEmail = (email) =>
  cy
    .request(`${apiUrl()}/usuarios?email=${encodeURIComponent(email)}`)
    .its('body.usuarios')

export const garantirUsuarioFixo = ({ nome, email, administrador }) =>
  cy.task('lerCredenciais').then((credenciais) => {
    buscarUsuarioPorEmail(email).then((usuarios) => {
      const senhaSalva = credenciais[email]

      if (usuarios.length && !senhaSalva) {
        throw new Error(
          `O usuário ${email} já existe, mas a senha não está em .credenciais.json. ` +
            'Informe a senha no arquivo ou exclua o usuário manualmente.'
        )
      }

      const senha = senhaSalva || gerarSenha()
      if (!usuarios.length) {
        cadastrarUsuario({
          nome,
          email,
          password: senha,
          administrador: String(administrador)
        }).its('status').should('eq', 201)
        cy.task('salvarCredenciais', { email, senha })
      }

      cy.wrap({ nome, email, senha, administrador }).as('usuario')
    })
  })
