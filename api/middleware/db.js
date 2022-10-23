const config = require("config");

const {Sequelize, DataTypes} = require("sequelize");


const sequelize = new Sequelize(
    config.get("database"),
    config.get("user"),
    config.get("password"), {
        host: config.get("host"),
        dialect: config.get("dialect"),
        operatorsAliases: false,
        port: config.get("port")
    }
);

const db = {};


db.connectionDB = async() => {
    try {

        sequelize.authenticate().then(()=>{
            console.log("Database connection Successful");

        }).catch(err=>{
            console.log("Database Connection Failed",err);
        });
        
    } catch (error) {

        console.log("Error in connecting to the database :-  ",error)
        
    }
}





db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models  = {};
db.models.User = require("../models/users")(sequelize,Sequelize)


module.exports = db;