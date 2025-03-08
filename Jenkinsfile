properties([
    pipelineTriggers([
        githubPush(),
        [
            $class: 'GitHubPRTrigger',
            spec: 'H/5 * * * *',
            triggerMode: 'HEAVY_HOOKS',
            events: [
                [$class: 'GitHubPRCommentEvent'],
                [$class: 'GitHubPROpenEvent'],
                [$class: 'GitHubPRCommitEvent']
            ]
        ]
    ])
])

pipeline {
    agent any
    
    tools {
        nodejs "NodeJs(22.13.0)"
    }

    environment {
        GITHUB_CREDS = credentials('github-token')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                sh 'npm install -g pnpm'
            }
        }

        stage('Build & Test') {
            when {
                anyOf {
                    expression { env.CHANGE_ID != null }
                    expression { env.CHANGE_TARGET != null && env.CHANGE_BRANCH != null }
                    expression { env.BRANCH_NAME =~ /^feat\/.*/ }
                    expression { env.BRANCH_NAME =~ /^hotfix\/.*/ }
                    expression { env.BRANCH_NAME =~ /^develop\/.*/ }
                }
            }
            steps {
                script {
                    sh 'pnpm install'
                    sh 'pnpm run build'
                    
                    if (env.CHANGE_ID) {
                        echo "Processing PR #${env.CHANGE_ID}"
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'git pull origin main'
                sh 'pnpm install'
                sh 'echo "VITE_APPLICATION_KEY=$VITE_APPLICATION_KEY\nVITE_APPLICATION_REDIRECT=$VITE_APPLICATION_REDIRECT" > .env'
                sh 'pnpm run build'
                sh 'sudo cp -r out/renderer/* /home/jamkris/Documents/web/Carrier'
                sh 'sudo systemctl restart nginx'
            }
        }
    }
    
    post {
        success {
            publishChecks name: 'default',
            title: 'Pipeline Check',
            summary: 'Build succeeded',
            text: 'All stages completed successfully',
            status: 'COMPLETED',
            conclusion: 'SUCCESS',
            detailsURL: env.BUILD_URL,
            actions: [],
            annotations: []
        }
        failure {
            publishChecks name: 'default',
            title: 'Pipeline Check',
            summary: 'Build failed',
            text: 'Check pipeline logs for details',
            status: 'COMPLETED',
            conclusion: 'FAILURE'
        }
    }
}
