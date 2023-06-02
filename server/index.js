const express = require("express");
const app = express();
const db = require("./config/database");
require("dotenv").config();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
//PORT
const port = process.env.PORT;

db.connect();

app.listen(port, () => {
    console.log(`App is Listening on port ${port}`);
})



