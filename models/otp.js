const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true

    },
    otp:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        expires: 5*60
    

    }
})


// A function to send Email
async function sendEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
        console.log("Email Sent SuccessFully", mailResponse)
    } catch (error) {
        console.log("Error in Sending Mail ",error);
    }
}

//Pre Middleware
otpSchema.pre("save", async function(next){
    await sendEmail(this.email, this.otp);
    next();
}) 

module.exports = mongoose.model("otp", otpSchema);