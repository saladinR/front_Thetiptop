pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'nanajanashia/demo-app:java-maven-2.0'
    }
    stages {
       
        stage('build image') {
            steps {
                script {
                   docker build -t test .
                }
            }
        }
        stage('publish image') {
            steps {
                script {
                   echo 'deploying docker image to EC2...'
                }
            }
        }
    }
}

