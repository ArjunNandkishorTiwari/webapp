# webapp

## Assignment - 7

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
6. aws --region us-east-1 --profile prod cloudformation create-stack --stack-name myVPC --template-body file://csye6225-infra.yml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=VpcCIDR,ParameterValue="10.192.0.0/16" ParameterKey=PublicSubnet1CIDR,ParameterValue="10.192.10.0/24" ParameterKey=PublicSubnet2CIDR,ParameterValue="10.192.11.0/24" ParameterKey=PublicSubnet3CIDR,ParameterValue="10.192.25.0/24" ParameterKey=AZ1,ParameterValue=0 ParameterKey=AZ2,ParameterValue=1 ParameterKey=AZ3,ParameterValue=2 ParameterKey=AmiID,ParameterValue="ami-00752b59486064a14" ParameterKey=S3BucketName,ParameterValue="aurjgjrt" ParameterKey=DatabaseUser,ParameterValue="csye6225" ParameterKey=DatabasePassword,ParameterValue="csye6225" ParameterKey=DatabaseName,ParameterValue="csye6225" ParameterKey=DNSDomain,ParameterValue="prod.arjuntiwari.me." ParameterKey=ExpirationMinute,ParameterValue=2

7. aws configure --profile=profile_name
8. export AWS_DEFAULT_PROFILE=dev
9. sudo touch /home/ubuntu/webapp/logs/csye6225.log #change later
10. sudo chmod 777 /home/ubuntu/webapp/logs/csye6225.log #change later
11. sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb #works
12. sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
13. sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/home/ubuntu/webapp/cloudwatch-config.json
14. aws cloudwatch list-metrics --namespace AWS/EC2 --dimensions Name=InstanceId,Value=
15. packer validate amiFinal.pkr.hcl
16. aws acm import-certificate --certificate fileb://Certificate.pem --certificate-chain fileb://CertificateChain.pem --private-key fileb://PrivateKey.pem










