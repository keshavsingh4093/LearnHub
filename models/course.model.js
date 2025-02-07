import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    thumbnail: String,
    title: String,
    description: String,
    features: [String],
    category: String,
    subCategory: String,
    language: String,
    actualPrice: Number,
    salePrice: Number,
    duration: String,
    instructors: [String],
    avgRating: Number,
    ratingCount: Number,
    enrolledStudents: Number,
    updatedAt: Date,
    courseContent: {
        type: Schema.Types.ObjectId,
        ref: "courseContent",
    },
    createdBy: {
        type: [Schema.Types.ObjectId],
        ref: "user",
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: "review",
    },
});

const Course = new model("course",courseSchema);

export { Course };
