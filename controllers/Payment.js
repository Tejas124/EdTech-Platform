const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender");
const {instance} = require("../config/razorpay");


exports.capturePayment = async(req, res) => {
    try{
        //Get courseId, UserId
        const {course_id} = req.body;
        const userId = req.user.id;

        //validation
        if(!course_id){
            return res.json({

            })
        }
        //valid courseID
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.json({
                    
                })
            }
        } catch (error) {

        }
        //valid CourseDetail
        //check user already paid for that course or not
    } catch(err) {

    }
}
