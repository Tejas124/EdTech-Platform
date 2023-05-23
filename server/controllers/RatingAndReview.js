const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//createRating
exports.createRating = async(req,res) => {
    try {
        //fetch data, course id from req.body
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        //validation - check if user is enrolled or not
        const courseDetails = await Course.findOne({
            _id:courseId, studentEnrolled: {$elemMatch: {$eq: userId}}
        })

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: "Course Details not found"
            })

        }
        
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course: courseId
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Course is already reviewd by user"

            })
        }
        //create review 
        const createReview = await RatingAndReview.create({
            rating, review, course: courseId, user: userId
        })

        //update course with new RatingAndReview
        await Course.findByIdAndUpdate({_id:courseId}, 
            {
                $push:{
                    ratingAndReview: createReview._id,
                }
            }, {new:true});

        console.log(courseDetails);  

        //return Response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully",
            createReview
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating Rating and Review"
        })
    }
}

//getAverageRating
exports.getAverageRating = async(req, res) => {
    try {
         // get course id
         const courseId = req.body.courseId;

         //calculate avg rating
         const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id: null,
                    averageRating: { $avg: "rating"}
                }
            }
         ])
         //return rating
         if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
         }

         //if no rating exist
         return res.status(200).json({
            success: true,
            message: "Average rating is 0, no rating found"
         })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating Rating and Review"
        })
    }
}

//getAllRating -> gets all rating and review irrespective of course
exports.getAllRating = async(req,res) => {
    try {
        const allReviews = await RatingAndReview.find({})
                            .sort({rating: "desc"})
                            .populate({
                                path: "user",
                                select: "firstName lastName email image"
                            })
                            .populate({
                                path: "course",
                                select: "courseName"
                            })
                            .exec()
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching Rating and Review"
        })
    }
}
