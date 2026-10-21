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
