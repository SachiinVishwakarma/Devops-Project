pipeline {
  agent any

  environment {
    DOCKER_USER = 'sachin193'
  }

  stages {

    stage('Check Docker') {
      steps {
        bat 'docker --version'
      }
    }

    stage('Build Backend') {
      steps {
        bat "docker build -t ${DOCKER_USER}/backend:latest backend"
      }
    }

    stage('Build Frontend') {
      steps {
        bat "docker build -t ${DOCKER_USER}/frontend:latest frontend"
      }
    }

    stage('Login Docker') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-creds',
          usernameVariable: 'USER',
          passwordVariable: 'PASS'
        )]) {
          bat 'echo %PASS% | docker login -u %USER% --password-stdin'
        }
      }
    }

    stage('Push Images') {
      steps {
        bat "docker push ${DOCKER_USER}/backend:latest"
        bat "docker push ${DOCKER_USER}/frontend:latest"
      }
    }

  }

  post {
    success {
      echo "✅ Build & Push successful!"
    }
    failure {
      echo "❌ Pipeline failed!"
    }
  }
}