# language: pt
Funcionalidade: Cadastro de usuário (front)
  Como visitante do ServeRest
  Quero me cadastrar na plataforma
  Para acessar a área logada

  Cenário: Cadastrar um usuário administrador com dados aleatórios
    Dado que estou na página de cadastro
    Quando preencho o cadastro com dados aleatórios de administrador
    E confirmo o cadastro
    Então devo ver a mensagem "Cadastro realizado com sucesso"
    E devo ser redirecionado para a home de administrador
