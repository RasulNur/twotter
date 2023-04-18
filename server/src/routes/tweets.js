import express from "express";

import { TweetModel } from "../models/Tweets.js";
import { CommentModel } from "../models/Comments.js";

const router = express.Router();

router.get("/limit=:limit", async (req, res) => {
    try {
        const response = await TweetModel.find({})
            .sort({ _id: -1 })
            .limit(req.params.limit);

        res.json(response);
    } catch (e) {
        res.json(e);
    }
});

router.get("/:tweetID", async (req, res) => {
    try {
        const response = await TweetModel.findById(req.params.tweetID);

        res.json(response);
    } catch (e) {
        res.json(e);
    }
});

router.get(
    "/:tweetID/comments&commentsLimit=:commentsLimit",
    async (req, res) => {
        try {
            const response = await CommentModel.find({
                tweetID: req.params.tweetID,
            })
                .sort({ _id: -1 })
                .limit(req.params.commentsLimit);

            res.json(response);
        } catch (e) {
            res.json(e);
        }
    }
);

router.post("/", async (req, res) => {
    const tweet = new TweetModel(req.body);
    try {
        const response = await tweet.save();

        res.json(response);
    } catch (e) {
        res.json(e);
    }
});

router.put("/reactions/likes/:tweetID", async (req, res) => {
    const { userID } = req.body;
    try {
        const tweet = await TweetModel.findByIdAndUpdate(req.params.tweetID, {
            userID,
        });
        if (!tweet.likes.includes(userID)) {
            tweet.likes.push(userID);
            tweet.dislikes.pull(userID);
            await tweet.save();
            return res.json({ tweet, message: "Added" });
        }

        tweet.likes.pull(userID);
        await tweet.save();
        res.json({ tweet, message: "Deleted" });
    } catch (e) {
        res.json(e);
    }
});

router.put("/reactions/dislikes/:tweetID", async (req, res) => {
    const { userID } = req.body;
    try {
        const tweet = await TweetModel.findByIdAndUpdate(req.params.tweetID, {
            userID,
        });
        if (!tweet.dislikes.includes(userID)) {
            tweet.dislikes.push(userID);
            tweet.likes.pull(userID);
            await tweet.save();
            return res.json({ tweet, like: "Added" });
        }

        tweet.dislikes.pull(userID);
        await tweet.save();
        res.json({ tweet, message: "Deleted" });
    } catch (e) {
        res.json(e);
    }
});

export { router as tweetsRouter };
