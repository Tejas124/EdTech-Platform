const Course = require("../models/Course")
const Category = require("../models/Category")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


//createCourse Handler function
exports.createCourse = async (req, res) => {
    try{
        //data fetch
        let {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
        //thumbnail     
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message: "All fields are required"

            })
        }

        //Check for instructor details 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});
        //console.log("Instructor Details", instructorDetails)

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message: "Instructor Details not found"
            })
        }

        //check given Category is valid or not
        const categoryDetails = await Category.findById(category);
        //console.log(categoryDetails);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message: "Category Details not found"
            })
        }

        //Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn : whatYouWillLearn,
            instructor : instructorDetails._id,
            price,
            category: categoryDetails._id,
            thumbnail : thumbnailImage.secure_url,

        });
        //console.log("new course ", newCourse);

        //Add the new course to User schema of instructor
        await User.findByIdAndUpdate(
        {
            _id:instructorDetails._id,
        },
        {
            $push: {
                courses: newCourse._id
            }
        },
        {
            new:true
        })
        //console.log("updated user ", User);


        //Update Category Schema
        await Category.findByIdAndUpdate(
        { _id: category },
        {
            $push: {
                course: newCourse._id
            }
        },
        {
            new:true
        })
        //console.log("updated category ", Category);

        return res.status(200).json({
            success:true,
            message: "New Course created successfully",
            data: newCourse
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to create a course",
        })
    }
}


//getAllCourse Handler Function
exports.getAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find({}, {courseName: true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                Category: true,
                                                ratingAndReview: true,
                                                studentsEnrolled:true})
                                                .populate("instructor")
                                                .exec()
        
        return res.status(200).json({
            success:true,
            message: "Data For all Courses Fetched",
            data: allCourses
        })                                       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Cannot Fetch All courses data"
        })
    }
}

//get Course Details
exports.getCourseDetails = async (req, res ) => {
    try{
        //fetch course id
        const {courseId} = req.body;

        //Find course details
        const courseDetails = await Course.find({_id:courseId})
                              .populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path: "additionalDetails"
                                    }
                                }
                              )
                              .populate("category")
                              //.populate("ratingAndReviews")
                              .populate(
                                {
                                    path: "courseContent",
                                    populate:{
                                        path:"subSection",
                                    }
                                }
                              )

        //validation
        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            })
        }
        

        //return response
        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
            data:courseDetails,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}