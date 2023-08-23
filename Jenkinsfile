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
        stages {
        stage('Increment Version') {
            steps {
                script {
                    def versionFile = 'version.txt'
                    def currentVersion = readFile(versionFile).trim()
                    def versionParts = currentVersion.split('\\.').collect { it.toInteger() }

                    versionParts[2]++ // Increment patch version

                    def newVersion = versionParts.join('.')
                    writeFile file: versionFile, text: newVersion

                    env.IMAGE_NAME = "${newVersion}-${BUILD_NUMBER}"

                    echo "Incremented version: ${currentVersion} -> ${newVersion}"
                    echo "Image name: ${env.IMAGE_NAME}"

                    // Add and commit the updated version file
                    sh "git config --global user.email 'jenkins@example.com'"
                    sh "git config --global user.name 'Jenkins CI'"
                    sh "git add ${versionFile}"
                    sh "git commit -m 'Increment version to ${newVersion}'"
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    
                    
                    withSonarQubeEnv('SonarQubeScanner_front') {
                        
                        sh '''$SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=frontend  \
                        -Dsonar.sources=.  '''
                    }
                }
            }
        }
    

        stage('build image') {
            steps {
                script {
                    echo "building the docker image..."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "docker build -t salaheddineraiss/front_end ."
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push salaheddineraiss/front_end"
                    }
                }
            }
        }
        stage('deploy image') {
            steps {
                script {
                    echo "building the docker image..."
                    sshagent(['ssh-instance']) {                
                        sh "ssh -o StrictHostKeyChecking=no root@217.160.8.74 'docker-compose up -d' "   
                    }
                }
            }
        }



        // stage('Run Tests with SonarQube') {
        //     steps {
        //         script {
        //             // Run your tests and generate the necessary reports
                    
        //             // Configure SonarQube analysis
        //             def scannerHome = tool 'sonar_test' // Make sure you have the SonarScanner tool configured in Jenkins
                    
        //             withSonarQubeEnv('SonarQube') {
        //                 sh "${scannerHome}/bin/sonar-scanner \
        //                     -Dsonar.projectKey=backend \
        //                     -Dsonar.sources=. \
        //                     -Dsonar.host.url=http://217.160.8.74:9000 \
        //                     -Dsonar.token=sqp_0e2f29539e7cfa3ca642fd741351773b7cf4aaf3"
        //             }
        //         }
        //     }
        // }
    }
    
}