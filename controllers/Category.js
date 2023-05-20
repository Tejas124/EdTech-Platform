const Category = require("../models/Category")

//create Category ka handler fucntion
//Category will be created by Admin only 

exports.createCategory = async (req, res) => {
    try{
        //fetch data
        const {name , description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            
            })
        }

        //Create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description
        })
        console.log(tagDetails)

        return res.status(200).json(
            {
                success: true,
                message: "Category created successfully"
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating a Category"
        })
    }
};

//getAllCategory handler
exports.showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, {name: true, description: true});

        res.status(200).json({
            success:true,
            message: "All Categories returned successfully",
            allCategory,

        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching all Categories"
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        //get category id
        const {categoryId} = req.body;

        //get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                 .populate("courses")
                                 .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: ""
            })
        }
        //get courses for different category
        const differnetCategories = await Category.find({
            _id : {$ne: categoryId},
        })
        .populate("courses")
        .exec();
        //TODO: Get top 10 selling courses
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating Rating and Review"
        })
    }
}