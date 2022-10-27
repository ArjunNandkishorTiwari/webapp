const config = require("config");
//require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();


const {Sequelize, DataTypes} = require("sequelize");


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: false,
        port: 3306
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

        sequelize.sync({force:false}).then(()=>{      //if the database is not present it will be created
            console.log("Sync Successful");
        }).catch(err=>{
            console.log("Sync Failed",err);
        });
        
    } catch (error) {

        console.log("Error in connecting to the database :-  ",error)
        
    }
}





db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models  = {};
db.models.User = require("../models/users")(sequelize,Sequelize);
db.models.Document = require("../models/documents")(sequelize,Sequelize);


module.exports = db;