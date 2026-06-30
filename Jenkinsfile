pipeline {
    agent any

    // ── Parâmetros recebidos via webhook do GitHub Actions ────────────────────
    parameters {
        string(
            name: 'DOCKER_IMAGE',
            defaultValue: 'ghcr.io/erictonfelicidade86/cypress_jenkins_allure/cypress-runner:latest',
            description: 'Imagem Docker validada pelo GitHub Actions'
        )
        string(
            name: 'GIT_COMMIT',
            defaultValue: '',
            description: 'SHA do commit que gerou a imagem'
        )
        string(
            name: 'TRIGGERED_BY',
            defaultValue: 'manual',
            description: 'Origem do trigger: github-actions ou manual'
        )
    }

    environment {
        ALLURE_RESULTS  = 'allure-results'
        ALLURE_REPORT   = 'allure-report'
        CYPRESS_allure  = 'true'
        CYPRESS_baseUrl = 'https://automationexercise.com'
    }

    stages {
        // ── Stage 1: Pull da imagem validada ─────────────────────────────────
        stage('Pull Docker Image') {
            steps {
                script {
                    echo "═══════════════════════════════════════════"
                    echo " Imagem: ${params.DOCKER_IMAGE}"
                    echo " Commit: ${params.GIT_COMMIT}"
                    echo " Origem: ${params.TRIGGERED_BY}"
                    echo "═══════════════════════════════════════════"

                    withCredentials([usernamePassword(
                        credentialsId: 'ghcr-credentials',
                        usernameVariable: 'GHCR_USER',
                        passwordVariable: 'GHCR_TOKEN'
                    )]) {
                        powershell "echo \$env:GHCR_TOKEN | docker login ghcr.io -u \$env:GHCR_USER --password-stdin"
                    }

                    powershell "docker pull ${params.DOCKER_IMAGE}"
                    echo "✅ Imagem baixada com sucesso"
                }
            }
        }

        // ── Stage 2: Preparação do ambiente ──────────────────────────────────
        stage('Prepare Environment') {
            steps {
                powershell """
                    if (Test-Path allure-results) { Remove-Item -Recurse -Force allure-results }
                    if (Test-Path allure-report)  { Remove-Item -Recurse -Force allure-report }
                    New-Item -ItemType Directory -Force -Path allure-results | Out-Null
                """
                echo "✅ Ambiente limpo e pronto"
            }
        }

        // ── Stage 3: Testes de API (Backend) ─────────────────────────────────
        stage('API Tests (Backend)') {
            steps {
                echo "🔌 Executando testes de API..."
                powershell """
                    \$ws = (Get-Location).Path -replace '\\\\', '/'
                    docker run --rm `
                        -v "\${ws}/allure-results:/cypress-automation/allure-results" `
                        -e CYPRESS_allure=true `
                        -e CYPRESS_baseUrl=${CYPRESS_baseUrl} `
                        ${params.DOCKER_IMAGE} `
                        npx cypress run `
                            --spec "cypress/e2e/api/**/*.cy.js" `
                            --reporter spec
                """
            }
            post {
                failure { echo "❌ Falhas encontradas nos testes de API" }
            }
        }

        // ── Stage 4: Testes de UI (Frontend) em paralelo ─────────────────────
        stage('UI Tests (Frontend)') {
            parallel {
                stage('Auth') {
                    steps {
                        powershell """
                            \$ws = (Get-Location).Path -replace '\\\\', '/'
                            docker run --rm `
                                -v "\${ws}/allure-results:/cypress-automation/allure-results" `
                                -v "\${ws}/cypress/screenshots:/cypress-automation/cypress/screenshots" `
                                -v "\${ws}/cypress/videos:/cypress-automation/cypress/videos" `
                                -e CYPRESS_allure=true `
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} `
                                ${params.DOCKER_IMAGE} `
                                npx cypress run `
                                    --spec "cypress/e2e/ui/auth/**/*.cy.js" `
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Products') {
                    steps {
                        powershell """
                            \$ws = (Get-Location).Path -replace '\\\\', '/'
                            docker run --rm `
                                -v "\${ws}/allure-results:/cypress-automation/allure-results" `
                                -v "\${ws}/cypress/screenshots:/cypress-automation/cypress/screenshots" `
                                -e CYPRESS_allure=true `
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} `
                                ${params.DOCKER_IMAGE} `
                                npx cypress run `
                                    --spec "cypress/e2e/ui/products/**/*.cy.js" `
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Cart') {
                    steps {
                        powershell """
                            \$ws = (Get-Location).Path -replace '\\\\', '/'
                            docker run --rm `
                                -v "\${ws}/allure-results:/cypress-automation/allure-results" `
                                -v "\${ws}/cypress/screenshots:/cypress-automation/cypress/screenshots" `
                                -e CYPRESS_allure=true `
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} `
                                ${params.DOCKER_IMAGE} `
                                npx cypress run `
                                    --spec "cypress/e2e/ui/cart/**/*.cy.js" `
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Checkout') {
                    steps {
                        powershell """
                            \$ws = (Get-Location).Path -replace '\\\\', '/'
                            docker run --rm `
                                -v "\${ws}/allure-results:/cypress-automation/allure-results" `
                                -v "\${ws}/cypress/screenshots:/cypress-automation/cypress/screenshots" `
                                -e CYPRESS_allure=true `
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} `
                                ${params.DOCKER_IMAGE} `
                                npx cypress run `
                                    --spec "cypress/e2e/ui/checkout/**/*.cy.js" `
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Misc') {
                    steps {
                        powershell """
                            \$ws = (Get-Location).Path -replace '\\\\', '/'
                            docker run --rm `
                                -v "\${ws}/allure-results:/cypress-automation/allure-results" `
                                -v "\${ws}/cypress/screenshots:/cypress-automation/cypress/screenshots" `
                                -e CYPRESS_allure=true `
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} `
                                ${params.DOCKER_IMAGE} `
                                npx cypress run `
                                    --spec "cypress/e2e/ui/misc/**/*.cy.js" `
                                    --browser chrome --headless
                        """
                    }
                }
            }
        }

        // ── Stage 5: Gerar e Publicar Allure Report ──────────────────────────
        stage('Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: "${ALLURE_RESULTS}"]]
                ])
                echo "✅ Relatório Allure publicado no Jenkins"
            }
        }
    }

    // ── Post: ações após o pipeline ───────────────────────────────────────────
    post {
        always {
            archiveArtifacts(
                artifacts: 'cypress/screenshots/**,cypress/videos/**',
                allowEmptyArchive: true
            )
        }
        success {
            echo "✅ PIPELINE CONCLUÍDO COM SUCESSO — Relatório disponível no Jenkins"
        }
        failure {
            echo "❌ PIPELINE COM FALHAS — Verifique o Allure Report"
        }
        cleanup {
            powershell "docker rmi ${params.DOCKER_IMAGE} 2>null; exit 0"
            echo "🧹 Limpeza concluída"
        }
    }
}
