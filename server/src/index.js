import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { tweetsRouter } from "./routes/tweets.js";
import { commentsRouter } from "./routes/comments.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/tweets", tweetsRouter);
app.use("/comments", commentsRouter);

mongoose.connect(
    "mongodb+srv://rasul:rasul12gfg@tweets.wc6bnl3.mongodb.net/tweets?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.listen(3001, () => {
    console.log(`Server listening on port 3001`);
});
