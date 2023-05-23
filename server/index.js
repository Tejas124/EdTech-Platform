const express = require("express");
const app = express();
const db = require("./config/database");
require("dotenv").config();

app.use(express.json());
//PORT
const port = process.env.PORT;

db.connect();

app.listen(port, () => {
    console.log(`App is Listening on port ${port}`);
})



