# language: pt
Funcionalidade: Usuários (API)
  Como consumidor da API do ServeRest
  Quero gerenciar usuários
  Para validar o contrato do recurso /usuarios

  Cenário: Listar todos os usuários
    Quando listo todos os usuários
    Então o status da resposta deve ser 200
    E a resposta deve conter a lista de usuários
    E o contrato da resposta deve ser válido conforme o schema "listar"

  Cenário: Buscar usuário por id
    Dado que existe um usuário cadastrado via API com dados aleatórios
    Quando busco o usuário pelo id
    Então o status da resposta deve ser 200
    E a resposta deve conter os dados do usuário cadastrado
    E o contrato da resposta deve ser válido conforme o schema "listar_id"

  Cenário: Criar usuário com dados aleatórios
    Quando cadastro um usuário via API com dados aleatórios
    Então o status da resposta deve ser 201
    E a resposta deve conter a mensagem "Cadastro realizado com sucesso"
    E a resposta deve conter o id do usuário criado
    E o contrato da resposta deve ser válido conforme o schema "criar"
