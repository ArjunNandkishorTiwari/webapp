
module.exports = (sequelize, Sequelize) => {

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
  });

  return User;



};

