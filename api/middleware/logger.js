const log4js = require("log4js");

log4js.configure({
    appenders: {
        logs : {
            type: "file",
            filename: "/home/ubuntu/webapp/logs/csye6225.log" //shoudl be changed
        }
    },
    categories : {
        default: {
            appenders: ["logs"],
            level : "info"
        }
    }
})



  
  module.exports = log4js;


         