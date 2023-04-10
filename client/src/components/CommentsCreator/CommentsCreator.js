import { useState } from "react";
import { useGetUserId } from "../../hooks/useGetUserId";
import "./CommentsCreator.css";
import axios from "axios";

export default function CommentsCreator({ tweetID, fetchTweet }) {
    const userID = useGetUserId();
    const [comment, setComment] = useState({
        text: "",
        userOwner: userID,
        tweetID,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment({ ...comment, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!userID) {
                alert("You should register or login to write post");
                setComment({ ...comment, text: "" });
                return;
            }
            const commentRes = await axios.post(
                "http://localhost:3001/comments",
                comment
            );
            const tweetID = comment.tweetID;
            const commentID = commentRes.data._id;
            await axios.put("http://localhost:3001/comments", {
                tweetID,
                commentID,
            });
            fetchTweet();
            setComment({ ...comment, text: "" });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={onSubmit} className="commentscreator__form">
            <label className="commentscreator__label">
                Text
                <textarea
                    name="text"
                    value={comment.text}
                    onChange={handleChange}
                    type="text"
                    className="commentscreator__input"
                />
            </label>

            <button className="commentscreator__btn" type="submit">
                Post
            </button>
        </form>
    );
}
