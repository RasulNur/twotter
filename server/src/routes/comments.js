import express from "express";
import { CommentModel } from "../models/Comments.js";
import { TweetModel } from "../models/Tweets.js";

const router = express.Router();

router.get("/:commentID", async (req, res) => {
    try {
        const response = await CommentModel.findById(req.params.commentID);

        res.json(response);
    } catch (e) {
        res.json(e);
    }
});

router.post("/", async (req, res) => {
    const comment = new CommentModel(req.body);
    try {
        const response = await comment.save();

        res.json(response);
    } catch (e) {
        res.json(e);
    }
});

router.put("/", async (req, res) => {
    try {
        const tweet = await TweetModel.findById(req.body.tweetID);
        const comment = await CommentModel.findById(req.body.commentID);

        tweet.comments.push(comment);
        await tweet.save();

        res.json({ comments: tweet.comments });
    } catch (e) {
        res.json(e);
    }
});

router.put("/reactions/likes/:commentID", async (req, res) => {
    const { userID } = req.body;
    try {
        const comment = await CommentModel.findByIdAndUpdate(
            req.params.commentID,
            { userID }
        );
        if (!comment.likes.includes(userID)) {
            comment.likes.push(userID);
            comment.dislikes.pull(userID);
            await comment.save();
            return res.json({ comment, message: "Added" });
        }

        comment.likes.pull(userID);
        await comment.save();
        res.json({ comment, message: "Deleted" });
    } catch (e) {
        res.json(e);
    }
});

router.put("/reactions/dislikes/:commentID", async (req, res) => {
    const { userID } = req.body;
    try {
        const comment = await CommentModel.findByIdAndUpdate(
            req.params.commentID,
            { userID }
        );
        if (!comment.dislikes.includes(userID)) {
            comment.dislikes.push(userID);
            comment.likes.pull(userID);
            await comment.save();
            return res.json({ comment, message: "Added" });
        }

        comment.dislikes.pull(userID);
        await comment.save();
        res.json({ comment, message: "Deleted" });
    } catch (e) {
        res.json(e);
    }
});

export { router as commentsRouter };
