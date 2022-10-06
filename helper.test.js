const {comparePassword} = require("./api/helper/helper");
const conf = require("../webapp/config/conf");



test("Check if password is correct", ()=> {
    expect(comparePassword(conf.passTest,conf.passHash)).toBe(true);

});

