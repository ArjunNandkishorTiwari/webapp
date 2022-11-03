sudo apt-get -y install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get -y install nodejs


echo "zip unzip working"

sudo apt-get install zip unzip
sudo unzip webapp.zip -d webapp

sudo npm i -g pm2

sudo apt-get -y install iptables-persistent
sudo systemctl enable netfilter-persistent



cd /home/ubuntu/webapp



echo "Install node modules"

sudo npm install
sudo pm2 start app.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list


sudo pm2 status



