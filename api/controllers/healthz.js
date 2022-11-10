const log = require("../middleware/logger");
const logger = log.getLogger("logs");

var lynx = require("lynx");

const sdc = new lynx('localhost',8125);

// var SDC = require("statsd-client");


// const sdc = new SDC({
//     host : 'localhost',
//     port : 8125,
// })




const healthGet = (req,res) => {
    const timer = sdc.createTimer('healthz.time');
    sdc.increment('POST/Public/get healthz ');
    logger.info("inside healthGet");
    res.set('Content-Type', 'application/json')
    timer.stop();
    res.status(200).send();

}

module.exports = {
    healthGet
}