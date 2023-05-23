const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

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
        expires: 60 * 5, //The document will be deleted automatically after 5 mins of its creation time    
    }
});


// A function to send Email
async function sendEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
        console.log("Email Sent SuccessFully", mailResponse)
    } catch (error) {
        console.log("Error in Sending Mail ",error);
    }
}

//Pre Middleware - 
// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function(next){
    console.log("New Document saved to database");
    
    if(this.isNew) {
        await sendEmail(this.email, this.otp);
    }
    next();
}) 

module.exports = mongoose.model("otp", otpSchema);