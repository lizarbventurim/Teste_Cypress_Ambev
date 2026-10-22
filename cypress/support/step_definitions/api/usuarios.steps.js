import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor'
import {
  gerarUsuarioDaFixture,
  listarUsuarios,
  buscarUsuarioPorId,
  cadastrarUsuario,
  excluirUsuario
} from '../../actions/api/usuarios.actions'

let idsCriados = []

After(() => {
  idsCriados.forEach((id) => excluirUsuario(id))
  idsCriados = []
})

const cadastrarComDadosAleatorios = () =>
  gerarUsuarioDaFixture().then((usuario) => {
    cy.wrap(usuario).as('usuario')
    return cadastrarUsuario(usuario).then((resposta) => {
      if (resposta.body._id) idsCriados.push(resposta.body._id)
      cy.wrap(resposta).as('resposta')
    })
  })

Given('que existe um usuário cadastrado via API com dados aleatórios', () => {
  cadastrarComDadosAleatorios()
  cy.get('@resposta').its('status').should('eq', 201)
})

When('listo todos os usuários', () => {
  listarUsuarios().then((resposta) => cy.wrap(resposta).as('resposta'))
})

When('busco o usuário pelo id', () => {
  cy.get('@resposta').then(({ body }) =>
    buscarUsuarioPorId(body._id).then((resposta) => cy.wrap(resposta).as('resposta'))
  )
})

When('cadastro um usuário via API com dados aleatórios', () => {
  cadastrarComDadosAleatorios()
})

Then('o status da resposta deve ser {int}', (status) => {
  cy.get('@resposta').its('status').should('eq', status)
})

Then('a resposta deve conter a lista de usuários', () => {
  cy.get('@resposta').its('body').then((body) => {
    expect(body.quantidade).to.be.a('number')
    expect(body.usuarios).to.be.an('array').and.have.length(body.quantidade)
    body.usuarios.forEach((usuario) => {
      expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
    })
  })
})

Then('a resposta deve conter os dados do usuário cadastrado', () => {
  cy.get('@usuario').then((usuario) => {
    cy.get('@resposta').its('body').should('include', {
      nome: usuario.nome,
      email: usuario.email,
      password: usuario.password,
      administrador: usuario.administrador
    })
  })
})

Then('a resposta deve conter a mensagem {string}', (mensagem) => {
  cy.get('@resposta').its('body.message').should('eq', mensagem)
})

Then('a resposta deve conter o id do usuário criado', () => {
  cy.get('@resposta').its('body._id').should('be.a', 'string').and('not.be.empty')
})
