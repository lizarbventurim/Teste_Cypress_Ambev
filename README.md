# Teste Cypress – ServeRest (Front e API)

Projeto de automação de testes end-to-end (front) e de API usando **Cypress**, escrito em **Gherkin** (português) e organizado com o padrão **App Actions**. Os testes rodam contra o [ServeRest](https://serverest.dev/), uma API/aplicação pública criada para estudo de testes.

| Alvo | URL |
|---|---|
| Front-end | https://front.serverest.dev/ |
| API (Swagger) | https://serverest.dev/ |

---

## Sumário

1. [O que o projeto cobre](#1-o-que-o-projeto-cobre)
2. [Pré-requisitos](#2-pré-requisitos)
3. [Instalação](#3-instalação)
4. [Como executar](#4-como-executar)
5. [Stack utilizada](#5-stack-utilizada)
6. [Estrutura de pastas](#6-estrutura-de-pastas)
7. [Como o projeto funciona](#7-como-o-projeto-funciona)
8. [Cenários automatizados](#8-cenários-automatizados)
9. [Observações importantes](#9-observações-importantes)

---

## 1. O que o projeto cobre

**Front-end** (`cypress/e2e/front`)
- Cadastro de um usuário administrador com dados aleatórios.
- Tentativa de login com usuário e senha inválidos, validando a mensagem de erro.
- Login com usuário e senha válidos, validando o redirecionamento para a home do administrador.
- Em todos os cenários, validação de que os elementos da tela estão **visíveis**.

**API** (`cypress/e2e/api`)
- Listar todos os usuários (`GET /usuarios`).
- Buscar usuário por id (`GET /usuarios/{id}`).
- Criar usuário com dados aleatórios (`POST /usuarios`).
- Em todos os cenários, validação de **contrato** (JSON Schema) da resposta.

---

## 2. Pré-requisitos

Para o projeto funcionar é necessário:

| Requisito | Detalhe |
|---|---|
| **Node.js** | Versão LTS recente. O projeto foi desenvolvido e testado com **Node 22** (npm 10). |
| **npm** | Instalado junto com o Node. |
| **Git** | Para clonar o repositório. |
| **Acesso à internet** | Os testes usam o ServeRest público (`front.serverest.dev` e `serverest.dev`). Sem internet os testes falham. |
| **Navegador** | O Cypress traz o Electron embutido. Chrome/Edge/Firefox são opcionais (`--browser`). |

Não é necessário subir nenhum servidor local nem configurar variáveis de ambiente: as URLs já estão no `cypress.config.js`.

---

## 3. Instalação

```bash
# 1. Clonar o repositório
git clone git@github.com:lizarbventurim/Teste_Cypress_Ambev.git
cd Teste_Cypress_Ambev

# 2. Instalar as dependências
npm install
```

Na primeira execução o Cypress baixa o binário do aplicativo (fica em cache na máquina). Para conferir se está tudo certo:

```bash
npx cypress verify
```

---

## 4. Como executar

| Comando | O que faz |
|---|---|
| `npm run cy:open` | Abre o Cypress em modo **interativo** (interface gráfica). Ideal para desenvolver e para **visualizar as requisições de API** pelo `cypress-plugin-api`. |
| `npm run cy:run` | Executa **todos** os testes (front + API) em modo headless. |
| `npm run test:front` | Executa somente os testes de **front**. |
| `npm run test:api` | Executa somente os testes de **API**. |

Exemplos úteis:

```bash
# Rodar um único arquivo de feature
npx cypress run --spec cypress/e2e/front/login.feature

# Rodar em um navegador específico
npx cypress run --browser chrome

# Rodar um cenário por nome (filtro do Cypress)
npx cypress run --spec cypress/e2e/api/usuarios.feature
```

Resultado esperado: **6 testes passando** (3 de front e 3 de API).

---

## 5. Stack utilizada

| Tecnologia | Versão | Para que serve |
|---|---|---|
| [Cypress](https://www.cypress.io/) | 16.2.0 | Framework de testes E2E e de API. |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | 28.0.1 | Permite escrever os testes em **Gherkin** (`.feature`) e ligá-los aos *step definitions*. |
| [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) + [esbuild](https://esbuild.github.io/) | 2.2.8 / 0.28.2 | Empacota os arquivos de teste de forma rápida (necessário ao preprocessor do Cucumber). |
| [@faker-js/faker](https://fakerjs.dev/) | 10.6.0 | Gera dados aleatórios (nome, e-mail, senha) para cadastros. |
| [cypress-plugin-api](https://www.npmjs.com/package/cypress-plugin-api) | 2.12.3 | Adiciona o comando `cy.api`, que mostra requisição e resposta de forma visual no Cypress. |
| [Ajv](https://ajv.js.org/) | 8.20.0 | Valida o **contrato** (JSON Schema) das respostas da API. |
| **Gherkin** (pt-BR) | – | Linguagem dos cenários (`Funcionalidade`, `Cenário`, `Dado`, `Quando`, `Então`). |
| **App Actions** | – | Padrão de organização: ações de negócio reutilizáveis, sem Page Objects. |
| **Conventional Commits** | – | Padrão das mensagens de commit (em português). |

---

## 6. Estrutura de pastas

```
.
├── cypress.config.js              # Configuração do Cypress (URLs, Cucumber, tasks)
├── .credenciais.json              # Senha do usuário fixo de login (ver seção 7.4)
├── package.json
└── cypress/
    ├── e2e/
    │   ├── front/
    │   │   ├── cadastro.feature   # Cenário de cadastro (Gherkin)
    │   │   └── login.feature      # Cenários de login válido e inválido (Gherkin)
    │   └── api/
    │       └── usuarios.feature   # Cenários de API: listar, listar por id e criar
    ├── fixtures/
    │   ├── api/usuario.json       # Corpo base da requisição de criação de usuário
    │   └── schema/                # Contratos JSON Schema
    │       ├── listar.json
    │       ├── listar_id.json
    │       └── criar.json
    └── support/
        ├── e2e.js                 # Carregado antes dos testes (plugin + commands)
        ├── commands.js            # Comando customizado cy.validateSchema
        ├── actions/               # App Actions
        │   ├── front/             # cadastro, login, home, mensagens
        │   └── api/usuarios.actions.js
        ├── data/usuario.factory.js        # Geração de dados com faker
        └── step_definitions/      # Ligação entre o Gherkin e as App Actions
            ├── api/usuarios.steps.js
            ├── cadastro.steps.js
            ├── login.steps.js
            └── comum.steps.js
```

---

## 7. Como o projeto funciona

### 7.1 Gherkin + step definitions
Os cenários ficam em arquivos `.feature` escritos em português. Cada frase (`Dado`, `Quando`, `Então`) é ligada a uma função nos arquivos de `step_definitions`. Os steps **não contêm lógica de tela ou de requisição**: apenas chamam as App Actions.

### 7.2 App Actions
Em vez de Page Objects, o projeto usa **App Actions**: funções que representam ações de negócio do ponto de vista do usuário (`realizarLogin`, `cadastrarUsuario`, `validarCamposDeLogin`, `buscarUsuarioPorId`...). Os seletores ficam concentrados nelas, o que evita repetição e facilita a manutenção.

- Front: `cypress/support/actions/front/`
- API: `cypress/support/actions/api/`

Sempre que disponível, os elementos do front são localizados por **`data-testid`**. As mensagens de alerta do ServeRest não têm `data-testid`, então usam a classe `.alert`.

### 7.3 Dados de teste
- **Faker**: `cypress/support/data/usuario.factory.js` gera nome, e-mail e senha aleatórios. É usado no cadastro do front, no login inválido e na criação de usuário na API.
- **Fixtures de API**: `cypress/fixtures/api/usuario.json` guarda o corpo base da requisição. O faker sobrescreve nome, e-mail e senha antes do envio.

### 7.4 Usuário fixo de login e o arquivo `.credenciais.json`
Os testes de login usam sempre o usuário **`lizarbventurim@gmail.com`** (administrador):

1. Na primeira execução o usuário é criado via API com uma **senha aleatória** (faker) e a senha é salva em `.credenciais.json`.
2. Nas execuções seguintes o teste lê a senha desse arquivo e **não apaga** o usuário.
3. Se o ServeRest limpar seus dados (ele faz isso periodicamente), o teste recria o usuário usando a senha salva.
4. Se o usuário existir no servidor **mas a senha do arquivo não for a dele**, o teste para com uma mensagem explicando o problema. Nesse caso, ajuste a senha no arquivo ou exclua o usuário.

> O `.credenciais.json` está versionado de propósito: são credenciais de um ambiente público de testes, apenas informativas.

### 7.5 Validação de contrato da API
- O comando customizado `cy.validateSchema(schema, body)` (em `cypress/support/commands.js`) usa o **Ajv** para validar o corpo da resposta contra um JSON Schema.
- Os contratos ficam em `cypress/fixtures/schema/`, um por requisição: `listar`, `listar_id` e `criar`.
- Em caso de divergência, o teste falha informando a propriedade, o tipo do erro e a mensagem.

### 7.6 Visualização das requisições de API
As App Actions de API usam `cy.api` (no lugar de `cy.request`). No `npm run cy:open` o plugin exibe uma tela com **request, response, headers e status**, facilitando a análise visual.

### 7.7 Limpeza de dados
Os usuários criados pelos testes de API são excluídos automaticamente por um hook `After`.

---

## 8. Cenários automatizados

### Front

**Cadastro** – `cypress/e2e/front/cadastro.feature`
```gherkin
Cenário: Cadastrar um usuário administrador com dados aleatórios
  Dado que estou na página de cadastro
  Então devo ver os campos do formulário de cadastro
  Quando preencho o cadastro com dados aleatórios de administrador
  E confirmo o cadastro
  Então devo ver a mensagem "Cadastro realizado com sucesso"
  E devo ser redirecionado para a home de administrador
```

**Login** – `cypress/e2e/front/login.feature`
- *Login com usuário e senha incorretos*: valida a mensagem **"Email e/ou senha inválidos"**, a permanência em `/login` e os campos visíveis.
- *Login com usuário e senha corretos*: valida o redirecionamento para `/admin/home`, o título "Bem Vindo" e os itens do menu visíveis.

### API – `cypress/e2e/api/usuarios.feature`

| Cenário | Requisição | Validações |
|---|---|---|
| Listar todos os usuários | `GET /usuarios` | Status 200, estrutura da lista, contrato `listar` |
| Buscar usuário por id | `GET /usuarios/{id}` | Status 200, dados do usuário cadastrado, contrato `listar_id` |
| Criar usuário com dados aleatórios | `POST /usuarios` | Status 201, mensagem "Cadastro realizado com sucesso", `_id`, contrato `criar` |

---

## 9. Observações importantes

- **Ambiente público e compartilhado**: o ServeRest pode ficar lento ou instável. Uma falha isolada (por exemplo, erro `Cannot read properties of undefined (reading 'data')` vindo do próprio front) pode ser instabilidade do ambiente; basta executar novamente.
- **Cypress 16**: `Cypress.env()` foi removido. A URL da API é lida com `Cypress.expose('apiUrl')`, configurada em `expose` no `cypress.config.js`.
- **Screenshots**: em caso de falha, o Cypress salva capturas de tela em `cypress/screenshots/` (pasta ignorada pelo git). Vídeos estão desabilitados.
- **Commits**: seguem o padrão **Conventional Commits**, com descrição em português (`feat:`, `test:`, `build:`, `chore:`, `fix:`).
