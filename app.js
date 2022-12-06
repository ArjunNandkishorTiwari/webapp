const express = require("express");
const app = express();

const db = require("./api/middleware/db");

const routerHealthz = require("./api/routes/healthzs.js");
const routeUser = require("./api/routes/users");
const routeDocument = require("./api/routes/documents");
const routeVerify = require("./api/routes/verify");

db.connectionDB();

app.use(express.json());



app.use("/health",routerHealthz);
app.use("/v1/account",routeUser);
app.use("/v1/documents",routeDocument);
app.use("/v1/verifyUserEmail",routeVerify);


const port = 9000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});



