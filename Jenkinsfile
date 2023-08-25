pipeline {
    agent any
    environment {
        SCANNER_HOME = tool 'sonar_test'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Construire l\'image') {
            steps {
                echo "Construction de l'image Docker..."
                withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh "docker build -t salaheddineraiss/front_end ."
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh "docker push salaheddineraiss/front_end"
                }
            }
        }

        stage('Analyse SonarQube') {
            steps {
                withSonarQubeEnv('SonarQubeScanner_front') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectKey=frontend  \
                    -Dsonar.sources=.  '''
                }
            }
        }

        stage('Déployer l\'image') {
            steps {
                echo "Déploiement de l'image Docker..."
                sshagent(['ssh-instance']) {                
                    sh "ssh -o StrictHostKeyChecking=no root@217.160.8.74 'docker-compose up -d' "   
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh '''
                docker run --net=host -v /root:/workspace -w /workspace selenium/standalone-chrome:latest python3 selenium_test.py
                '''
            }
        }
    }
    
    post {
        always {
            // Nettoyer après la fin du pipeline
            deleteDir()
        }
    }
}
