import mongoose from "mongoose";

const CommetnSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    tweetID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweets",
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: [],
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: [],
        },
    ],
});

export const CommentModel = mongoose.model("comments", CommetnSchema);
