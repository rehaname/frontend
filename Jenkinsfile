pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: '4eb21a15-c0da-423a-9c7a-0b56d5810cea', url: 'ssh://git@mnlcienv03-w7:10022/gogs/hamster-ui.git'
            }
        }
        stage('Install') {
            steps {
                dir("."){
                    sh '. ~/.bashrc && npm install'
                }
            }
        }
        stage('Test') {
            steps {
                dir("."){
                    sh '. ~/.bashrc && npm test'
                }
            }
        }
        stage('Publish') {
            steps {
                dir("."){
                    sh ". ~/.bashrc && docker build . -t hamster-ui:1.0.0.${env.BUILD_ID}"
                }
            }
        }
        stage('Deploy') {
            steps {
                dir("."){
                    sh ". ~/.bashrc && export VERSION=1.0.0.${env.BUILD_ID} && docker-compose down"
                    sh ". ~/.bashrc && export VERSION=1.0.0.${env.BUILD_ID} && docker-compose up -d"
                }
            }
        }
    }
}
