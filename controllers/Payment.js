const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender");
const {instance} = require("../config/razorpay");
const {default : mongoose}  = require("mongoose");


//Capture the payment and intitiate the razorpay order
exports.capturePayment = async(req, res) => {
    
        //Get courseId and UserId
        const {course_id} = req.body;
        const userId = req.user.id;

        //validation
        if(!course_id){
            return res.status(400).json({
                success: false,
                message: "Please select a course"
            })
        }

        //valid courseID
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(400).json({
                    success: false,
                    message: "please provide valid course id"
                })
            }
            
            //Check if user already paid for same course or not
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success: true,
                    message: "Student is already enrolled"
                })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message: error.message
            })
        }

        //order create 
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount : amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId
            }
        }

        try{
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            //return response
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            })

        } catch (error) {
            console.log(error)

        }
        
    
}

//authorization -> verify signature of Razorpay and server
exports.verifySignature = async (req, res) => {
    //secret key from server
    const webhookSecret = "12345678"

    //secret key from razorpay
    const signature = req.headers['x-razorpay-signature'];

    //Steps for hashing webhookSecret key, 
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorized");

        const {courseId, userId} = req.body.payload.entity.notes; //passed in notes while creating orders

        try {
            //fulfill the action
    
            //Find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                                            {_id: courseId},
                                            {$push:{studentEnrolled: userId}},
                                            {new:true})
            
            if(!enrolledCourse){
                return res.status(500).json({
                    success: true,
                    message: "Course not found"

                })
            }

            console.log(enrolledCourse);

            //Find the student and add the course to the courses list
            const enrolledStudent = await User.findById({_id: userId},
                                            {$push: {courses: courseId}},
                                            {new:true})
                                    
            //send confirmation mail
            const mailResponse = await mailSender(
                                enrolledStudent.email,
                                "Congratulations",
                                "You have successfullu enrolled in course"
            )

            return res.status(200).json({
                success: true,
                message: 'Signature verifed and Course added'
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message: error.message
        })
    }

    
}
