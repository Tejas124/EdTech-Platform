const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        //If token is missing then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Token is missing"
            });

        }

        //verify token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch(error){
            return res.status(401).json({
                success:false,
                message: "Token is invalid"
            })
        }
        next();
    } catch (error) {
        console.log(err);
        res.status(401).json({
            success:false,
            message: "Something went wrong while validating token"
        })
    }
}


//isStudent
exports.isStudent = async (res, req, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message: "This route is protected for Students"
            })
        }
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified"

        })
    }
}

//isInstructor
exports.isInstructor = async (res, req, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message: "This route is protected for Instructor"
            })
        }
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified"

        })
    }
}

exports.isAdmin = async (res, req, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message: "This route is protected for Admin"
            })
        }
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified"

        })
    }
}