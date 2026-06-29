# 🧪 AutomationExercise — Test Automation Suite

Projeto de automação de testes completo para [automationexercise.com](https://automationexercise.com), cobrindo **26 casos de teste de UI** (frontend) e **14 endpoints de API** (backend), com pipeline CI/CD automatizado.

![Cypress](https://img.shields.io/badge/Cypress-13.6+-17202C?logo=cypress&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=github-actions&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-pipeline-D24939?logo=jenkins&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-Reports-FF6B35)

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando os Testes](#executando-os-testes)
- [Docker](#docker)
- [Pipeline CI/CD](#pipeline-cicd)
- [Relatórios Allure](#relatórios-allure)
- [Documentação](#documentação)

---

## 🎯 Visão Geral

| Camada | Ferramenta | Cobertura |
|--------|-----------|-----------|
| UI / E2E | Cypress 13+ | 26 casos de teste |
| API / Backend | Cypress `cy.request()` | 14 endpoints REST |
| CI/CD Cloud | GitHub Actions | Push/PR automático |
| CI/CD On-premise | Jenkins | Imagem Docker validada |
| Relatórios | Allure Reports | Histórico + screenshots |
| Containerização | Docker + Compose | Ambiente isolado |

### Fluxo do Pipeline

```
Push → GitHub Actions
         ├── API Tests ──────────┐
         └── UI Tests (paralelo) ┘
                   ↓ (tudo passou)
           Build Docker Image
                   ↓
           Push → ghcr.io
                   ↓
           Webhook → Jenkins
                   ↓
         Pull Image → Executa Testes
                   ↓
           Gera Allure Report
```

---

## 🛠 Tecnologias

- **[Cypress 13+](https://www.cypress.io/)** — Framework de testes E2E e API
- **[@shelex/cypress-allure-plugin](https://github.com/Shelex/cypress-allure-plugin)** — Integração com Allure Reports
- **[@faker-js/faker](https://fakerjs.dev/)** — Geração de dados dinâmicos
- **[cypress-grep](https://github.com/cypress-io/cypress-grep)** — Filtro por tags (smoke, auth, api)
- **Docker** — Containerização e reprodutibilidade
- **GitHub Actions** — Pipeline CI/CD na nuvem
- **Jenkins** — Pipeline CI/CD corporativo
- **Allure Reports** — Relatórios visuais com histórico

---

## 📁 Estrutura do Projeto

```
cypress_jenkins_allure/
├── cypress/
│   ├── e2e/
│   │   ├── ui/                       # Frontend — 26 specs
│   │   │   ├── auth/                 # TC01–TC05 (registro, login, logout)
│   │   │   ├── products/             # TC08–TC09, TC18–TC19, TC21
│   │   │   ├── cart/                 # TC12–TC13, TC17, TC20, TC22
│   │   │   ├── checkout/             # TC14–TC16, TC23–TC24
│   │   │   └── misc/                 # TC06–TC07, TC10–TC11, TC25–TC26
│   │   └── api/                      # Backend — 14 endpoints
│   │       ├── products_api.cy.js    # API01–API02
│   │       ├── brands_api.cy.js      # API03–API04
│   │       ├── search_api.cy.js      # API05–API06
│   │       ├── auth_api.cy.js        # API07–API10
│   │       └── account_api.cy.js     # API11–API14
│   ├── fixtures/
│   │   ├── user.json                 # Dados de usuário
│   │   ├── payment.json              # Dados de cartão
│   │   └── products.json             # Produtos e categorias
│   └── support/
│       ├── commands.js               # Custom commands
│       ├── e2e.js                    # Setup global
│       └── pages/                    # Page Object Model
│           ├── HomePage.js
│           ├── LoginPage.js
│           ├── ProductsPage.js
│           ├── CartPage.js
│           ├── CheckoutPage.js
│           └── ContactPage.js
├── docs/
│   ├── Plano_de_Testes_AutomationExercise.pdf
│   └── Plano_de_Testes_AutomationExercise.docx
├── .github/
│   └── workflows/
│       └── cypress-tests.yml         # GitHub Actions pipeline
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── cypress.config.js
└── package.json
```

---

## ✅ Pré-requisitos

- **Node.js** >= 18
- **Yarn** >= 1.22
- **Docker** >= 20 (opcional, para execução containerizada)
- **Allure CLI** (opcional, para relatórios locais)
- **Java 11+** (necessário para Allure CLI)

```bash
# Instalar Allure CLI via Yarn (global)
yarn global add allure-commandline
```

---

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/ErictonFelicidade86/cypress_jenkins_allure.git
cd cypress_jenkins_allure

# Instalar dependências
yarn install
```

---

## 🚀 Executando os Testes

### Abrir Cypress (modo interativo)

```bash
yarn cy:open
```

### Executar todos os testes de UI

```bash
yarn cy:run:ui
```

### Executar todos os testes de API

```bash
yarn cy:run:api
```

### Executar apenas testes de smoke

```bash
yarn cy:run:smoke
```

### Executar todos os testes

```bash
yarn cy:run
```

### Executar por módulo específico

```bash
# Apenas autenticação
yarn cypress run --spec "cypress/e2e/ui/auth/*.cy.js"

# Apenas checkout
yarn cypress run --spec "cypress/e2e/ui/checkout/*.cy.js"

# Filtrar por tag
yarn cypress run --env grepTags=auth
yarn cypress run --env grepTags=smoke
yarn cypress run --env grepTags=negative
```

---

## 🐳 Docker

### Build local da imagem

```bash
docker build -t cypress-runner .
```

### Executar testes via Docker

```bash
# UI Tests
docker run --rm \
  -v $(pwd)/allure-results:/cypress-automation/allure-results \
  cypress-runner \
  --spec "cypress/e2e/ui/**/*.cy.js" --env allure=true

# API Tests
docker run --rm \
  -v $(pwd)/allure-results:/cypress-automation/allure-results \
  cypress-runner \
  --spec "cypress/e2e/api/**/*.cy.js" --env allure=true
```

### Docker Compose (completo com Allure Server)

```bash
# Apenas API
docker-compose run --rm cypress-api

# Apenas UI
docker-compose run --rm cypress-ui

# Subir o servidor Allure para ver o relatório
docker-compose up allure
# Acessa http://localhost:5050

# Rodar tudo de uma vez
docker-compose up cypress-api cypress-ui
```

O Allure Dashboard fica disponível em `http://localhost:5050` após a execução.

---

## ⚙️ Pipeline CI/CD

### GitHub Actions

O pipeline é acionado automaticamente em push/PR para `main`:

| Job | Executa | Condição |
|-----|---------|----------|
| `api-tests` | Testes de API (14 endpoints) | Sempre |
| `ui-tests` | 5 módulos em paralelo | Sempre |
| `docker-build-push` | Build + push para `ghcr.io` | Apenas se tudo passou no `main` |
| `trigger-jenkins` | Webhook para Jenkins | Após push da imagem |
| `allure-report-gh` | Publica no GitHub Pages | Sempre |

#### Secrets necessários no GitHub

| Secret | Valor |
|--------|-------|
| `JENKINS_URL` | `http://seu-jenkins:8080` |
| `JENKINS_JOB_NAME` | `cypress-automation` |
| `JENKINS_USER` | Seu usuário Jenkins |
| `JENKINS_TOKEN` | API Token gerado no Jenkins |

> O `GITHUB_TOKEN` é gerado automaticamente pelo GitHub Actions — não precisa configurar.

### Jenkins

O Jenkinsfile usa **Declarative Pipeline** com os seguintes stages:

1. **Pull Docker Image** — autentica no `ghcr.io` e baixa a imagem validada
2. **API Tests** — executa os 14 testes de API em container
3. **UI Tests** — executa 5 módulos em paralelo (Auth, Products, Cart, Checkout, Misc)
4. **Generate Allure Report** — gera o relatório a partir dos resultados
5. **Publish Allure Report** — publica no dashboard do Jenkins

#### Credenciais necessárias no Jenkins

| ID | Tipo | Descrição |
|----|------|-----------|
| `ghcr-credentials` | Username + Password | Login no GitHub Container Registry |

---

## 📊 Relatórios Allure

### Gerar e abrir localmente

```bash
# Gerar relatório
yarn allure:generate

# Abrir no browser
yarn allure:open

# Gerar e abrir em um comando
yarn allure:report
```

### GitHub Pages

Após cada push para `main`, o relatório é publicado automaticamente em:

```
https://ErictonFelicidade86.github.io/cypress_jenkins_allure/
```

---

## 📚 Documentação

A documentação completa do projeto está na pasta [`docs/`](./docs/):

- **[Plano de Testes (PDF)](./docs/Plano_de_Testes_AutomationExercise.pdf)** — plano completo com BDD, arquitetura, métricas e riscos
- **[Plano de Testes (DOCX)](./docs/Plano_de_Testes_AutomationExercise.docx)** — versão Word editável

---

## 🏗 Custom Commands

| Comando | Descrição |
|---------|-----------|
| `cy.createUserViaApi(email, password)` | Cria usuário via API (setup de teste) |
| `cy.deleteUserViaApi(email, password)` | Remove usuário via API (teardown) |
| `cy.loginViaUI(email, password)` | Login pela interface |
| `cy.verifyLoggedIn()` | Verifica texto "Logged in as" |
| `cy.completePayment()` | Preenche formulário de pagamento |

---

## 📌 Tags Disponíveis

| Tag | Uso |
|-----|-----|
| `smoke` | Testes críticos — execução rápida |
| `auth` | Testes de autenticação |
| `api` | Testes de API REST |
| `negative` | Cenários negativos e de erro |

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feat/novo-teste`
2. Commit: `git commit -m "feat: adiciona TC27"`
3. Push: `git push origin feat/novo-teste`
4. Abra um Pull Request

---

*Projeto desenvolvido para prática de automação de testes com Cypress, Docker, Jenkins, GitHub Actions e Allure Reports.*
