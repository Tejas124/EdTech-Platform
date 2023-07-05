const Section = require("../models/Section");
const Course = require("../models/Course");
const { response } = require("express");
const { TopologyDescription } = require("mongodb");

exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message: "all fields are required"

            })
        }

        //create section
        const newSection = await Section.create({sectionName});

        //update course with section objectId
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent: newSection._id
                }
            },
            {new:true}
            )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }).exec(); //HW
            
        //return response
        return res.status(200).json({
            success: true,
            updatedCourse,
            message: "Section created Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Section was not created"
        })
    }
}

exports.updateSection = async(req, res) => {
    try{
        //fetch data
        const {sectionName, sectionId} = req.body;

        //data validation
        if(!sectionName){
            return res.status(400).json({
                success:false,
                message: "all fields are required"

            })
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        //return response
        return res.status(200).json({
            success: true, 
            section,
            message: "Section updated Successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Section was not created"
        })
    }
}


exports.deleteSection = async(req, res) => {
    try {
        //get Id -- assuming that or sending Id in params
        //const {sectionId} = req.body;

        const { sectionId, courseId } = req.body;

        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO[Testing] :Do we need to delete the section id in Course schema ?
        //return response
        await Course.findByIdAndUpdate(courseId);
        return res.status(200).json({
            success: true,
            message: "Section deleted Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}