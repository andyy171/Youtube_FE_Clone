# Cloud-Based CI/CD Pipeline on AWS
## 📌 Project Overview
This project implements an automated DevSecOps CI/CD pipeline for a custom YouTube clone frontend app. GitHub changes trigger a Jenkins pipeline to analyze code (SonarQube), scan vulnerabilities (Trivy), build/push Docker images, deploy to AWS EKS, monitor with Prometheus/Grafana.

**Tools & Technologies**:
- Infrastructure: AWS (EC2, EKS), Terraform
- **CI/CD**: Jenkins, Docker, DockerHub, Trivy
- **Code Quality**: SonarQube
- **Frontend**: Node.js
- **Monitoring**: Prometheus, Grafana
- **Orchestration**: Kubernetes (AWS EKS), Helm
- **Notification**: Gmail SMTP

---

## ⚙️ Infrastructure Setup

1. Provision AWS infrastructure (EC2, ECR) with **Terraform**.
2. Install and configure on EC2:
   - Jenkins
   - Docker
   - SonarQube
   - Aqua Trivy
   - Java + AWS CLI

---

## 🚀 CI/CD Pipeline Workflow

1. **Checkout Code** – Trigger source code from GitHub.
2. **SonarQube Analysis** – Perform static code analysis.
3. **Quality Gate** – Validate code quality.
4. **NPM Install** – Install project dependencies.
5. **Trivy Scan** – Scan code for vulnerabilities.
6. **Docker Build & Push** – Build Docker image and Push image to DockerHub (tagged with build number + latest).
7. **Deploy to EKS** - Deploy application to AWS EKS 
8. **Cleanup** – Remove images from Jenkins and terminate AWS resources.

---

## 📜 Jenkinsfile (Pipeline Script)

```groovy
  pipeline {
      agent any
      tools {
          jdk 'jdk17'
          nodejs 'node16'
      }
      environment {
          SCANNER_HOME = tool 'sonar-scanner'
      }
      stages {
          stage('Clean workspace') {
              steps {
                  cleanWs()
              }
          }
          stage('Checkout from Git') {
              steps {
                  git branch: 'master', url:'https://github.com/andyy171/Youtube_FE_Clone.git'
              }
          }
          stage("Sonarqube Analysis") {
              steps {
                  withSonarQubeEnv('SonarQube-Server') {
                      sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Youtube-CICD \
                      -Dsonar.projectKey=Youtube-CICD'''
                  }
              }
          }
          stage("Quality Gate") {
              steps {
                  script {
                      waitForQualityGate abortPipeline: false, credentialsId: 'SonarQube-Token'
                  }
              }
          }
          stage('Install Dependencies') {
              steps {
                  sh "npm install"
              }
          }
          stage('TRIVY FS SCAN') {
               steps {
                   sh "trivy fs . > trivyfs.txt"
               }
           }
           stage("Docker Build & Push"){
               steps{
                   script{
                     withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker'){   
                        sh "docker build -t youtube-clone ."
                        sh "docker tag youtube-clone andyy171/youtube-clone:latest "
                        sh "docker push andyy171/youtube-clone:latest "
                      }
                  }
              }
          }
          stage("TRIVY Image Scan"){
              steps{
                  sh "trivy image andyy171/youtube-clone:latest > trivyimage.txt" 
              }
          }
          stage('Deploy to Kubernets'){
              steps{
                  script{
                      dir('Kubernetes') {
                        withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'kubernetes', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                        sh 'kubectl delete --all pods'
                        sh 'kubectl apply -f deployment.yml'
                        sh 'kubectl apply -f service.yml'
                        }   
                      }
                  }
              }
          }
      }
      post {
       always {
          emailext attachLog: true,
              subject: "'${currentBuild.result}'",
              body: "Project: ${env.JOB_NAME}<br/>" +
                  "Build Number: ${env.BUILD_NUMBER}<br/>" +
                  "URL: ${env.BUILD_URL}<br/>",
              to: 'zinzinxx01@gmail.com',                              
              attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
          }
      }
  }
```
## 📊 Architecture Diagram


## ✅ Outcome

- Fully automated CI/CD pipeline on AWS.
- Integrated static code analysis (SonarQube) and vulnerability scanning (Trivy).
- Built and pushed Docker images to DockerHub.
- Deploy application to EKS 
