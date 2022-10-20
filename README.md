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


1. All API request/response payloads should be in JSON.
2. No UI should be implemented for the application.
3. As a user, I expect all API calls to return with a proper HTTP status code.
4. As a user, I expect the code quality of the application is maintained to the highest standards using the unit and/or integration tests.
5. AMI Building should be triggered after pull request with github workflow
   

##### Important Instructions and Commands


1. Clone this repo locally 
2. Use cd command on terminal to reach webapp directory
3. run npm install to install all the dependencies
4. npm test for unit testing
5. run "npm run start" command on the terminal
6. aws --region us-east-1 --profile demo cloudformation create-stack --stack-name arjunVPCParam --template-body file://csye6225-infra.yml --parameters ParameterKey=VpcCIDR,ParameterValue="10.192.0.0/16" ParameterKey=PublicSubnet1CIDR,ParameterValue="10.192.10.0/24" ParameterKey=PublicSubnet2CIDR,ParameterValue="10.192.11.0/24" ParameterKey=PublicSubnet3CIDR,ParameterValue="10.192.25.0/24" ParameterKey=AZ1,ParameterValue=0 ParameterKey=AZ2,ParameterValue=1 ParameterKey=AZ3,ParameterValue=001 ParameterKey=AmiID,ParameterValue="ami-0c7fcc5f66b84323c"
