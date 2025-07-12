pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        DOCKER_HUB_REPO = 'pradeepaanandh/trial'
        DOCKER_HUB_CREDENTIALS_ID = 'GitOps-dockerhub'
    }

    stages {
        stage('Checkout Github') {
            steps {
                git branch: 'main', credentialsId: 'Gitops-token-Github', url: 'https://github.com/pradeedevops/project.git'
            }
 
        }

        stage('Install node dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'building docker image...'
                    dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL --no-progress --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                script {
                    echo 'pushing docker image to DockerHub...'
                    docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_HUB_CREDENTIALS_ID}") {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Install Kubectl and ArgoCD CLI') {
            steps {
                sh '''
                    echo 'installing kubectl and ArgoCD CLI...'
                    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                    chmod +x kubectl
                    mv kubectl /usr/local/bin/kubectl
                    curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
                    chmod +x argocd
                    mv argocd /usr/local/bin/
                '''
            }
        }

        stage('Apply Kubernetes Manifests & Sync App with ArgoCD') {
            steps {
                script {
                   withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG_FILE
                        echo "synchronizing app with ArgoCD..."
                        ARGOCD_PASS=$(kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
                        argocd login 13.127.140.88:30368 --username admin --password $ARGOCD_PASS --insecure
                        argocd app sync argocdjenkins
                    '''
                  } 
                }
            }
        }
    }

    post {
        success {
            echo 'Build & Deployed completed successfully!!!'
        }
        failure {
            echo 'Build & Deploy failed. Check logs.'
        }
    }
}
