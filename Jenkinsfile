pipeline {
    agent any

    // ── Parâmetros recebidos via webhook do GitHub Actions ────────────────────
    parameters {
        string(
            name: 'DOCKER_IMAGE',
            defaultValue: 'ghcr.io/SEU_ORG/cypress_jenkins_allure/cypress-runner:latest',
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
                        sh "echo ${GHCR_TOKEN} | docker login ghcr.io -u ${GHCR_USER} --password-stdin"
                    }

                    sh "docker pull ${params.DOCKER_IMAGE}"
                    echo "✅ Imagem baixada com sucesso"
                }
            }
        }

        // ── Stage 2: Preparação do ambiente ──────────────────────────────────
        stage('Prepare Environment') {
            steps {
                sh "rm -rf ${ALLURE_RESULTS} ${ALLURE_REPORT} || true"
                sh "mkdir -p ${ALLURE_RESULTS}"
                echo "✅ Ambiente limpo e pronto"
            }
        }

        // ── Stage 3: Testes de API (Backend) ─────────────────────────────────
        stage('API Tests (Backend)') {
            steps {
                echo "🔌 Executando testes de API..."
                sh """
                    docker run --rm \
                        -v \$(pwd)/allure-results:/cypress-automation/allure-results \
                        -e CYPRESS_allure=true \
                        -e CYPRESS_baseUrl=${CYPRESS_baseUrl} \
                        ${params.DOCKER_IMAGE} \
                        npx cypress run \
                            --spec "cypress/e2e/api/**/*.cy.js" \
                            --reporter spec
                """
            }
            post {
                always {
                    echo "📁 Resultados API coletados em allure-results/"
                }
                failure {
                    echo "❌ Falhas encontradas nos testes de API"
                }
            }
        }

        // ── Stage 4: Testes de UI (Frontend) em paralelo ─────────────────────
        stage('UI Tests (Frontend)') {
            parallel {
                stage('Auth') {
                    steps {
                        sh """
                            docker run --rm \
                                -v \$(pwd)/allure-results:/cypress-automation/allure-results \
                                -v \$(pwd)/cypress/screenshots:/cypress-automation/cypress/screenshots \
                                -v \$(pwd)/cypress/videos:/cypress-automation/cypress/videos \
                                -e CYPRESS_allure=true \
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} \
                                ${params.DOCKER_IMAGE} \
                                npx cypress run \
                                    --spec "cypress/e2e/ui/auth/**/*.cy.js" \
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Products') {
                    steps {
                        sh """
                            docker run --rm \
                                -v \$(pwd)/allure-results:/cypress-automation/allure-results \
                                -v \$(pwd)/cypress/screenshots:/cypress-automation/cypress/screenshots \
                                -e CYPRESS_allure=true \
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} \
                                ${params.DOCKER_IMAGE} \
                                npx cypress run \
                                    --spec "cypress/e2e/ui/products/**/*.cy.js" \
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Cart') {
                    steps {
                        sh """
                            docker run --rm \
                                -v \$(pwd)/allure-results:/cypress-automation/allure-results \
                                -v \$(pwd)/cypress/screenshots:/cypress-automation/cypress/screenshots \
                                -e CYPRESS_allure=true \
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} \
                                ${params.DOCKER_IMAGE} \
                                npx cypress run \
                                    --spec "cypress/e2e/ui/cart/**/*.cy.js" \
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Checkout') {
                    steps {
                        sh """
                            docker run --rm \
                                -v \$(pwd)/allure-results:/cypress-automation/allure-results \
                                -v \$(pwd)/cypress/screenshots:/cypress-automation/cypress/screenshots \
                                -e CYPRESS_allure=true \
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} \
                                ${params.DOCKER_IMAGE} \
                                npx cypress run \
                                    --spec "cypress/e2e/ui/checkout/**/*.cy.js" \
                                    --browser chrome --headless
                        """
                    }
                }
                stage('Misc') {
                    steps {
                        sh """
                            docker run --rm \
                                -v \$(pwd)/allure-results:/cypress-automation/allure-results \
                                -v \$(pwd)/cypress/screenshots:/cypress-automation/cypress/screenshots \
                                -e CYPRESS_allure=true \
                                -e CYPRESS_baseUrl=${CYPRESS_baseUrl} \
                                ${params.DOCKER_IMAGE} \
                                npx cypress run \
                                    --spec "cypress/e2e/ui/misc/**/*.cy.js" \
                                    --browser chrome --headless
                        """
                    }
                }
            }
        }

        // ── Stage 5: Gerar Allure Report ─────────────────────────────────────
        stage('Generate Allure Report') {
            steps {
                echo "📊 Gerando relatório Allure..."
                sh "allure generate ${ALLURE_RESULTS} -o ${ALLURE_REPORT} --clean"
                echo "✅ Relatório gerado em: ${ALLURE_REPORT}/"
            }
        }

        // ── Stage 6: Publicar Relatório ───────────────────────────────────────
        stage('Publish Allure Report') {
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
            // Arquiva screenshots e vídeos para análise de falhas
            archiveArtifacts(
                artifacts: 'cypress/screenshots/**,cypress/videos/**',
                allowEmptyArchive: true
            )

            // Remove containers Docker órfãos
            sh "docker container prune -f || true"
        }

        success {
            echo """
            ╔══════════════════════════════════════╗
            ║  ✅ PIPELINE CONCLUÍDO COM SUCESSO   ║
            ║  Relatório disponível no Jenkins     ║
            ╚══════════════════════════════════════╝
            """
        }

        failure {
            echo """
            ╔══════════════════════════════════════╗
            ║  ❌ PIPELINE COM FALHAS              ║
            ║  Verifique o Allure Report           ║
            ╚══════════════════════════════════════╝
            """
        }

        cleanup {
            // Remove a imagem Docker local após execução para economizar espaço
            sh "docker rmi ${params.DOCKER_IMAGE} || true"
            echo "🧹 Limpeza concluída"
        }
    }
}
