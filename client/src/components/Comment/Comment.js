import ThumbUpIcon from "../../icons/thumb_up.svg";
import ThumbUpFillIcon from "../../icons/thumb_up-fill.svg";
import ThumbDownIcon from "../../icons/thumb_down.svg";
import ThumbDownFillIcon from "../../icons/thumb_down-fill.svg";
import "./Comment.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";
import toast from "react-hot-toast";

export default function Comment({
    comment,
    fetchTweetComments,
    commentsLimit,
}) {
    const userID = useGetUserId();
    const [username, setUsername] = useState();

    const notify = (msg) =>
        toast.error(msg, {
            duration: 2000,
            position: "top-right",
            style: { background: "#e1e5e7" },
        });
    const fetchCommentUsername = async () => {
        const resUser = await axios.get(`auth/users/${comment?.userOwner}`);

        setUsername(resUser.data.username);
    };

    useEffect(() => {
        fetchCommentUsername();
        // fetchTweetComments(commentsLimit);
    }, []);

    const onLikeClick = async () => {
        if (!userID) {
            notify("You should register or login to react");
            return;
        }
        await axios.put(`comments/reactions/likes/${comment?._id}`, { userID });
        fetchTweetComments(commentsLimit);
    };
    const onDislikeClick = async () => {
        if (!userID) {
            notify("You should register or login to react");
            return;
        }
        await axios.put(`comments/reactions/dislikes/${comment?._id}`, {
            userID,
        });
        fetchTweetComments(commentsLimit);
    };

    return (
        <div className="comment">
            <div className="comment__author">{username}</div>
            <div className="comment__text">{comment?.text}</div>
            <div className="comment__reaction">
                <div className="comment__reaction-btns">
                    <button
                        type="button"
                        className="comment__reaction-btn"
                        onClick={onLikeClick}>
                        <img
                            src={
                                comment?.likes.includes(userID)
                                    ? ThumbUpFillIcon
                                    : ThumbUpIcon
                            }
                            alt="Thumb up"
                            className="comment__icon"
                        />

                        {comment?.likes.length}
                    </button>
                    <button
                        type="button"
                        className="comment__reaction-btn"
                        onClick={onDislikeClick}>
                        <img
                            src={
                                comment?.dislikes.includes(userID)
                                    ? ThumbDownFillIcon
                                    : ThumbDownIcon
                            }
                            alt="Thumb down"
                            className="comment__icon"
                        />
                        {comment?.dislikes.length}
                    </button>
                </div>
            </div>
        </div>
    );
}
