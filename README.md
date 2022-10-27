# webapp

## Assignment - 4

#### Name :- Arjun Nandkishor Tiwari
#### NUID :- 002176236

#### E-mail: tiwari.ar@northeastern.edu 

Repository for CSYE 6225 Network Structure and Cloud Computing (Fall 2022) under prof. Tejas Parekh.



 
#### Prerequisites:
1. Node
2. npm
3. Git Workflow
4. Continuous Integration
5. Cloud Formation
6. AWS EC2, AMI, IAM
#### Assignment Requirements:


1. Building Custom Application AMI using Packer
2. Continuous Integration: Add New GitHub Actions Workflow for Web App
3. Infrastructure as Code w/ CloudFormation
4. As a user, I expect the code quality of the application is maintained to the highest standards using the unit and/or integration tests.
5. AMI Building should be triggered after pull request with github workflow
   

##### Important Instructions and Commands


1. Clone this repo locally 
2. Use cd command on terminal to reach webapp directory
3. run npm install to install all the dependencies
4. npm test for unit testing
5. run "npm run start" command on the terminal
6. aws --region us-east-1 --profile dev cloudformation create-stack --stack-name arjunVPC2 --template-body file://csye6225-infra.yml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=VpcCIDR,ParameterValue="10.192.0.0/16" ParameterKey=PublicSubnet1CIDR,ParameterValue="10.192.10.0/24" ParameterKey=PublicSubnet2CIDR,ParameterValue="10.192.11.0/24" ParameterKey=PublicSubnet3CIDR,ParameterValue="10.192.25.0/24" ParameterKey=AZ1,ParameterValue=0 ParameterKey=AZ2,ParameterValue=1 ParameterKey=AZ3,ParameterValue=001 ParameterKey=AmiID,ParameterValue="ami-093124e301f3c8814" ParameterKey=S3BucketName,ParameterValue="arjundevbucket2" ParameterKey=DatabaseUser,ParameterValue="csye6225" ParameterKey=DatabasePassword,ParameterValue="csye6225" ParameterKey=DatabaseName,ParameterValue="csye6225"

S3BucketName

Credentials for assignment_4
{
    "user" : "user",
    "host" : "localhost",
    "password" : "user",
    "database" : "apidb",
    "port" : "3306",
    "dialect" : "mysql",
    "poolMax" : "5",
    "poolMin" : "0"

}

export AWS_DEFAULT_PROFILE = dev


        Fn::Base64
          !Sub |
          #!/bin/bash
          DB_HOST=${RDSInstance.Endpoint.Address}
          DB_USER=${DatabaseUser}
          AWS_BUCKET=${S3Bucket}
          DB_NAME=${DatabaseName}
          DB_PASSWORD=${DatabasePassword}
          echo "Done with setting environment variables"
          sudo apt-get update -y
          cd home/ubuntu/webapp/webapp
          sudo npm install
          sudo pm2 start app.js
          sudo pm2 startup systemd
          sudo pm2 save
          sudo pm2 list
          sudo pm2 status



aws --region us-east-1 --profile dev cloudformation create-stack --stack-name arjunVPC1 --template-body file://csye6225-infra.yml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=VpcCIDR,ParameterValue="10.192.0.0/16" ParameterKey=PublicSubnet1CIDR,ParameterValue="10.192.10.0/24" ParameterKey=PublicSubnet2CIDR,ParameterValue="10.192.11.0/24" ParameterKey=PublicSubnet3CIDR,ParameterValue="10.192.25.0/24" ParameterKey=AZ1,ParameterValue=0 ParameterKey=AZ2,ParameterValue=1 ParameterKey=AZ3,ParameterValue=001 ParameterKey=AmiID,ParameterValue="ami-093124e301f3c8814" ParameterKey=S3BucketName,ParameterValue="arjundevbucket4" ParameterKey=DatabaseUser,ParameterValue="csye62252" ParameterKey=DatabasePassword,ParameterValue="csye62252" ParameterKey=DatabaseName,ParameterValue="csye62252"


cd home/ubuntu/webapp/webapp
          sudo npm install
          sudo pm2 start app.js
          sudo pm2 startup systemd
          sudo pm2 save
          sudo pm2 list
          sudo pm2 status