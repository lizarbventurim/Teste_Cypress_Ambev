# language: pt
Funcionalidade: Login (front)
  Como usuário do ServeRest
  Quero realizar login
  Para acessar a área logada

  Contexto:
    Dado que existe o usuário administrador "lizarbventurim@gmail.com"

  Cenário: Login com usuário e senha incorretos
    Dado que estou na página de login
    Então devo ver os campos do formulário de login
    Quando informo um e-mail e uma senha incorretos
    E confirmo o login
    Então devo ver a mensagem "Email e/ou senha inválidos"
    E devo permanecer na página de login

  Cenário: Login com usuário e senha corretos
    Dado que estou na página de login
    Então devo ver os campos do formulário de login
    Quando informo o e-mail e a senha do usuário cadastrado
    E confirmo o login
    Então devo ser redirecionado para a home de administrador
