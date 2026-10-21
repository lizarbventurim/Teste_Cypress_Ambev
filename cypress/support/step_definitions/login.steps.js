import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import {
  acessarPaginaDeLogin,
  preencherLogin,
  submeterLogin
} from '../actions/front/login.actions'
import { garantirUsuarioFixo } from '../actions/api/usuarios.actions'
import { gerarUsuario } from '../data/usuario.factory'

Given('que existe o usuário administrador {string}', (email) => {
  garantirUsuarioFixo({ nome: 'Lizarb Venturim', email, administrador: true })
})

Given('que estou na página de login', () => {
  acessarPaginaDeLogin()
})

When('informo um e-mail e uma senha incorretos', () => {
  const invalido = gerarUsuario()
  preencherLogin({ email: invalido.email, senha: invalido.senha })
})

When('informo o e-mail e a senha do usuário cadastrado', () => {
  cy.get('@usuario').then(({ email, senha }) => preencherLogin({ email, senha }))
})

When('confirmo o login', () => {
  submeterLogin()
})

Then('devo permanecer na página de login', () => {
  cy.location('pathname').should('eq', '/login')
})
