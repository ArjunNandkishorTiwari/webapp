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

const connectionDB = async() => {
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


connectionDB();


// const db = {}

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.users = require("./users")(sequelize,DataTypes);

// db.sequelize.sync({})

const User = sequelize.define("users",{

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull:true
    },

    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    account_created:{
        type: Sequelize.STRING,
        allowNull:false
    },
    account_updated:{
        type: Sequelize.STRING,
        allowNull: false

    }

},{
    freezeTableName: true
  })

sequelize.sync({force:false});

module.exports =  User;