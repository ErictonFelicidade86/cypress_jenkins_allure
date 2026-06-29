# Setup do Pipeline CI/CD

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Jenkins com plugins: Allure, Docker Pipeline, Pipeline
- Conta no GitHub com repositório criado

---

## 1. Instalar dependências locais

```bash
npm install
```

---

## 2. Configurar Secrets no GitHub Actions

Acesse: `Settings → Secrets and variables → Actions`

| Secret | Valor |
|--------|-------|
| `JENKINS_URL` | URL do seu Jenkins (ex: `http://jenkins.empresa.com:8080`) |
| `JENKINS_JOB_NAME` | Nome do job Jenkins (ex: `cypress-automation`) |
| `JENKINS_USER` | Usuário do Jenkins |
| `JENKINS_TOKEN` | API Token do Jenkins (`Usuário → Configure → API Token`) |

> **Nota:** `GITHUB_TOKEN` é gerado automaticamente — não precisa criar.

---

## 3. Habilitar GitHub Packages (ghcr.io)

O workflow usa `GITHUB_TOKEN` com permissão `packages: write` — já configurado
no workflow. Nenhuma ação adicional necessária.

Para visualizar as imagens publicadas:
`https://github.com/SEU_ORG/SEU_REPO/pkgs/container/cypress-runner`

---

## 4. Configurar Jenkins

### 4.1 Instalar plugins obrigatórios
- Allure Jenkins Plugin
- Docker Pipeline Plugin
- Generic Webhook Trigger Plugin (para receber o webhook)

### 4.2 Criar Credential para ghcr.io
```
Jenkins → Credentials → System → Global → Add Credentials
  Tipo: Username with password
  ID: ghcr-credentials
  Username: seu-usuario-github
  Password: Personal Access Token (escopo: read:packages)
```

### 4.3 Criar o Job no Jenkins
```
Novo Job → Pipeline → Nome: cypress-automation
  ✅ This project is parameterized
  Pipeline: Pipeline script from SCM
  SCM: Git → URL do seu repositório
  Script Path: Jenkinsfile
```

### 4.4 Expor Jenkins para receber webhook
Se o Jenkins estiver local (não acessível pela internet), use ngrok:
```bash
ngrok http 8080
# Copie a URL gerada e use como JENKINS_URL no GitHub Secrets
```

---

## 5. Executar localmente

```bash
# Todos os testes
npm run cy:run

# Só testes de UI
npm run cy:run:ui

# Só testes de API
npm run cy:run:api

# Só smoke tests
npm run cy:run:smoke

# Via Docker
docker-compose up cypress-ui
docker-compose up cypress-api

# Gerar e abrir relatório Allure
npm run allure:report
```

---

## 6. Fluxo completo do pipeline

```
Push para main
      │
      ▼
GitHub Actions
  ├── API Tests (backend)     ─────────────────┐
  └── UI Tests (paralelo)                      │
       ├── auth                                │
       ├── products                            │  Todos passaram?
       ├── cart                                │
       ├── checkout                            │
       └── misc               ─────────────────┘
                                      │
                               ✅ SIM │ ❌ NÃO → Pipeline para aqui
                                      │
                                      ▼
                          Build Docker Image
                          Push → ghcr.io/org/repo/cypress-runner:latest
                                      │
                                      ▼
                          Webhook → Jenkins
                                      │
                                      ▼
                          Jenkins Pipeline
                          ├── Pull imagem do ghcr.io
                          ├── API Tests com a imagem
                          ├── UI Tests em paralelo com a imagem
                          ├── Gerar Allure Report
                          ├── Publicar no Jenkins
                          └── Limpar imagem local
```
