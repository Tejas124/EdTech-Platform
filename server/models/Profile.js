const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        
        trim: true
    },
    dob: {
        type: String,
        
        trim: true
    },
    about: {
        type: String,
        
        trim: true
    },
    contactNumber: {
        type: Number,
        
    },
   
})

module.exports = mongoose.model("Profile", profileSchema);