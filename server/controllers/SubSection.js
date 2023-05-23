const subSection = require("../models/SubSection");
const Section = require('../models/Section');
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


exports.createSubSection = async(req, res) => {
    try {
        //fetch required data
        const {sectionId, title, timeDuration, description} = req.body;

        //extract req.files
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message: "all fields are required"

            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create SubSection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })

        //update section with this SubSectionId
        const updatedSection = await Section.findByIdAndUpdate({sectionId}, 
                                             {
                                                $push: {
                                                    subSection: subSectionDetails._id
                                                }
                                             },
                                             {new:true})   
                                             .populate("subSection")
                                             .exec();
        console.log("Updated Section: ", updatedSection);
        //return response
        return res.status(200).json({
            success: true,
            updatedSection,
            message: "Sub-Section created Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Section was not created"
        })
    }
}

//update subSection
exports.updateSubSection = async (req, res) => {
    try {
        //fetch data
        const {title, timeDuration, description, subSectionId} = req.body;
        const {videoUrl} = req.files.videoFile;
        //validate
        if(!title || !timeDuration || !description || !videoUrl || !subSectionId){

        }
        //update using findByIdAndUpdate
        //response
    } catch (error) {

    }
}


//Delete