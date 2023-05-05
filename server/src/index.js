import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routes/users.js";
import { tweetsRouter } from "./routes/tweets.js";
import { commentsRouter } from "./routes/comments.js";

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_ACCESS = process.env.MONGO_DB_ACCESS;

app.use(express.json());

app.use(cors({ credentials: true }));

app.use("/api/auth", userRouter);
app.use("/api/tweets", tweetsRouter);
app.use("/api/comments", commentsRouter);

mongoose.connect(MONGO_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
