import ThumbUpIcon from "../../icons/thumb_up.svg";
import ThumbUpFillIcon from "../../icons/thumb_up-fill.svg";
import ThumbDownIcon from "../../icons/thumb_down.svg";
import ThumbDownFillIcon from "../../icons/thumb_down-fill.svg";
import "./Comment.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";

export default function Comment({ commentID }) {
    const userID = useGetUserId();
    const [currentComment, setCurrentComment] = useState({
        comment: [],
        username: "",
    });
    const fetchComment = async () => {
        const resComment = await axios.get(
            `http://localhost:3001/comments/${commentID}`
        );
        const resUser = await axios.get(
            `http://localhost:3001/auth/users/${resComment.data.userOwner}`
        );

        setCurrentComment({
            comment: resComment.data,
            username: resUser.data.username,
        });
    };
    useEffect(() => {
        fetchComment();
    }, []);

    const onLikeClick = async () => {
        if (!userID) {
            alert("You should register or login to react");
            return;
        }
        await axios.put(
            `http://localhost:3001/comments/reactions/likes/${commentID}`,
            { userID }
        );
        fetchComment();
    };
    const onDislikeClick = async () => {
        if (!userID) {
            alert("You should register or login to react");
            return;
        }
        await axios.put(
            `http://localhost:3001/comments/reactions/dislikes/${commentID}`,
            { userID }
        );
        fetchComment();
    };

    return (
        <div className="comment">
            <div className="comment__author">{currentComment.username}</div>
            <div className="comment__text">
                {currentComment.comment && currentComment.comment.text}
            </div>
            <div className="comment__reaction">
                <div className="comment__reaction-btns">
                    <button
                        type="button"
                        className="comment__reaction-btn"
                        onClick={onLikeClick}>
                        <img
                            src={
                                currentComment.comment.likes &&
                                currentComment.comment.likes.includes(userID)
                                    ? ThumbUpFillIcon
                                    : ThumbUpIcon
                            }
                            alt="Thumb up"
                            className="comment__icon"
                        />

                        {currentComment.comment.likes &&
                            currentComment.comment.likes.length}
                    </button>
                    <button
                        type="button"
                        className="comment__reaction-btn"
                        onClick={onDislikeClick}>
                        <img
                            src={
                                currentComment.comment.dislikes &&
                                currentComment.comment.dislikes.includes(userID)
                                    ? ThumbDownFillIcon
                                    : ThumbDownIcon
                            }
                            alt="Thumb down"
                            className="comment__icon"
                        />
                        {currentComment.comment.dislikes &&
                            currentComment.comment.dislikes.length}
                    </button>
                </div>
            </div>
        </div>
    );
}
