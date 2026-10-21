import { faker } from '@faker-js/faker'

export const gerarSenha = () => faker.internet.password({ length: 12 })

export const gerarUsuario = (sobrescrever = {}) => ({
  nome: faker.person.fullName(),
  email: faker.internet.email({ provider: 'teste.com' }).toLowerCase(),
  senha: gerarSenha(),
  administrador: true,
  ...sobrescrever
})
