const User  = require("../models/User");
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt");

//ResetPasswordToken 
exports.resetPasswordToken = async (req, res) => {
    try{
        //get email from request body
        const email = req.body.email;

        //check user for this email, email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                success: true,
                message: "Your Email is not registered with us"
            })
        }

        //generate token
        const token = crypto.randomUUID();
        
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                     {email: email}, 
                                     {
                                        token: token, 
                                        resetPasswordExpires: Date.now() + 5*60*1000 
                                     },
                                     {new: true});
        
        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail containing the url
        await mailSender(email, "Reset Password Link", `Password Reset Link: ${url}`);

        //return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })
        
        
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "Something went wrong while reseting the password"
        })
    }
}


//resetPassword
exports.resetPassword = async(req, res) => {
    try{
        //fetch the data
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password should be same"
            })
        }

        //Get user details from DB
        const userDetails = await User.findOne({token : token});

        //if no entry -> invalid token
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "Received invalid Token for password reset"
            })
        }

        //Token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Reset password Token expired, please try again"
            })
        }

        //Hash password
        const hashedPaswword = await bcrypt.hash(password, 10);

        //password update
        const updatedUser = await User.findOneAndUpdate(
            {token: token},
            {password: hashedPaswword},
            {new:true}
            
        );

        //return response
        res.status(200).json({
            success: true,
            message: "Password reset successful",
            updatedUser
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Something went wrong while reseting password"
        })
    }
}