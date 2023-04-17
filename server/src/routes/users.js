import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/users/:userID", async (req, res) => {
    try {
        const users = await UserModel.findById(req.params.userID);

        res.json(users);
    } catch (e) {
        res.json(e);
    }
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
        username,
    });

    if (user) {
        return res
            .sendStatus(400)
            .json({ message: "User already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
        username,
        password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET);
    res.json({ token, userID: newUser._id });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
        username: username,
    });

    if (!user) {
        return res
            .sendStatus(401)
            .json({ message: "User doesn't registered!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.sendStatus(400).json({ message: "Password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    console.log(token);
    res.json({ token, userID: user._id });
});

router.post("/changeuser/:id", async (req, res) => {
    const { username, currPassword, newPassword } = req.body;
    const { id } = req.params;
    try {
        const currUser = await UserModel.findById(id);

        const isPasswordValid = await bcrypt.compare(
            currPassword,
            currUser.password
        );

        if (!isPasswordValid) {
            return res
                .sendStatus(400)
                .json({ message: "Current password is incorrect!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await UserModel.findByIdAndUpdate(id, {
            username,
            password: hashedPassword,
        });
        res.json({ user });
    } catch (e) {
        res.json(e);
    }
});

router.put("/changeusername/:id", async (req, res) => {
    const { username } = req.body;
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            username,
        });

        res.json({ user });
    } catch (e) {
        res.json(e);
    }
});

router.post("/changepassword/:id", async (req, res) => {
    const { currPassword, newPassword } = req.body;
    try {
        const currUser = await UserModel.findById(req.params.id);

        const isPasswordValid = await bcrypt.compare(
            currPassword,
            currUser.password
        );

        if (!isPasswordValid) {
            return res
                .sendStatus(400)
                .json({ message: "Password is incorrect!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            password: hashedPassword,
        });

        res.json({ user, hashedPassword });
    } catch (error) {
        res.json(e);
    }
});

export { router as userRouter };
