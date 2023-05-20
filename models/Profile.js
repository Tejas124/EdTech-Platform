const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: Number,
        required: true,
    },
   
})

module.exports = mongoose.model("Profile", profileSchema);