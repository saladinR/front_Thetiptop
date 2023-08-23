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
        stage('commit version update') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        // git config here for the first time run
                        sh 'git config --global user.email "jenkins@example.com"'
                        sh 'git config --global user.name "jenkins"'

                        sh "git remote set-url origin https://${USER}:${PASS}@github.com/saladinR/front_Thetiptop.git"
                        sh 'git add version.txt'
                        sh 'git commit -m "ci: version bump"'
                        sh 'git push origin main'
                    }
                }
            }
        }
        post {
            always {
            // Clean up after the pipeline finishes
                deleteDir()
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