import { useState } from "react";
import { useGetUserId } from "../../hooks/useGetUserId";
import "./CommentsCreator.css";
import axios from "axios";

export default function CommentsCreator({
    tweetID,
    fetchTweetComments,
    commentsLimit,
}) {
    const userID = useGetUserId();
    const [lettersCount, setLettersCount] = useState(0);
    const [comment, setComment] = useState({
        text: "",
        userOwner: userID,
        tweetID,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment({ ...comment, [name]: value });
        setLettersCount(value.length);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const tweetID = comment.tweetID;

            await axios.post("comments", { comment, tweetID });
            fetchTweetComments(commentsLimit);
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
                    rows={4}
                    maxLength="250"
                    required
                    className="commentscreator__textarea"
                />
                <span className="commentscreator__span">
                    {lettersCount}/250
                </span>
            </label>

            <button className="commentscreator__btn" type="submit">
                Post
            </button>
        </form>
    );
}
