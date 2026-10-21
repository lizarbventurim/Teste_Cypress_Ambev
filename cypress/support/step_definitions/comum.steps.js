import { Then } from '@badeball/cypress-cucumber-preprocessor'
import { validarMensagem } from '../actions/front/mensagens.actions'

Then('devo ver a mensagem {string}', (mensagem) => {
  validarMensagem(mensagem)
})

Then('devo ser redirecionado para a home de administrador', () => {
  cy.location('pathname').should('eq', '/admin/home')
})
