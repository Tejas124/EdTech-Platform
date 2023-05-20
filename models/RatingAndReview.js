const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    rating:{
        type: Number
    },
    review:{
        type:String
    }

})

module.exports = mongoose.model("ratingAndReview", ratingAndReviewSchema);