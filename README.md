# Automação Web - Automation Exercise

Projeto individual de automação de testes end-to-end da aplicação fictícia
[Automation Exercise](https://automationexercise.com), desenvolvido como trabalho
de conclusão. A suíte utiliza Cypress e implementa os casos selecionados na
página [Test Cases](https://automationexercise.com/test_cases).

## Casos automatizados

| Caso | Cenário coberto | Arquivo |
|---|---|---|
| 1 | Cadastro de usuário e exclusão da conta ao final | `cypress/e2e/cadastro.cy.js` |
| 2 | Login com e-mail e senha válidos | `cypress/e2e/login.cy.js` |
| 3 | Tentativa de login com credenciais inválidas | `cypress/e2e/login.cy.js` |
| 4 | Logout de usuário autenticado | `cypress/e2e/login.cy.js` |
| 5 | Cadastro com e-mail já existente | `cypress/e2e/cadastro.cy.js` |
| 8 | Consulta da lista de produtos e detalhes de um produto | `cypress/e2e/produto.cy.js` |
| 9 | Pesquisa de produto e validação dos resultados | `cypress/e2e/produto.cy.js` |
| 10 | Assinatura da newsletter na página inicial | `cypress/e2e/newsletter.cy.js` |
| 15 | Compra após cadastro de um novo usuário | `cypress/e2e/pedido.cy.js` |
| 16 | Compra após login de um usuário existente | `cypress/e2e/pedido.cy.js` |

## Tecnologias

- Node.js e npm
- [Cypress](https://www.cypress.io/) para testes E2E
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) para relatórios
- GitHub Actions para execução automatizada em integração contínua

## Pré-requisitos

- Node.js e npm instalados
- Acesso à internet e disponibilidade de `https://automationexercise.com`

## Instalação e execução local

Na raiz do projeto, instale as dependências usando o lockfile:

```bash
npm ci
```

Execute a suíte em modo headless:

```bash
npm test
```

Para abrir a interface do Cypress:

```bash
npx cypress open
```

O endereço base da aplicação está configurado como
`https://automationexercise.com` em `cypress.config.js`.

## Organização do projeto

```text
cypress/
├── e2e/          # Especificações dos casos de teste
├── fixtures/     # Dados de usuários e produtos
├── modules/      # Ações e validações organizadas por funcionalidade
└── support/      # Comandos e configuração compartilhada dos testes
.github/
└── workflows/    # Pipeline de execução no GitHub Actions
```

As especificações ficam em `cypress/e2e`. Ações e validações das
funcionalidades são encapsuladas nos módulos de `cypress/modules` (cadastro,
login, produtos, newsletter, carrinho e pedido). Os dados reutilizáveis ficam
em `cypress/fixtures`. O comando personalizado `cy.garantirUsuarioExistente`
prepara o usuário fixo de teste pela API da aplicação quando necessário.

## Integração contínua e relatórios

O workflow `.github/workflows/cypress-test.yml` executa os testes no Chrome
quando há `push` ou `pull request` direcionado à branch `main`, além de permitir
execução manual (`workflow_dispatch`).

- O relatório Mochawesome é salvo em `cypress/reports` e publicado como o
  artefato `relatorio-mochawesome` em toda execução, inclusive em caso de falha.
- Em caso de falha, screenshots e vídeos disponíveis são publicados como
  `cypress-evidencias`.
- Os artefatos do workflow ficam disponíveis por 15 dias. Para acessá-los,
  abra a execução na aba **Actions** do GitHub e baixe os artefatos.
- Na execução local, o relatório é gerado em `cypress/reports` (por exemplo,
  `cypress/reports/index.html`). Vídeos de execuções sem falhas são removidos;
  os de execuções com falhas são mantidos.

## Dados de teste

Os dados usados pelos testes estão em `cypress/fixtures/usuarios.json` e
`cypress/fixtures/produtos.json`. O caso de cadastro e os casos de compra que
criam uma conta usam um e-mail dinâmico para evitar reutilizar o mesmo endereço.
Os demais fluxos preparam e reutilizam o usuário fixo definido na fixture.

Esses dados são destinados exclusivamente ao ambiente público de demonstração.
Não substitua os dados de teste por credenciais ou informações pessoais reais.
