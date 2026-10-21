import { Then } from '@badeball/cypress-cucumber-preprocessor'
import { validarMensagem } from '../actions/front/mensagens.actions'
import { validarHomeDeAdministrador } from '../actions/front/home.actions'

Then('devo ver a mensagem {string}', (mensagem) => {
  validarMensagem(mensagem)
})

Then('devo ser redirecionado para a home de administrador', () => {
  validarHomeDeAdministrador()
})
