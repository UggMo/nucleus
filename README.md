# Simple HTTPS Node.js Service on docker

## Overview

This is a minimal HTTPS-enabled Node.js web service running in Docker. It demonstrates basic containerization and using a self-signed certificate.

## Setup Instructions

### 1. Generate SSL Certificates

Certificates are not included in the repository for security reasons. Generate them locally:

create directory
```
mkdir certification
```
create ssl cert (.gitignored the key.pem and cert.pem)
```
openssl req -x509 -newkey rsa:2048 -nodes -keyout certification/key.pem -out certification/cert.pem -days 365 -subj "/CN=localhost"
```

### 2. Run the Application

```
docker-compose up --build
```

### 3. Access the Service

Open your browser and go to:

```
https://localhost:3000
```

## Design Choices

* Used Node.js built-in `https` module for simplicity
* Self-signed certificate to enable HTTPS locally
* Docker + dockercompose for easy local execution

## AI Tools Used

* windsurf (copilot clone) in my vscode for writing every file.

## Cloud Deployment Approach

In a cloud environment, I'll go into AWS because I'm most familiar

I'd create the repo in Amazon ECR (their registry for containers), then tag and push the image. I thought about EC2 however it’s overkill compared to an ECS Fargate cluster. I’ll have it behind an application load balancer.
I will handle HTTPS using AWS instead of Node.js by requesting a certificate from AWS Certificate Manager and attaching it to the ALB. The ALB will listen on port 443 (HTTPS) and forward traffic to the ECS service on 
port 3000 over HTTP. Afterwards, I just need to make sure the security groups are set up properly, the ALB allows inbound traffic on 443, and the ECS tasks only allow traffic on port 3000 from the ALB. For health checks,
I can set a short timeout like 5 seconds on a /health endpoint in the app itself to confirm the service is running.

## Security Note

Private SSL keys should never be committed to a repository. If exposed, they can be used to compromise. In production, keys should be stored securely using a secret manager.
