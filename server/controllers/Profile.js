const Profile = require("../models/Profile");
const User = require("../models/User")

exports.updateProfile = async(req, res) => {
    try{
        //fetch data
        const {gender, dob="",  about="", contactNumber } = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!gender || !contactNumber || !id){
            return res.status(400).json({
                success: false,
                message: "Something went wrong, Section was not created"
            })
        }
        //find profile 
        const userDetails = await User.findById({id});
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById({profileId});

        //update
        profileDetails.dob = dob;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        //return response
        return res.status(200).json({
            success: true,
            profileDetails,
            message: "Profile updated Successfully"
        })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//Delete Account
exports.deleteAccount = async(req, res) => {
    try{
        //get id
        const {id} = req.user.id;
        //validation
        const userDetails = await User.findOne(id);
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        //delete profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        //HW: Unenroll user from all enrolled courses
        //HW: How to schedule a task
        //HW: cronjob
        //delete user
        await User.findByIdAndDelete({_id:id});

        
        //return response
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted"
        })
    }
}


exports.getAllUserDetails = async(req, res) => {
    try {
        //get id
        const {id} = req.user.id;

        //get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success: true,
            userDetails,
            message: "User Data fetched Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong ,User data cannot be fetched"
        })
    }
}