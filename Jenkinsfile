pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = credentials('dockerhub-username')
        DOCKER_HUB_PASSWORD = credentials('dockerhub-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push') {
            steps {
                script {
                    def imageName = "your-dockerhub-username/your-docker-image-name"
                    def imageTag = "${env.BUILD_NUMBER}"

                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        def dockerImage = docker.build("${imageName}:${imageTag}", "-f Dockerfile .")
                        dockerImage.push()
                    }
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

credentials {
    usernamePassword(
        credentialsId: 'dockerhub-credentials',
        usernameVariable: 'DOCKER_HUB_USERNAME',
        passwordVariable: 'DOCKER_HUB_PASSWORD',
        description: 'Credentials for Docker Hub'
    )
}
