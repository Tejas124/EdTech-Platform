const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required: true,
        trim:true,
    },
    courseDescription:{
        type:String,
        required: true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    whatYouWillLearn:{
        type:String,
        required: true,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReview:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    thumbnail:{
        type:String
    },
    Category:{
        type:String,
        ref: "Category"
    },
    studentEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]

})

module.exports = mongoose.model("Course", courseSchema);