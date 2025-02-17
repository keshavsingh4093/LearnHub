import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    rating: {
        type: Number,
        min: [1, "Rating should be greater than or equal to 1"],
        max: [5, "Rating should be less than or equal to 5"],
        required: true
    },
    feedback: String,
});

const Review = new model("review", reviewSchema);

export { Review };
