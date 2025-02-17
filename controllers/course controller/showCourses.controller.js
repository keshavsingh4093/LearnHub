import { Course } from "../../models/course.model.js";

const showAllCourses = async (req, res) => {
    try {
        const { page = 1, limit = 10, title, category, subcategory } = req.query;

        const search = {};

        if (title) {
            search.title = new RegExp(title, i);
        }

        if (category) {
            search.category = new RegExp(category, i);
        }

        if (subcategory) {
            search.subCategory = new RegExp(subcategory, i);
        }

        const courses = await Course.find(search).skip((page - 1) * limit).limit(limit);

        res.status(200).json(courses);

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Error while fetching courses data" });
    }
}


const showMyCourses = async (req, res) => {
    try {
        const user = req.user;

        const { page = 1, limit = 10, title, category, subcategory } = req.query;

        const search = {};

        if (title) {
           search.title = new RegExp(title, i);
        }

        if (category) {
           search.category = new RegExp(category, i);
        }

        if (subcategory) {
           search.subCategory = new RegExp(subcategory, i);
        }

        const courses = await Course.find({ _id: user.enrolledCourse, ...search }).skip((page - 1) * limit).limit(limit);

        res.status(200).json(courses);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:"Error while fetching enrolled courses"})
    }
}


export { showAllCourses, showMyCourses };