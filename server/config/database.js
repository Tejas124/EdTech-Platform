const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("DB connection Successful !"))
    .catch((error) => {
        console.log("Error in DB Connection...");
        console.log(error);
        process.exit(1);
    }) 
}