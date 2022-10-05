const bcrypt = require("bcryptjs");


const comparePassword = (text, hashed) => {

    const bool = bcrypt.compareSync(text,hashed);

    return bool;

}


module.exports = {
    comparePassword
}