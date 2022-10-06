const express = require("express");
const app = express();

const routerHealthz = require("./api/routes/healthzs.js");
const routeUser = require("./api/routes/users");



app.use(express.json());



app.use("/healthz",routerHealthz);
app.use("/v1/account",routeUser);

const port = 9000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});



