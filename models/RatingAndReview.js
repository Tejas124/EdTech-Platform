const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    rating:{
        type: Number,
    },
    review:{
        type:String,

    },
    course: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true

    }

})

module.exports = mongoose.model("ratingAndReview", ratingAndReviewSchema);