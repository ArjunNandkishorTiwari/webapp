# sudo apt-get -y install curl
# curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
# sudo apt-get -y install nodejs


# echo "zip unzip working"

# sudo apt-get install zip unzip
# sudo unzip webapp.zip -d webapp

# sudo npm i -g pm2

# echo "Install mysql server"

# sudo apt-get install mysql-server -y

# sudo mysql <<EOF

# CREATE DATABASE apidb;


# CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';


# GRANT ALL PRIVILEGES ON apidb.* TO 'user'@'localhost' WITH GRANT OPTION;


# FLUSH PRIVILEGES;

# EOF

# echo "Start mysql server"

# sudo service mysql start

# cd webapp
# cd webapp


# echo "Install node modules"

# sudo npm install
# sudo pm2 start app.js
# sudo pm2 startup systemd
# sudo pm2 save
# sudo pm2 list


# sudo pm2 status



sudo apt-get -y install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get -y install nodejs
sudo apt-get install zip unzip
sudo unzip webapp.zip -d webapp
sudo npm i -g pm2
#sudo apt-get -y install mysql