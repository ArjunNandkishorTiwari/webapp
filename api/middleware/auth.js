


const auth = (req,res,next) => {

   

    var authHead = req.headers.authorization;


    if (!authHead) {
        return res.status(401).send();
    }

    var auth = new Buffer.from(authHead.split(' ')[1],
    'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];

   

    if (!username || !password){
        return res.status(401).send();
    }

    req.user = username;
    req.pass = password;

    next();

}

module.exports = auth