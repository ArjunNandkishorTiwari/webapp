#!/bin/sh
echo "Installing Curl , nodejs 16.x "
sudo apt-get -y install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get -y install nodejs


echo "zip unzip working"

sudo apt-get install zip unzip
sudo unzip webapp.zip -d webapp

echo "Installing pm2"
sudo npm i -g pm2

echo "Going in webapp"
cd /home/ubuntu/webapp/ #need to change path later

sudo mkdir -p /home/ubuntu/webapp/logs

sudo touch /home/ubuntu/webapp/logs/csye6225.log

sudo chmod 777 /home/ubuntu/webapp/logs/csye6225.log

echo "Install node modules"

sudo npm install
sudo pm2 start app.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list


sudo pm2 status



sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb #works
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/home/ubuntu/webapp/cloudwatch-config.json

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a status


