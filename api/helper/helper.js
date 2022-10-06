const bcrypt = require("bcryptjs");


const comparePassword = (text, hashed) => {

    const bool = bcrypt.compareSync(text,hashed);

    return bool;

}

function validateEmailId(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


module.exports = {
    comparePassword,
    validateEmailId
}