const subSection = require("../models/SubSection");
const Section = require('../models/Section');
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createSubSection = async (req, res) => {
    try {
        //fetch required data
        const { sectionId, title, timeDuration, description } = req.body;

        //extract req.files
        const video = req.files.videoFile;

        //validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
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
        const updatedSection = await Section.findByIdAndUpdate({ sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id
                }
            },
            { new: true })
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
        const { sectionId, title, description } = req.body
        const subSection = await SubSection.findById(sectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

        return res.json({
            success: true,
            message: "Section updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Section was not updated"
        })
    }
}


//Delete SubSection

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Section was not deleted"
        })
    }
}