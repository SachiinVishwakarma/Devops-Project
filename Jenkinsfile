pipeline {
  agent any

  environment {
    DOCKER_USER = 'sachin193'
    BACKEND_IMAGE = "$DOCKER_USER/backend:latest"
    FRONTEND_IMAGE = "$DOCKER_USER/frontend:latest"
    SERVER_IP = '192.168.52.1'
    PROJECT_DIR = 'DevOps'
  }

  stages {

    stage('Clone Code') {
      steps {
        git 'https://github.com/SachiinVishwakarma/Devops-Project.git'
      }
    }

    stage('Build Backend Image') {
      steps {
        sh 'docker build -t $BACKEND_IMAGE ./backend'
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh 'docker build -t $FRONTEND_IMAGE ./frontend'
      }
    }

    stage('Login to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-creds',
          usernameVariable: 'DOCKER_USER_NAME',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          sh '''
          echo $DOCKER_PASSWORD | docker login -u $DOCKER_USER_NAME --password-stdin
          '''
        }
      }
    }

    stage('Push Images') {
      steps {
        sh '''
        docker push $BACKEND_IMAGE
        docker push $FRONTEND_IMAGE
        '''
      }
    }

    stage('Deploy to Server') {
      steps {
        sshagent(['server-ssh']) {
          sh '''
          ssh -o StrictHostKeyChecking=no ubuntu@$SERVER_IP "
          cd $PROJECT_DIR &&
          docker-compose pull &&
          docker-compose up -d
          "
          '''
        }
      }
    }

  }

  post {
    success {
      echo "✅ Deployment successful!"
    }
    failure {
      echo "❌ Pipeline failed!"
    }
  }
}