const express = require("express");
const app = express();

const router = require("./api/routes/index.js");



app.use(express.json());



app.use("/healthz",router);

const port = 9000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

