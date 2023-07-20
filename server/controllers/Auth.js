const User = require("../models/User");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated} = require("../mail/templates/passwordUpdate")
const Profile = require("../models/Profile");
require("dotenv").config();

//sendOTP
exports.sendotp = async (req, res) => {
    try {
        //Fetch email from request body
        const { email } = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            res.status(401).json({
                success: false,
                message: "User already exists!"
            })
        }

        //Generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        //console.log("Generated OTP ", otp);

        //check unique otp is generated or not
        let result = await OTP.findOne({ otp: otp });

        // Bad code - avoid using loops while interacting with DB
        while (result) {
            otp = otpGenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            result = await OTP.findOne({ otp: otp });
        }

        //create an entry in DB

        const otpPayload = { email, otp };

        const otpBody = await OTP.create(otpPayload);
        //console.log("OTP body", otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otpBody
        })

        //Add validation
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
            message: "Error in OTP Generation"
        })
    }
}


//SignUp
// exports.signup = async (req, res) => {
    // try {
//         //data fetch from req body
//         const { 
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmPassword,
//             accountType,
//             contactNumber,
//             otp } = req.body;

//         //validate
//         if (!email || !password || !firstName || !lastName || !confirmPassword || !otp) {
//             return res.status(403).json({
//                 success: false,
//                 message: "All fields are neccessary"
//             });
//         }

//         //match passwords -> password and confirm password
//         if (password !== confirmPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password and Confirm Password should be same"

//             })
//         }
//         //check user already exist or not
//         const existingUser = await User.findOne({ email })
//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exists!"
//             })
//         }

//         //find most recent otp in DB stored for user
//         const recentOtp = await OTP.findOne({ email });
//         console.log("Recent OTP", recentOtp);
        
//         //validate otp
//         if (!recentOtp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "OTP may be expired, Please Enter new OTP"
//             })
//         } else if (otp !== recentOtp.otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid OTP"
//             })
//         }
//         console.log("otp validated");
//         //Hash password
//         const hashedPaswword = await bcrypt.hash(password, 10);
//         console.log("password encrypted")
//         // Create the user
//         let approved = "";
// 		approved === "Instructor" ? (approved = false) : (approved = true);
//         console.error();
//         console.log(firstName," ", lastName);
//         //entry create in DB
//         const profileDetails = await Profile.create({
//             gender: null,
//             dob: null,
//             about: null,
//             contactNumber: null
//         });
//         console.log("Profile details",profileDetails);
//         console.error();

//         const user = await User.create({
//             firstName, 
//             lastName, 
//             email, 
//             contactNumber, 
//             password: hashedPaswword, 
//             accountType: accountType,
//             approved: approved, 
//             additionalDetails: profileDetails._id,
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
//         })
//         console.log("User created: ", user);


//         //send res
//         return res.status(200).json({
//             success: true,
//             message: "Sign Up successfully",
//             user
//         })

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "User was not registered, please try again"

//         })
//     }
// }

//SignUp
exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			otp,
            contactNumber
		} = req.body;
		// Check if All Details are there or not
		//console.log("BODY:", req.body);

		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Password and Confirm Password do not match. Please try again.",
			});
		}
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}
		//console.log(otp);

		// Find the most recent OTP for the email
		const response = await OTP.findOne({ email });
		//console.log("the otp in db is = ", response);
		//console.log("the email in db is = ", email);

		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response.otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dob: null,
			about: null,
			contactNumber: null,
		});

		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
			error: error.message

		});
	}
};


//Login
exports.login = async (req, res) => {
    try {
        //get data from req.body
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please Enter all details"
            })
        }
        //check user exists or not
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Found! Please Sign Up"
            })
        }

        //match password
        if (await bcrypt.compare(password, user.password)) {
            //if passwords match, create JWT token
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }

            //Creating JWT token using sign function
            const token = jwt.sign(payload, process.env.JWT_TOKEN, {
                expiresIn: "2h"
            });
            user.token = token;
            user.password = undefined;

            //Creating and sending a cookie in response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                message: "Login SuccessFul"
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password incorrect"
            })
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success:true,
            message: "Error while logging In"
        })
    }
}


//ChangePassword
exports.changePassword = async (req, res) => {
    try {
        //get user data from req.user
        const userDetails = await User.findById(req.user.id);

        //Fetch data from req.body
        const {oldPassword, newPassword, confirmPassword} = req.body;

        //check all fields are filled
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        //validate the old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if(!isPasswordMatch){
            //if both passwords does not match, then update the old password with newPassword
            return res.status(401).json({
                success : false,
                message : "The password is incorrect"
            })
        }

        //Match new password and confirm new password
        if(newPassword !== confirmPassword){
            // If new password and confirm new password do not match, return a 400 (Bad Request) error
            return res.status(400).json({
                success:false,
                message: "New Password and confirm Password should be same"
            });
        }
        
        //update password
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        let updateUserDetails = await User.findByIdAndUpdate(
                req.user.id,
                {password : hashedPassword},
                {new : true}
            );

            //Send the mail to user that password is updated
            try{
                const mailResponse = await mailSender(
                    updateUserDetails.email,
                    passwordUpdated(
					updateUserDetails.email,
					`Password updated successfully for ${updateUserDetails.firstName} ${updateUserDetails.lastName}`
				    )
                );
                console.log("Email Sent SuccessFully", mailResponse)
            } catch (error) {
                console.log("Error in Sending Mail ",error);
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                });
            }

            // Return success response
            return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message: "Something went wrong, Cannot update password"
        })
    }

}