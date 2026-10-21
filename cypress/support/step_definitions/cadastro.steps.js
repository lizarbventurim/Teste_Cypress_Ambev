import { Given, When } from '@badeball/cypress-cucumber-preprocessor'
import {
  acessarPaginaDeCadastro,
  preencherCadastro,
  submeterCadastro
} from '../actions/front/cadastro.actions'
import { gerarUsuario } from '../data/usuario.factory'

Given('que estou na página de cadastro', () => {
  acessarPaginaDeCadastro()
})

When('preencho o cadastro com dados aleatórios de administrador', () => {
  const usuario = gerarUsuario({ administrador: true })
  cy.wrap(usuario).as('usuario')
  preencherCadastro(usuario)
})

When('confirmo o cadastro', () => {
  submeterCadastro()
})
