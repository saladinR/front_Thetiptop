pipeline {
    agent any

    

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push') {
            steps {
                script {
                    sh 'docker build -t test .'
                }
            }
        }
    }
    

    post {
        always {
            // Clean up any Docker images or containers here if needed
        }
    }
}