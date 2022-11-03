sudo apt-get -y install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get -y install nodejs


echo "zip unzip working"

sudo apt-get install zip unzip
sudo unzip webapp.zip -d webapp

sudo npm i -g pm2

sudo apt-get -y install iptables-persistent
sudo systemctl enable netfilter-persistent
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 9000
sudo chmod 777 /etc/iptables/rules.v4
sudo iptables-save > /etc/iptables/rules.v4


cd /home/ubuntu/webapp



echo "Install node modules"

sudo npm install
sudo pm2 start app.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list


sudo pm2 status



