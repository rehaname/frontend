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
                    sh 'npm install'
                }
            }
        }
        stage('Publish') {
            steps {
                dir("."){
                    sh "rm -rf build"
                    sh "npm run build"
                    sh "docker build . -t hamster-ui:1.0.0.${env.BUILD_ID}"
                }
            }
        }
        stage('Deploy') {
            steps {
                dir("."){
                    sh "VERSION=1.0.0.${env.BUILD_ID} docker-compose down"
                    sh "VERSION=1.0.0.${env.BUILD_ID} docker-compose up -d"
                }
            }
        }
    }
}
