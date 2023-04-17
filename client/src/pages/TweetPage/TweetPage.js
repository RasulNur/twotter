import ThumbUpIcon from "../../icons/thumb_up.svg";
import ThumbUpFillIcon from "../../icons/thumb_up-fill.svg";
import ThumbDownIcon from "../../icons/thumb_down.svg";
import ThumbDownFillIcon from "../../icons/thumb_down-fill.svg";
import "./TweetPage.css";
import Comment from "../../components/Comment/Comment";
import CommentsCreator from "../../components/CommentsCreator/CommentsCreator";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserId } from "../../hooks/useGetUserId";
import toast from "react-hot-toast";

export default function Post() {
    const userID = useGetUserId();
    const { id, username } = useParams();
    const tweetID = id;
    const [tweet, setTweet] = useState();
    const comments = tweet?.comments;

    const fetchTweet = async () => {
        try {
            const res = await axios.get(`tweets/${tweetID}`);

            setTweet(res.data);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        fetchTweet();
    }, []);

    const notify = (msg) =>
        toast.error(msg, {
            duration: 2000,
            position: "top-right",
            style: { background: "#e1e5e7" },
        });

    const onLikeClick = async () => {
        if (!userID) {
            notify("You should register or login to react");
            return;
        }
        await axios.put(`tweets/reactions/likes/${tweetID}`, {
            userID,
        });
        fetchTweet();
    };
    const onDislikeClick = async () => {
        if (!userID) {
            notify("You should register or login to react");
            return;
        }
        await axios.put(`tweets/reactions/dislikes/${tweetID}`, { userID });
        fetchTweet();
    };

    return (
        <div className="post">
            <div className="container">
                <div className="post__content">
                    <div className="post__author">{username}</div>
                    <div className="post__text">{tweet && tweet.text}</div>

                    <div className="post__reaction">
                        <div className="post__reaction-btns">
                            <button
                                type="button"
                                className="post__reaction-btn"
                                onClick={onLikeClick}>
                                <img
                                    src={
                                        tweet && tweet.likes.includes(userID)
                                            ? ThumbUpFillIcon
                                            : ThumbUpIcon
                                    }
                                    alt="Thumb up"
                                    className="home__post-icon"
                                />
                                {tweet && tweet.likes.length}
                            </button>
                            <button
                                type="button"
                                className="post__reaction-btn"
                                onClick={onDislikeClick}>
                                <img
                                    src={
                                        tweet && tweet.dislikes.includes(userID)
                                            ? ThumbDownFillIcon
                                            : ThumbDownIcon
                                    }
                                    alt="Thumb down"
                                    className="home__post-icon"
                                />
                                {tweet && tweet.dislikes.length}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="post__comments">
                    <h2 className="post__comments-heading">Comments</h2>
                    {userID ? (
                        <div className="post__comments-creator">
                            <CommentsCreator
                                tweetID={tweetID}
                                fetchTweet={fetchTweet}
                            />
                        </div>
                    ) : null}

                    <div className="post__comments-wrapper">
                        {comments && comments.length > 0 ? (
                            comments &&
                            [...comments]
                                .reverse()
                                .map((comment) => (
                                    <Comment
                                        key={comment}
                                        commentID={comment}
                                    />
                                ))
                        ) : (
                            <h3>No comments</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
